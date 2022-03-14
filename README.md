# Classy

1. [프로젝트 소개 🚀](#1-프로젝트-소개-)
2. [프로젝트 기능 및 설계 📍](#2-프로젝트-기능-및-설계📍)
3. [프로젝트 구조 🌲](#3-프로젝트-구조-)
4. [역할 👋🏻](#4-역할-)
5. [프로젝트 스크린샷 ✍🏻](#5-프로젝트-스크린샷-)
6. [프로젝트 설치 및 실행 ✨](#6-프로젝트-설치-및-실행-)
7. [소프트웨어공모전 결과 ✨](#7-소프트웨어공모전-결과)

[🌍 배포 링크](https://developjik-classy.herokuapp.com/)

## 1. 프로젝트 소개 🚀

- 개요 : 교내 소프트웨어 공모전
- 주제 : Web RTC & A.I를 이용한 실시간 수업 플랫폼
- 기간 : 2020.09 ~ 2020.11

## 2. 프로젝트 기능 및 설계📍

- 기능

  - Node JS + Mongo DB를 활용한 Kakao Talk 로그인 기능 및 사용자 정보 및 사진 저장
  - Web RTC를 활용한 교사에게 모든 학생 화면 및 캠 전송
  - Web RTC를 활용한 학생에게 교사의 화면 전송
  - Web RTC를 활용한 선생 화면 녹화 후 AWS S3에 저장
  - A.I 를 활용한 비정상적 행위 감지 후 Web RTC로 교사에게 메세지 전달 및 학생에게는 sound로 경고
  - WebRTC는 OpenVidu 플랫폼 활용, 지금은 AWS 서버 비용 문제로 서버 운영 X => 오픈소스 Web RTC 형태로 유지 중
    <br/>

- 교사 설계
  ![teacher](https://user-images.githubusercontent.com/67889389/156940844-54e40a04-b9b5-4ea6-a3be-47de233ecc95.png)

- 학생 설계
  ![student](https://user-images.githubusercontent.com/67889389/156940842-cb1b96a4-61d7-4757-9a2b-feca669f826d.png)

## 3. 프로젝트 구조 🌲

```
├── index.js
└── public
    ├── audio
    │   ├── concentration.mp3
    │   ├── image.mp3
    │   ├── wrongFace.mp3
    │   └── zeroFace.mp3
    ├── css
    │   ├── capture.css
    │   ├── classroom.css
    │   └── index.css
    ├── html
    │   ├── capture.html
    │   ├── classroom.html
    │   └── index.html
    ├── js
    │   ├── RTC_Multiconnection.js
    │   ├── RTC_Socket.js
    │   ├── capture.js
    │   ├── classroom.js
    │   ├── face-api.min.js
    │   ├── index.js
    │   └── toKorChars.js
    ├── models
    │   ├── Image.js
    │   ├── face_landmark_68_model-shard1
    │   ├── face_landmark_68_model-weights_manifest.json
    │   ├── face_landmark_68_tiny_model-shard1
    │   ├── face_landmark_68_tiny_model-weights_manifest.json
    │   ├── face_recognition_model-shard1
    │   ├── face_recognition_model-shard2
    │   ├── face_recognition_model-weights_manifest.json
    │   ├── metadata.json
    │   ├── model.json
    │   ├── mtcnn_model-shard1
    │   ├── mtcnn_model-weights_manifest.json
    │   ├── ssd_mobilenetv1_model-shard1
    │   ├── ssd_mobilenetv1_model-shard2
    │   ├── ssd_mobilenetv1_model-weights_manifest.json
    │   ├── tiny_face_detector_model-shard1
    │   ├── tiny_face_detector_model-weights_manifest.json
    │   └── weights.bin
    └── uploads
        ├── unknown1.png
        ├── unknown10.png
        ├── unknown2.png
        ├── unknown3.png
        ├── unknown4.png
        ├── unknown5.png
        ├── unknown7.png
        ├── unknown8.png
        ├── unknown9.png
        ├── 김성원.png
        ├── 이유찬.png
        ├── 정인권.png
        └── 최인제.png
```

## 4. 역할 👋🏻

| 이름                                    | 담당역할                                                                           |
| --------------------------------------- | ---------------------------------------------------------------------------------- |
| [정인권](https://github.com/developjik) | Frontend 페이지 구현(HTML, CSS, JS), Kakao 로그인 연동, WebRTC 구현, A.I 모델 적용 |
| 이유찬                                  | A.I 모델 구현 및 적용, WebRTC 구현                                                 |
| 김성원                                  | A.I 모델 구현 및 적용, Sound 적용                                                  |
| 최인제                                  | A.I 모델 구현 및 적용, uploads 관리 및 구현                                        |

## 5. 프로젝트 스크린샷 ✍🏻

### [1] Classy Main Page ✨

![MainPage](https://user-images.githubusercontent.com/67889389/156941092-197692e0-8a66-4e88-ad14-d1edaed1877e.png)

### [2] Classy Login Module ✨

![login](https://user-images.githubusercontent.com/67889389/156941208-1bfd0417-07a1-45c0-8d55-00e4108a6500.png)

### [3] Classy Picture Module✨

![upload](https://user-images.githubusercontent.com/67889389/156941212-54ddd77b-0032-4c2a-9636-239dea794fdb.png)

### [4] Classy Class Module Student ✨

![student](https://user-images.githubusercontent.com/67889389/156941112-24aa0863-2629-431b-b20f-f0278c0e2d1d.jpg)

### [5] Classy Class Module Teacher ✨

![teacher](https://user-images.githubusercontent.com/67889389/156941115-418ff6a4-6a2d-4caa-87d6-04dc1203bf68.jpg)

## 6. 프로젝트 설치 및 실행 ✨

1. Git Clone

```plaintext
git clone https://github.com/developjik/classy.git
```

2. 프로젝트 패키지 설치

```plaintext
yarn install
```

3. 프로젝트 실행

```plaintext
yarn start
```

## 7. 소프트웨어공모전 결과

![소프트웨어공모전](https://user-images.githubusercontent.com/67889389/156941533-7c83a9c2-e227-419b-9c71-17086ff4221a.jpg)
