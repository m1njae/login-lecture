"use strict";

const id = document.querySelector("#id"),
    password = document.querySelector("#password"),
    loginButton = document.querySelector("#button");

loginButton.addEventListener("click", login);

function login() {
    if(!id.value) return alert("아이디를 입력해주세요");
    if(!password.value) return alert("비밀번호를 입력해주세요");
    const request = {
        id : id.value,
        password : password.value,
    };
    
    fetch('/login',{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request) ,
        // object를 문자열로 바꿔주어 JSON 형태로 만들어준다
      }).then((response) => response.json())
      .then((response) => {
          if (response.success){
              location.href = "/";
          } else {
              if (response.error) return alert("문제가 발생하였습니다!");
              alert(response.message);
          }
        })
        .catch((error) =>{
            console.error("로그인 중 에러 발생");
        });
}