const firstName = document.getElementById("reg-first-name");
const lastName = document.getElementById("reg-last-name");
const email = document.getElementById("reg-email");
const password = document.getElementById("reg-user-password");
const password2 = document.getElementById("reg-user-password2");
const regBox = document.querySelector(".reg-box");
const regSucess = document.getElementById("reg-sucess");

const fnChk = document.getElementById("fn-chk");
const lnChk = document.getElementById("ln-chk");
const emailChk = document.getElementById("email-chk");
const passChk = document.getElementById("pass-chk");
const passChk2 = document.getElementById("pass-chk2");

var regx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
var regx2 = /^[A-Za-z]+$/;

function submit() {
  if (!regx2.test(firstName.value)) {
    fnChk.innerHTML = "No number allowed";
    fnChk.style.color = "red";
    return;
  } else {
    fnChk.innerHTML = "ok";
    fnChk.style.color = "green";
  }

  if (!regx2.test(lastName.value)) {
    lnChk.innerHTML = "No number allowed";
    lnChk.style.color = "red";
    return;
  } else {
    lnChk.innerHTML = "ok";
    lnChk.style.color = "green";
  }

  if (!regx.test(email.value)) {
    emailChk.innerHTML = "Enter Valid Email";
    emailChk.style.color = "red";
    return;
  } else {
    emailChk.innerHTML = "ok";
    emailChk.style.color = "green";
  }

  if (password.value.length < 8) {
    passChk.innerHTML = "Minmum 8 Characters";
    passChk.style.color = "red";
    return;
  } else {
    passChk.innerHTML = "ok";
    passChk.style.color = "green";
  }

  if (password.value != password2.value) {
    passChk2.innerHTML = "Password dont match";
    passChk2.style.color = "red";
    return;
  } else {
    passChk2.innerHTML = "ok";
    passChk2.style.color = "green";
  }
  localStorage.setItem("email", email.value);
  localStorage.setItem("password", password2.value);

  regBox.classList.add("reg-box-hidden");
  regSucess.innerHTML = `Welcome <font color="red">${firstName.value} ${lastName.value} , </font> <br/> Redirecting to login page`;
  regSucess.style.display = "block";
  setInterval(() => {
    regSucess.innerHTML += " .";
  }, 500);
  setInterval(() => {
    window.location.replace("/index.html");
  }, 2500);
}
