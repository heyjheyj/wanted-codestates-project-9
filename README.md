# [**개인과제 - 페이히어**]

## 🔗 배포 주소

- 아래 URL을 클릭하면 배포된 페이지로 이동합니다.
- https://payhere-assignment.netlify.app

<br>

## **⚙**개발 환경

<a><img src="https://img.shields.io/badge/React-61DAFB.svg?&style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E.svg?&style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/styledcomponents-DB7093.svg?&style=for-the-badge&logo=styledcomponents&logoColor=white"><img src="https://img.shields.io/badge/Redux-764ABC.svg?&style=for-the-badge&logo=Redux&logoColor=white"></a>

<br>

## 🕹 설치 및 시작방법

```
# install dependencies
 $ npm install

# serve with hot reload at localhost:3000
 $ npm start
```

<br>

## 🖥️ 구현 내용

Github Repository 검색 및 저장하고, 저장된 Repository의 issue를 모아 볼 수 있는 웹사이트

### 1. Repository 검색

![검색](https://user-images.githubusercontent.com/90097736/158009091-376ed54c-8279-4d3c-9b8a-8bdd52127482.gif)

### 2. Repository -> Localstorage 저장 및 삭제

![로컬스토리지 저장](https://user-images.githubusercontent.com/90097736/158009113-c60c1c8b-4912-4446-a872-bb321c7706cf.gif)

### 3. Pagination

![페이지네이션](https://user-images.githubusercontent.com/90097736/158009123-5022c1c8-d782-4ba0-a2e3-d0060ef42016.gif)

## :memo: 개발 log

(3/21) 오늘부터 25일까지 개인과제를 진행한다.
과제는 1) 특정 검색어로 Github의 Repository를 검색할 수 있어야 하고, 2) 자주가는 repo를 저장(최대 4개)해 해당 repo의 issue를 한 번에 볼 수 있도록 구현해야 했다.

데이터가 많을 경우 로딩이 길어지는 경우가 있어 사용자 편의를 위해 skeleton ui를 적용해봤다.
해당 내용은 블로깅을 했다. ([https://velog.io/@hyejeong/6.-skeleton-ui](https://velog.io/@hyejeong/6.-skeleton-ui))

(3/22) https://github.com/heyjheyj/wanted-codestates-project-9
아직 다듬어야 하는 기능들이 더 있어서 추가적으로 작업을 할 생각이다.
반응형이 아쉬워서 styled-components ThemeProvider를 적용했다. 해당 내용은 블로깅 했다.
([https://velog.io/@hyejeong/styled-components-ThemeProvider-적용하기](https://velog.io/@hyejeong/styled-components-ThemeProvider-%EC%A0%81%EC%9A%A9%ED%95%98%EA%B8%B0))

(3/23) Toast Message 기능을 추가했다.
([https://velog.io/@hyejeong/Toast-Message](https://velog.io/@hyejeong/Toast-Message))

(3/24) Redux 상태관리
상태 관리를 해야할 데이터가 많지 않지만 연습을 위해 Redux, Redux Toolkit을 사용했다.
