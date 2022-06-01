"use strict";

// Exam for example

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

// console.log(currentExam[0]["options"][0]);

// Define Variables
const examName = document.getElementById("exam-name");
const questionName = document.getElementById("question-name");
const optionsList = document.getElementById("options-list");
const questionImage = document.getElementById("question-image");
const questionButtons = document.getElementById("question-buttons");
let questionIndex = 0;

// Define Objects

examName.innerHTML = "מבחן לדוגמא";
questionName.innerHTML = currentExam[questionIndex]["question"];
optionsList.innerHTML = "";
for (
  let i = 0;
  i < Object.keys(currentExam[questionIndex]["options"]).length;
  i++
) {
  let a = document.createElement("a");
  a.innerHTML = currentExam[questionIndex]["options"][i];
  optionsList
    .appendChild(a)
    .classList.add(
      "dropdown-item",
      "list-group-item",
      "list-group-item-action"
    );
}
if (Object.values(currentExam[questionIndex]["image"]) != "") {
  questionImage.innerHTML = "לכתוב קוד ששותל פה תמונה";
}
// Buttons
function onReset() {
  console.log("Resetting");
}

function onFilter() {
  console.log("Filtering");
}

function onChoose(i) {
  console.log("Filtering");
}

// Index
questionButtons.innerHTML = "";

for (let i = 0; i < Object.keys(currentExam).length; i++) {
  let button = document.createElement("button");
  button.innerHTML = i + 1;
  questionButtons
    .appendChild(button)
    .classList.add("btn", "btn-outline-secondary");
}
