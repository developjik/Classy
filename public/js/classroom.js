document.addEventListener("DOMContentLoaded", function () {
  if (!Kakao.Auth.getAccessToken()) {
    window.location.href = "/";
    alert("로그인이 필요합니다.");
  }
});

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("models"),
  faceapi.nets.ssdMobilenetv1.loadFromUri("models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("models"),
]).then(() => {

  var images = [];

  axios.get("/images")
  .then((response) => {
    console.log(response.data)
    response.data.map((i) => {
      if(!i.includes("DS")){
      images.push(i);
      }
    });
  });
 

  document.getElementById("loading1").remove();
  document.getElementById("loading2").remove();

  Kakao.API.request({
    url: "/v2/user/me",
    success: function (res) {
      let nickname = res.kakao_account.profile.nickname;

      let concentration = 0;
      let faceCheck = 0;
      let faceCount = 0;
      let videocount = 0;

      let video;

      var connection = new RTCMultiConnection();
      connection.socketURL = "https://rtcmulticonnection.herokuapp.com:443/";

      var room = prompt("방 코드를 입력하세요.","1");
      connection.openOrJoin(room);

      var name = prompt("이름을 입력하세요",nickname);
      if (name !== "교사") {
        name = nickname;
      }

      connection.extra = {
        fullName: name,
      };

      connection.session = {
        audio: false,
        screen: true,
        data: true,
      };

      connection.sdpConstraints.mandatory = {
        OfferToReceiveAudio: false,
        OfferToReceiveVideo: true,
      };

      connection.rejoin(room);

      var left = document.getElementById("left");
      left.innerHTML = "user :" + name + "\n";
      var emptyDiv = document.createElement("hr");

      var userList = document.createElement("div");
      userList.innerHTML = "접속 user 목록";
      left.appendChild(emptyDiv);
      left.appendChild(userList);
      left.appendChild(document.createElement("hr"));

      connection.addStream({
        video: true,
        oneway: true,
      });

      connection.onstream = function (event) {
        console.log(event.extra.fullName)
        if (
          // connection.isInitiator === true ||
          name.includes("교사") ||
          event.extra.fullName.includes("교사")
        ) {
          videocount++;
          var video = event.mediaElement;
          video.id = event.streamid;
          var newdiv = document.createElement("div");
          newdiv.setAttribute("style", "border: 3px solid black; margin: 1vh");

          if (videocount % 2 === 0) {
            var section = document.getElementById("sectionright");
            newdiv.innerHTML = event.extra.fullName + " Display";
            newdiv.id = event.extra.fullName + "Display";
            section.appendChild(video);
            section.appendChild(newdiv);

            var userAdd = document.createElement("div");
            userAdd.innerHTML = event.extra.fullName;
            userAdd.id = event.extra.fullName + "User";
            var hr = document.createElement("hr");
            hr.id = event.extra.fullName + "Hr";
            left.appendChild(userAdd);
            left.appendChild(hr);
          } else {
            var section = document.getElementById("section");
            newdiv.innerHTML = event.extra.fullName + " Cam";
            newdiv.id = event.extra.fullName + "Cam";

            section.appendChild(video);
            section.appendChild(newdiv);
          }
        }
      };

      connection.onstreamended = function (event) {
        var div = document.getElementById(event.streamid);
        var display = document.getElementById(event.extra.fullName + "Display");
        var cam = document.getElementById(event.extra.fullName + "Cam");
        var user = document.getElementById(event.extra.fullName + "User");
        var hr = document.getElementById(event.extra.fullName + "Hr");
        if (div && div.parentNode) {
          div.parentNode.removeChild(div);
        }
        if (display !== null) {
          display.remove();
        }
        if (cam !== null) {
          cam.remove();
        }
        if (user !== null) {
          user.remove();
        }
        if (hr !== null) {
          hr.remove();
        }
      };

      connection.onmessage = function (event) {
        if (connection.isInitiator) {
          confirm(event.extra.fullName + " : " + event.data);
        }
      };

      const getVideo = async () => {
        video = document.getElementById("hidden");
        await navigator.mediaDevices
          .getUserMedia({ video: true })
          .then((stream) => {
            video.srcObject = stream;
          });
      };

      const recognizeFaces = async () => {
        const labeledDescriptors = await loadLabeledImages();
        const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);

        setInterval(async () => {
          const detections = await faceapi
            .detectAllFaces(video)
            .withFaceLandmarks()
            .withFaceDescriptors();
          const results = detections.map((d) => {
            return faceMatcher.findBestMatch(d.descriptor);
          });
      
          results.forEach((result, i) => {
            console.log(result)
            if (nickname.toKorChars().length === result.label.toKorChars().length-4) {
              faceCheck =0;
            } else {
              faceCheck++
              if (faceCheck === 5) {
                var audio = new Audio("./audio/wrongFace.mp3");
                audio.play();
                faceCheck = 0;
                connection.send("사진과 다른 사용자!!");
              }
            }
          });
        }, 3000);
      };

      const loadLabeledImages = () => {

        return Promise.all(
          images.map(async (label) => {
            console.log(label)
            const descriptions = [];
            const img = await faceapi.fetchImage('../uploads/'+label);
            const detections = await faceapi
              .detectSingleFace(img)
              .withFaceLandmarks()
              .withFaceDescriptor();
            descriptions.push(detections.descriptor);
            return new faceapi.LabeledFaceDescriptors(label, descriptions);
          })
        );
      };

      const startModel = async () => {
        classifier = ml5.imageClassifier("/models/model.json", video, (res) => {
          setInterval(async () => {
            classifier.classify(video, (error, results) => {
              if (error) {
                console.error(error);
                return;
              }
              console.log(results[0],results[1])

              if (results[0].label !== "face" && results[0].confidence - results[1].confidence >0.25) {
                concentration++;
                if (concentration === 10) {
                  var audio = new Audio("./audio/concentration.mp3");
                  audio.play();
                  concentration = 0;
                  connection.send("집중 필요!!!");
                }
              } else {
                concentration = 0;
              }
            });
          }, 3000);
        });
      };

      const startFaceApi = () => {
        setInterval(async () => {
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks();
          console.log(detections);
          if (detections.length < 1) {
            faceCount++;
            if (faceCount === 7) {
              var audio = new Audio("./audio/zeroFace.mp3");
              audio.play();
              faceCount = 0;
              connection.send("사용자 없음!!");
            }
          } else {
            faceCount = 0;
          }
        }, 3000);
      };

      // if (name !== "교사") {
      // getVideo();
      // startModel();
      // startFaceApi();
      // recognizeFaces();
      // }
    },
    fail: function (error) {
      alert(JSON.stringify(error));
    },
  });
});
