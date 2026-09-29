// -- 공통 요소 선택----
const getTodoBtn = document.getElementById("getTodoBtn");
const postBtn = document.getElementById("postBtn");
const patchBtn = document.getElementById("patchBtn");
const putBtn = document.getElementById("putBtn");
const deleteBtn = document.getElementById("deleteBtn");
const listBtn = document.getElementById("listBtn");
const resultDisplay = document.getElementById("resultDisplay");
const todoList = document.getElementById("todoList");

// API 기본주소
const BASE_URL = "https://jsonplaceholder.typicode.com";

// 결과를 pre태그에 보여주는 헬퍼 함수. (서버 보낼때 : 객체 -> JSON문자열로)
function showResult(data) {
  resultDisplay.textContent = JSON.stringify(data, null, 2);
}

// 1 - 1. GET 조회.
async function fetchTodo() {
  resultDisplay.textContent = "Loading(GET)....";

  try {
    // 요청실패시 reject가 되므로 try-catch. 서버가 안켜져있는 문제와 같이.
    // 1) 요청을 보내고 응답이 도착할 때 까지 여기서 잠시 대기.
    // fetch함수에서 기본값은 GET 요청.
    // fetch()의 결과를 바로 res에 넣는게 아니라 fetch()가 성공인지 실패인지 모르지만 어쨌든 완료되면
    // 그때 res에 담는다.
    const res = await fetch(`${BASE_URL}/todos/1`); // 리턴타입 : Promise

    console.log("응답상태코드 : " + res.status); // 응답 상태코드

    // 2) 응답 본문(HTTP메세지의 바디영역) : json문자열을 객체로 바꿀때까지 기다림.
    // JSON.parse()와 같은가?
    // res.json() : fetch로 받은 응답 본문을 JSON으로 해석해서 자바스크립트값으로 바꿔줌.
    // 자바스크립트 값은 JSON이 어떤 형식인지에 따라 다름(배열 , 문자열 숫자 등....)
    // JSON.parse() : 이미 갖고있는 JSON 문자열을 직접 변환.
    const data = await res.json();
    console.log("결과 : " + data);

    // 3) 화면에 뿌려보자.
    showResult(data);
  } catch (e) {
    resultDisplay.textContent = "요청 실패 : " + e.message;
  }
}

// 1 - 2. then 사용.(메서드 체이닝)
async function fetchTodo2() {
  resultDisplay.textContent = "Loading(GET)....";

  // fetch 함수는 Promise객체를 돌려줌. 메서드를 안쓰면 기본 GET 요청.
  // method 값은 다양한 요청방식 가능.
  fetch(`${BASE_URL}/todos/1`, { method: "GET" })
    .then((res) => {
      // 1. 응답이 도착하면 실행됨.
      console.log("응답 상태코드 : " + res.status);
      // res.json()도 Promise를 돌려줌.
      return res.json();
    })
    .then((data) => {
      // 응답 본문에 문자열을 js Object로 파싱해서 넘겨받음.
      console.log(data);
      showResult(data); // 내부에서 다시 객체를 문자열로 변환하여 화면에 뿌림.
    })
    .catch((err) => {
      // 인터넷 끊기는 동안 요청 자체 실패... 등.
      resultDisplay.textContent = "요청 실패 : " + err.message;
    });
}
getTodoBtn.addEventListener("click", fetchTodo2);

// ----2. POST 생성 ------
async function createTodo() {
  resultDisplay.textContent = "Loading(POST)....";

  const newTodo = { title: "자바스크립트복습", completed: false, userId: 1 };
  try {
    // POST요청이므로 브라우저에서 서버로 생성 요청.(브라우저가 먼저 요청)
    const res = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(newTodo), // 객체 -> JSON형식 문자열로 변환. (브라우저 -> 서버로 요청 보냄).
    });
    console.log("상태 코드 : " + res.status);

    const data = await res.json(); // JSON형식의 문자열 -> 객체로 변환. (서버 -> 브라우저로 응답 보냄)
    console.log(data);
    showResult(data);
  } catch (err) {
    resultDisplay.textContent = "요청실패 : " + err.message;
  }
}
postBtn.addEventListener("click", createTodo);

// -----3.PATCH(부분수정) 생성-------
async function patchTodo() {
  resultDisplay.textContent = "Loading(PATCH).....";

  const partTodo = { title: "async,await 복습", completed: false, userId: 1 };
  try {
    const res = await fetch(`${BASE_URL}/todos/1`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(partTodo),
    });
    console.log("상태 코드 : " + res.status);
    const data = await res.json();
    console.log(data);
    showResult(data);
  } catch (err) {
    resultDisplay.textContent = "요청 실패 : " + err.message;
  }
}

patchBtn.addEventListener("click", patchTodo);

// -----4.PUT(전체수정) 생성------
async function putTodo() {
  resultDisplay.textContent = "Loading(PUT)....";

  const allTodo = { title: "전체 수정", completed: false, userId: 1 };
  try {
    const res = await fetch(`${BASE_URL}/todos/2`, {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(allTodo),
    });
    console.log("상태코드 : " + res.status);
    const data = await res.json();
    console.log(data);
    showResult(data);
  } catch (err) {
    resultDisplay.textContent = "요청 실패 : " + err.message;
  }
  Geolocation;
}
putBtn.addEventListener("click", putTodo);

// -----5.DELETE(삭제) 생성------
async function deleteTodo() {
  resultDisplay.textContent = "Loading(DELETE)....";

  try {
    const res = await fetch(`${BASE_URL}/todos/2`, { method: "DELETE" })
      .then((res) => {
        // 1. 응답이 도착하면 실행됨.
        console.log("응답 상태코드 : " + res.status);
        // res.json()도 Promise를 돌려줌.
        return res.json();
      })
      .then((data) => {
        console.log(data);
        showResult(data);
      })
      .catch((err) => {
        resultDisplay.textContent = "요청 실패 : " + err.message;
      });
  } catch (err) {
    resultDisplay.textContent = "요청 실패 : " + err.message;
  }
}
deleteBtn.addEventListener("click", deleteTodo);

// ------6.받은 목록을 화면에 그리기(todo)응용 코드-----

//사용자 -> 지역입력 --> 위도,경도 --> 날씨 정보 출력.
