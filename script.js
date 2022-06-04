"use strict";

//
//
// EXAMPLE TEST
//
//

const currentExam = [
  {
    question:
      "הינך נימצא בנקודה שהאורך הגיאוגרפי שלה הוא 35:00 מערב. השעון המקומי מראה 01:24 LMT. מהי השעה ב UTC ?",
    options: [
      "23:04 UTC יום לפני כן",
      "03:44 UTC באותו יום",
      "23:04 UTC באותו יום",
      "23:04 UTC יום למחרת",
    ],
    answer: 2,
    explain: "",
    image: "",
  },
  {
    question:
      "הנך נימצא בנקודה שהאורך הגיאוגרפי שלה 55:00 W הירח זורח ב 02:24 LMT מתי הזריחה לפי UTC ?",
    options: [
      "22:44 UTC יום אחרי",
      "22:44 UTC באותו יום",
      "22:44 UTC יום קודם",
      "06:04 UTC באותו יום",
    ],
    answer: 4,
    explain: "",
    image: "example.png",
  },
];

//
//
// DEFINE VARIABLES
//
//

const examName = document.getElementById("exam-name");
const questionName = document.getElementById("question-name");
const optionsList = document.getElementById("options-list");
const questionImage = document.getElementById("question-image");
const questionButtons = document.getElementById("question-buttons");
let questionIndex = 0;

//
//
// DEFINE FUNCTIONS
//
//

function setPageObjects(test_name) {
  // Will be replaced with test's name
  examName.innerHTML = "מבחן לדוגמא";
  questionIndex = 0;
  setQuestion();
}

function setQuestion() {
  questionName.innerHTML = currentExam[questionIndex]["question"];
  optionsList.innerHTML = "";
  questionImage.innerHTML = "";
  for (
    let i = 0;
    i < Object.keys(currentExam[questionIndex]["options"]).length;
    i++
  ) {
    let a = document.createElement("a");
    a.innerHTML = currentExam[questionIndex]["options"][i];
    a.id = "option-" + i;
    a.onclick = onChoosingAnswer;
    optionsList
      .appendChild(a)
      .classList.add(
        "dropdown-item",
        "list-group-item",
        "list-group-item-action"
      );
  }
  if (Object.values(currentExam[questionIndex]["image"]) != "") {
    questionImage.innerHTML = currentExam[questionIndex]["image"];
  }
}

function onReset() {
  console.log("Resetting");
}

function onFilter() {
  console.log("Filtering");
}

function onChoosingIndex() {
  clearChoosingIndex();
  let id = this.id.substring(5);
  questionIndex = id;
  setQuestion();
}

function clearChoosingOptions() {
  // document
  //   .getElementsByClassName("index-btn")
  //   .classList.remove("list-group-item-success", "list-group-item-danger");
}
function clearChoosingIndex() {}

function onChoosingAnswer() {
  clearChoosingOptions();
  let id = this.id.substring(7);
  id++;
  if (id == currentExam[questionIndex]["answer"]) {
    this.classList.add("list-group-item-success");
  } else {
    this.classList.add("list-group-item-danger");
  }
}

//
//
// INDEX
//
//

function indexSetUp() {
  questionButtons.innerHTML = "";

  for (let i = 0; i < Object.keys(currentExam).length; i++) {
    let button = document.createElement("button");
    button.innerHTML = i + 1;
    button.onclick = onChoosingIndex;
    button.id = "page-" + i;
    questionButtons
      .appendChild(button)
      .classList.add("btn", "btn-outline-secondary", "index-btn");
  }
}

//
//
// RUN FUNCTIONS
//
//

setPageObjects();
indexSetUp();
