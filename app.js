"use strict";

const http = require("http");
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");
  res.end("<h1>Hello World</h1>");
});

server.listen(port, () => {
  console.log(`Server running at port ` + port);
});

const exam = document.getElementById("exam");
const examName = document.getElementById("exam-name");
const questionName = document.getElementById("question-name");
const optionsList = document.getElementById("options-list");
const questionImage = document.getElementById("question-image");
const questionButtons = document.getElementById("question-buttons");
const explanationText = document.getElementById("explanation-text");
questionButtons.innerHTML = "";
let questionIndex = 0;

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
  explanationText.innerHTML = "";
  for (
    let i = 0;
    i < Object.keys(currentExam[questionIndex]["options"]).length;
    i++
  ) {
    let a = document.createElement("a");
    a.innerHTML = currentExam[questionIndex]["options"][i];
    a.id = "option-" + i;
    a.onclick = onChoosingOption;
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

function indexSetUp() {
  for (let i = 0; i < Object.keys(currentExam).length; i++) {
    let indexButton = document.createElement("button");
    indexButton.innerHTML = i + 1;
    indexButton.onclick = onChoosingIndex;
    indexButton.id = "page-" + i;
    questionButtons
      .appendChild(indexButton)
      .classList.add("btn", "btn-outline-secondary", "index-btn");
  }
}

function onChoosingIndex() {
  let id = this.id.substring(5);
  questionIndex = id;
  setQuestion();
}

document.addEventListener("keydown", choosingIndexUsingKeyboard);
function choosingIndexUsingKeyboard(keyPressed) {
  if (questionIndex < Object.keys(currentExam).length && questionIndex >= 0) {
    if (
      keyPressed.key == "ArrowLeft" &&
      questionIndex < Object.keys(currentExam).length - 1
    ) {
      questionIndex++;
      setQuestion();
    } else if (keyPressed.key == "ArrowRight" && questionIndex > 0) {
      questionIndex--;
      setQuestion();
    }
  } else {
    // Do nothing
  }
}

function onChoosingOption() {
  clearChoosingOptions();
  let id = this.id.substring(7);
  id++;
  if (id == currentExam[questionIndex]["answer"]) {
    this.classList.add("list-group-item-success");
  } else {
    this.classList.add("list-group-item-danger");
  }
}

function clearChoosingOptions() {
  for (let i = 0; i < Object.keys(currentExam[questionIndex]).length - 1; i++) {
    document
      .getElementById(`option-${i}`)
      .classList.remove("list-group-item-success", "list-group-item-danger");
  }
}

function clearChoosingIndex() {}

//
//
// RUN FUNCTIONS
//
//

setPageObjects();
indexSetUp();
