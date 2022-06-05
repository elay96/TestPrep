"use strict";

var http = require("http");
var fs = require("fs");
var path = require("path");

http
  .createServer(function (request, response) {
    console.log("request starting for ");
    console.log(request);

    var filePath = "." + request.url;
    if (filePath == "./") filePath = "./index.html";

    console.log(filePath);
    var extname = path.extname(filePath);
    var contentType = "text/html";
    switch (extname) {
      case ".js":
        contentType = "text/javascript";
        break;
      case ".css":
        contentType = "text/css";
        break;
    }

    path.exists(filePath, function (exists) {
      if (exists) {
        fs.readFile(filePath, function (error, content) {
          if (error) {
            response.writeHead(500);
            response.end();
          } else {
            response.writeHead(200, { "Content-Type": contentType });
            response.end(content, "utf-8");
          }
        });
      } else {
        response.writeHead(404);
        response.end();
      }
    });
  })
  .listen(process.env.PORT || 3000);

console.log("Server running at http://127.0.0.1:3000/");

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
