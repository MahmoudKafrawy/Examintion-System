console.log(localStorage.getItem("logged"));

const questionH = document.getElementById("questionH");
const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");
const answer4 = document.getElementById("answer4");

var answers = document.querySelectorAll(".answers");

const timerEl = document.querySelector(".timer");

const laodingBar = document.getElementById("loading");

const quesID = document.getElementById("quesID");

const markBox = document.querySelector(".mark-box");

var loginStatus = window.localStorage.getItem("loginStatus");
console.log(loginStatus);

if (loginStatus != "true") {
  console.log("foo");
  document.querySelector(".containerExam").style.display = "none";
  document.querySelector(".submit-exam").style.display = "none";
  document.querySelector("body").innerHTML = `<h1>Please login To Start</h1>`;
}

function question(ques, ans1, ans2, ans3, ans4, id, correct) {
  this.ques = ques;
  this.ans1 = ans1;
  this.ans2 = ans2;
  this.ans3 = ans3;
  this.ans4 = ans4;
  this.id = id;
  this.correct = correct;
}

var question1 = new question(
  "An integer that is divisible by 2 is called:",
  "Even number",
  "Natural number",
  "Odd number",
  "Whole number",
  1,
  "Even number"
);

var question2 = new question("Square root of 225 ?", "12", "13", "15", "10", 2, "15");
var question3 = new question("20+(90÷2) is equal to:", "50", "65", "55", "60", 3, "65");
var question4 = new question(
  "A square has all its angles equal to:",
  "99 deg",
  "90 deg",
  "45 deg",
  "30 deg",
  4,
  "90 deg"
);
var arrayOfQuestion = [];
arrayOfQuestion.push(question1);
arrayOfQuestion.push(question2);
arrayOfQuestion.push(question3);
arrayOfQuestion.push(question4);

function shuffle(arrayOfQuestion) {
  let currentIndex = arrayOfQuestion.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [arrayOfQuestion[currentIndex], arrayOfQuestion[randomIndex]] = [
      arrayOfQuestion[randomIndex],
      arrayOfQuestion[currentIndex],
    ];
  }

  return arrayOfQuestion;
}
shuffle(arrayOfQuestion);
console.log(arrayOfQuestion);

let i = 0;

function showQuestionFirst(index = 0) {
  i = index;
  questionH.innerHTML = arrayOfQuestion[i].ques;
  answer1.innerHTML = arrayOfQuestion[i].ans1;
  answer2.innerHTML = arrayOfQuestion[i].ans2;
  answer3.innerHTML = arrayOfQuestion[i].ans3;
  answer4.innerHTML = arrayOfQuestion[i].ans4;
  quesID.value = arrayOfQuestion[i].id;
}
showQuestionFirst();

function showQuestion() {
  i++;
  if (i >= arrayOfQuestion.length) {
    i = arrayOfQuestion.length;
    return;
  }
  questionH.innerHTML = arrayOfQuestion[i].ques;
  answer1.innerHTML = arrayOfQuestion[i].ans1;
  answer2.innerHTML = arrayOfQuestion[i].ans2;
  answer3.innerHTML = arrayOfQuestion[i].ans3;
  answer4.innerHTML = arrayOfQuestion[i].ans4;
  quesID.value = arrayOfQuestion[i].id;
  for (const i in Object.keys(answers)) {
    answers[i].classList.remove("answers-checked");
  }
}

function showPervQuestion() {
  i--;
  if (i < 0) {
    i = 0;
  }
  questionH.innerHTML = arrayOfQuestion[i].ques;
  answer1.innerHTML = arrayOfQuestion[i].ans1;
  answer2.innerHTML = arrayOfQuestion[i].ans2;
  answer3.innerHTML = arrayOfQuestion[i].ans3;
  answer4.innerHTML = arrayOfQuestion[i].ans4;
  quesID.value = arrayOfQuestion[i].id;
}

var markArray = [];

function mark() {
  var checkMarkArray = markArray.indexOf(`${questionH.innerText}`) > -1;
  if (checkMarkArray == true) {
    console.log("fail");
    return;
  } else {
    markArray.push(questionH.innerText);
    console.log("success");
  }
}

