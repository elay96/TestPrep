"use strict";
import firstExam from "/exams/ימאות-ג.json" assert { type: "json" };
import secondExam from "/exams/מכונה.json" assert { type: "json" };
const exam = document.getElementById("exam");
const examName = document.getElementById("exam-name");
const questionName = document.getElementById("question-name");
const optionsList = document.getElementById("options-list");
const questionImage = document.getElementById("question-image");
const questionButtons = document.getElementById("question-buttons");
const explanationText = document.getElementById("explanation-text");
const examNamesDropdownList = document.getElementById(
  "exam-names-dropdown-list"
);
const examsArray = { firstExam: "ימאות ג", secondExam: "מכונה" };
questionButtons.innerHTML = "";
examNamesDropdownList.innerHTML = "";
let currentExam = firstExam;
let questionIndex = 0;

function startApp() {
  setPageObjects();
}

function testsDropdownList() {
  for (let i = 0; i < Object.keys(examsArray).length; i++) {
    let test = document.createElement("li");
    let testName = Object.values(examsArray)[i];
    test.innerHTML = testName;
    test.id = "test-" + i;
    // test.onclick = setPageObjects(testName);
    examNamesDropdownList.appendChild(test).classList.add("dropdown-item");
  }
}
testsDropdownList();

function setPageObjects(test_name) {
  // Will be replaced with test's name
  examName.innerHTML = test_name;
  // currentExam = test_name;
  questionIndex = 0;
  setQuestion();
  indexSetUp();
  indexColorChoosing();
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
    let option = document.createElement("a");
    option.innerHTML = currentExam[questionIndex]["options"][i];
    option.id = "option-" + i;
    option.onclick = onChoosingOption;
    optionsList
      .appendChild(option)
      .classList.add(
        "dropdown-item",
        "list-group-item",
        "list-group-item-action"
      );
  }
  if (Object.values(currentExam[questionIndex]["image"]) != "") {
    let img = document.createElement("img");
    img.src = currentExam[questionIndex]["image"];
    img.style.height = "100px";
    questionImage.appendChild(img);
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
    indexButton.setAttribute("type", "button");
    questionButtons
      .appendChild(indexButton)
      .classList.add("btn", "btn-outline-secondary", "index-btn");
  }
}

function onChoosingIndex() {
  let id = this.id.substring(5);
  questionIndex = id;
  setQuestion();
  indexColorChoosing();
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
      indexColorChoosing();
    } else if (keyPressed.key == "ArrowRight" && questionIndex > 0) {
      questionIndex--;
      setQuestion();
      indexColorChoosing();
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
    document
      .getElementById(`page-${questionIndex}`)
      .classList.remove("btn-outline-primary", "btn-outline-danger");
    document
      .getElementById(`page-${questionIndex}`)
      .classList.add("btn-outline-success");
  } else {
    this.classList.add("list-group-item-danger");
    document
      .getElementById(`page-${questionIndex}`)
      .classList.remove("btn-outline-primary", "btn-outline-danger");
    document
      .getElementById(`page-${questionIndex}`)
      .classList.add("btn-outline-danger");
  }
  // currentExam[questionIndex]["userChoice"] = id;
  // window.localStorage.setItem(
  //   "currentExam",
  //   JSON.stringify(currentExam[questionIndex]["userChoice"])
  // );
}

function clearChoosingOptions() {
  for (let i = 0; i < Object.keys(currentExam[questionIndex]).length - 1; i++) {
    document
      .getElementById(`option-${i}`)
      .classList.remove("list-group-item-success", "list-group-item-danger");
  }
}

function indexColorChoosing() {
  for (let i = 0; i < Object.keys(currentExam).length; i++) {
    document.getElementById(`page-${i}`).classList.remove("active");
  }
  document.getElementById(`page-${questionIndex}`).classList.add("active");
}

function clearChoosingIndex() {}

//
//
// RUN FUNCTIONS
//
//

startApp();
