"use strict";
import firstExam from "/exams/ימאות-ג.json" assert { type: "json" };
import secondExam from "/exams/מכונה.json" assert { type: "json" };
const alphabet = [
  "א",
  "ב",
  "ג",
  "ד",
  "ה",
  "ו",
  "ז",
  "ח",
  "ט",
  "י",
  "כ",
  "ל",
  "מ",
  "נ",
  "ס",
  "ע",
  "פ",
  "צ",
  "ק",
  "ר",
  "ש",
  "ת",
];
const exam = document.getElementById("exam");
const examName = document.getElementById("exam-name");
const questionName = document.getElementById("question-name");
const optionsList = document.getElementById("options-list");
const questionImage = document.getElementById("question-image");
const questionButtons = document.getElementById("question-buttons");
const explanationText = document.getElementById("explanation-text");
const filterButton = document.getElementById("filter-button");
const resetButton = document.getElementById("reset-button");
const examNamesDropdownList = document.getElementById(
  "exam-names-dropdown-list"
);
const examsArray = { firstExam: "ימאות ג", secondExam: "מכונה" };
questionButtons.innerHTML = "";
examNamesDropdownList.innerHTML = "";
let currentExam = firstExam;
let currentExamString = "firstExam";
let questionIndex = 0;
let currentExamName = "";

function startApp() {
  currentExamName = examsArray[currentExamString];
  setPageObjects(currentExamName);
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
  let questionIndexForPrinting = Number(questionIndex) + 1;
  questionName.innerHTML =
    questionIndexForPrinting + ". " + currentExam[questionIndex]["question"];
  optionsList.innerHTML = "";
  optionsList.id = currentExamString + "_" + questionIndex;
  questionImage.innerHTML = "";
  explanationText.innerHTML = "";
  for (
    let i = 0;
    i < Object.keys(currentExam[questionIndex]["options"]).length;
    i++
  ) {
    let option = document.createElement("a");

    option.innerHTML =
      alphabet[i] + ". " + currentExam[questionIndex]["options"][i];
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
  if (localStorage.getItem(JSON.stringify(optionsList.id)) != null) {
    let questionIdToPass = localStorage.getItem(JSON.stringify(optionsList.id));
    questionIdToPass = "option-" + questionIdToPass;
    optionsPageElements(questionIdToPass);
  }
}

resetButton.addEventListener("click", onReset);
function onReset() {
  localStorage.clear();
  location.reload();
}
filterButton.addEventListener("click", onFilter);
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
    if (localStorage.getItem(JSON.stringify(optionsList.id)) != null) {
      let questionIdToPass = localStorage.getItem(
        JSON.stringify(optionsList.id)
      );
      questionIdToPass = "option-" + questionIdToPass;
      optionsPageElements(questionIdToPass);
    }
    let indexItemId = currentExamString + "_" + i;
    let answer = Number(currentExam[i]["answer"]) - 1;
    let localStorageSavedQuestion = localStorage.getItem(
      JSON.stringify(indexItemId)
    );
    if (localStorageSavedQuestion != null) {
      if (localStorageSavedQuestion == answer) {
        indexButton.classList.remove(
          "btn-outline-primary",
          "btn-outline-danger"
        );
        indexButton.classList.add("btn-outline-success");
      } else {
        indexButton.classList.remove(
          "btn-outline-primary",
          "btn-outline-success"
        );
        indexButton.classList.add("btn-outline-danger");
      }
    }
  }
}
function onChoosingIndex() {
  questionIndex = this.id.substring(5);
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
  let id = this.id;
  localStorage.setItem(
    JSON.stringify(currentExamString + "_" + questionIndex),
    id.substring(7)
  );
  optionsPageElements(id);
}

function optionsPageElements(questionId) {
  const thisId = document.getElementById(questionId);
  const pageElement = document.getElementById("page-" + questionIndex);
  let answer = Number(currentExam[questionIndex]["answer"]) - 1;
  questionId = questionId.substring(7);
  if (questionId == answer) {
    explanationText.innerHTML = "";
    thisId.classList.add("list-group-item-success");
    if (pageElement != null) {
      pageElement.classList.remove("btn-outline-primary", "btn-outline-danger");
      pageElement.classList.add("btn-outline-success");
    }
  } else {
    thisId.classList.add("list-group-item-danger");
    if (pageElement != null) {
      pageElement.classList.remove("btn-outline-primary", "btn-outline-danger");
      pageElement.classList.add("btn-outline-danger");
    }
    if (
      currentExam[questionIndex]["explain"] != "" &&
      !document.getElementById("explain-text")
    ) {
      let explain = document.createElement("p");
      explain.innerHTML = currentExam[questionIndex]["explain"];
      explain.id = "explain-text";
      explanationText.appendChild(explain);
    }
  }
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
