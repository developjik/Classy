document.addEventListener("DOMContentLoaded", function () {
  var nickname = null;

  if (!Kakao.Auth.getAccessToken()) {
    window.location.href = "/";
  } else {
    Kakao.API.request({
      url: "/v2/user/me",
      success: function (res) {
        nickname = res.kakao_account.profile.nickname;

        var div = document.createElement("div");
        div.innerHTML = "파일명 : " + nickname;
        div.setAttribute("class", "kakaoId");
        document.body.appendChild(div);
      },
      fail: function (error) {
        alert(JSON.stringify(error));
      },
    });
  }

  var audio = new Audio("./audio/image.mp3");
  audio.play();
});
