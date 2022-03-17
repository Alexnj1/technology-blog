// const { response } = require("express");

const logInButton = document.querySelector("#log-in");
const email = document.querySelector("#email-form");
const password = document.querySelector("#password-form");

const signUpButton = document.querySelector("#sign-up");
const newUser = document.querySelector("#new-user");
const newEmail = document.querySelector("#new-email");
const newPassword = document.querySelector("#new-password");

function logIn() {
  if (email && password) {
    fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.value.trim(),
        password: password.value.trim(),
      }),
    }).then((response) => {
      if (response.ok) {
        response.json();
        alert("You are now logged in!");
        window.location.replace("/");
      } else {
        alert("Your email/password is incorrect");
        return;
      }
    });
  } else {
    alert("You must fill out both fields!");
  }

  // console.log(email.value, password)
}

function signUp() {
  if (newUser && newEmail && newPassword) {
    fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: newUser.value.trim(),
        email: newEmail.value.trim(),
        password: newPassword.value.trim(),
      }),
    }).then((response) => {
      if (response.ok) {
        alert("New user created!");
      } else {
        alert(response.statusText);
      }
    });
  } else {
    alert("You must fill out all required fields!");
  }
}

logInButton.addEventListener("click", logIn);
signUpButton.addEventListener("click", signUp);