function ShowMark() {
  markBox.innerHTML = "";
  for (let value of markArray) {
    markBox.innerHTML += `<i class="fa-solid fa-trash" id="${value}" onclick="deleteMark(this.id)" ></i>
   
    <span onclick="findQuestion(this)">${value}</span><br/>`;
  }
}

// <span >❌</span>

function chooseAnswer1() {
  window.localStorage.setItem(quesID.value, answer1.innerHTML);
  for (const i in Object.keys(answers)) {
    answers[i].classList.remove("answers-checked");
  }
  ans1Div.classList.add("answers-checked");
}
function chooseAnswer2() {
  window.localStorage.setItem(quesID.value, answer2.innerHTML);
  for (const i in Object.keys(answers)) {
    answers[i].classList.remove("answers-checked");
  }
  ans2Div.classList.add("answers-checked");
}
function chooseAnswer3() {
  window.localStorage.setItem(quesID.value, answer3.innerHTML);
  for (const i in Object.keys(answers)) {
    answers[i].classList.remove("answers-checked");
  }
  ans3Div.classList.add("answers-checked");
}
function chooseAnswer4() {
  window.localStorage.setItem(quesID.value, answer4.innerHTML);
  for (const i in Object.keys(answers)) {
    answers[i].classList.remove("answers-checked");
  }
  ans4Div.classList.add("answers-checked");
}

// var timer = 600000;
// setInterval(() => {
//   timer = timer - 1000;
//   var minutes = Math.floor(timer / 1000 / 60);
//   var seconds = Math.floor(timer - minutes * 60 * 1000) / 1000;
//   timerEl.innerHTML = minutes + ":" + seconds + " left";
// }, 1000);

var totalSeconds = 300;

setInterval(() => {
  totalSeconds = totalSeconds - 1;
  // 👇️ get number of full minutes
  const minutes = Math.floor(totalSeconds / 60);

  // 👇️ get remainder of seconds
  const seconds = totalSeconds % 60;

  function padTo2Digits(num) {
    return num.toString().padStart(2, "0");
  }

  // ✅ format as MM:SS
  const result = `${minutes}:${padTo2Digits(seconds)}`;
  timerEl.innerHTML = result + " left";
}, 1000);

setInterval(() => {
  var percangte = (totalSeconds / 300) * 100;
  laodingBar.style.width = percangte + "%";
}, 1000);

var correctArr = [question1.correct, question2.correct, question3.correct, question4.correct];
var resultOfExam = 0;
setTimeout(() => {
  for (let i = 1; i <= arrayOfQuestion.length; i++) {
    var item = window.localStorage.getItem(`${i}`);
    console.log(i);
    var Q = correctArr[i - 1];
    function result() {
      if (Q == item) {
        resultOfExam += 1;
      } else {
      }
    }
    result();
    localStorage.setItem("loginStatus", "false");
  }
  document.querySelector(".containerExam").style.display = "none";
  document.querySelector(".submit-exam").style.display = "none";
  document.querySelector("body").innerHTML = `<h1>result is ${resultOfExam}/4 </h1>`;
}, 300000);

function endExam() {
  for (let i = 1; i <= arrayOfQuestion.length; i++) {
    var item = window.localStorage.getItem(`${i}`);
    console.log(i);
    var Q = correctArr[i - 1];
    function result() {
      if (Q == item) {
        resultOfExam += 1;
      } else {
      }
    }
    result();
    localStorage.setItem("loginStatus", "false");
  }
  document.querySelector(".containerExam").style.display = "none";
  document.querySelector(".submit-exam").style.display = "none";
  document.querySelector("body").innerHTML = `<h1>result is ${resultOfExam}/4 </h1>`;
}

var xEl = document.getElementById("x").addEventListener("click", deleteMark);

function deleteMark(ele) {
  const index = markArray.indexOf(ele);
  console.log(markArray);
  console.log(markArray.indexOf(ele));
  markArray.splice(index, 1);
  ShowMark();
}

function findQuestion(ele) {
  console.log(ele.innerHTML);
  var yEL = ele.innerHTML;
  index = arrayOfQuestion.findIndex((x) => x.ques == yEL);
  showQuestionFirst(index);
  console.log(index);
}
