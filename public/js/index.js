document.addEventListener("DOMContentLoaded", function () {
  Kakao.init("226e587d9dd1da9c94be74a8ed211cfe");
});

let login = document.getElementById("login");
let logout = document.getElementById("logout");

const loginWithKakao = () => {
  try {
    return new Promise((resolve, reject) => {
      if (!Kakao) {
        reject("Kakao 인스턴스가 없습니다");
      }
      Kakao.Auth.login({
        success: (auth) => {
          console.log("로그인 완료", auth);
          window.location.href = "/capture";
        },
        fail: (err) => {
          console.error(err);
        },
      });
    });
  } catch (err) {
    console.error;
  }
};

const logoutWithKakao = () => {
  if (Kakao.Auth.getAccessToken()) {
    console.log("카카오 인증 액세스 토큰 존재", Kakao.Auth.getAccessToken());
    Kakao.Auth.logout(() => {
      console.log("로그아웃 완료", Kakao.Auth.getAccessToken());
      window.location.href = "/";
    });
  }
};
