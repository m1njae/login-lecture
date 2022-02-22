"use strict";

const id = document.querySelector("#id"),
    name = document.querySelector("#name"),
    password = document.querySelector("#password"),
    confirmPassword = document.querySelector("#confirm-password"),
    registerButton = document.querySelector("#button");

registerButton.addEventListener("click", register);

function register() {
    if(!id.value) return alert("아이디를 입력해주세요");
    if (confirmPassword.value !== password.value){
        return alert("비밀번호가 일치하지 않습니다.")
    }

    const request = {
        id : id.value,
        name: name.value,
        password : password.value,
    };
    
    fetch('/register',{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(request) ,
      }).then((response) => response.json())
      .then((response) => {
          if (response.success){
              location.href = "/login";
          } else {
              alert(response.message);
          }
        })
        .catch((error) =>{
            console.error(new Error("회원가입 중 에러 발생"));
        });
}