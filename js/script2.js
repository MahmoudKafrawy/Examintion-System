const userEmail = document.getElementById("user-email");
const userPassword = document.getElementById("user-password");

const emailLoginChk = document.getElementById("email-login-chk");
const passwordLoginChk = document.getElementById("password-login-chk");

localStorage.setItem("loginStatus", "false");

function login() {
  if (userEmail.value.toLowerCase() != localStorage.getItem("email").toLowerCase()) {
    emailLoginChk.innerHTML = "Wrong Email";
    emailLoginChk.style.color = "red";
    return;
  } else {
    emailLoginChk.innerHTML = "ok";
    emailLoginChk.style.color = "green";
  }

  if (userPassword.value != localStorage.getItem("password")) {
    passwordLoginChk.innerHTML = "Wrong Password";
    passwordLoginChk.style.color = "red";
    return;
  } else {
    passwordLoginChk.innerHTML = "ok";
    passwordLoginChk.style.color = "green";
  }
  localStorage.setItem("loginStatus", "true");
  window.location.replace("/Examintion-System/exam.html");
}
