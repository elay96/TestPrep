"use strict";
import firstExam from "/exams/ימאות-ג.json" assert { type: "json" };
import secondExam from "/exams/מכונה.json" assert { type: "json" };
import alphabet from "/js/config.js";
const elementExamName = document.getElementById("exam-name");
const elementQuestionName = document.getElementById("question-name");
const elementOptionsList = document.getElementById("options-list");
const elementQuestionImage = document.getElementById("question-image");
const elementIndexButtons = document.getElementById("index-buttons");
const elementExplanationText = document.getElementById("explanation-text");
const elementFilterButton = document.getElementById("filter-button");
const elementResetButton = document.getElementById("reset-button");
const elementExamNamesDropdownList = document.getElementById(
  "exam-names-dropdown-list"
);
const examsArray = { firstExam: "ימאות ג", secondExam: "מכונה" };
let currentExam = firstExam;
let currentExamString = "firstExam";
let currentQuestionIndex = 0;

startApp();

function startApp() {
  elementIndexButtons.innerHTML = "";
  elementExamNamesDropdownList.innerHTML = "";
  let currentExamName = examsArray[currentExamString];
  definePageObjects(currentExamName);
}

function definePageObjects(test_name) {
  elementExamName.innerHTML = test_name;
  currentQuestionIndex = 0;
  defineQuestion();
  defineIndex();
  defineIndexColor();
  defineTestsDropdownList();
}
function defineQuestion() {
  let currentQuestionIndexForPrinting = Number(currentQuestionIndex) + 1;
  elementQuestionName.innerHTML =
    currentQuestionIndexForPrinting +
    ". " +
    currentExam[currentQuestionIndex]["question"];
  elementOptionsList.innerHTML = "";
  elementOptionsList.id = currentExamString + "_" + currentQuestionIndex;
  elementQuestionImage.innerHTML = "";
  elementExplanationText.innerHTML = "";
  for (
    let i = 0;
    i < Object.keys(currentExam[currentQuestionIndex]["options"]).length;
    i++
  ) {
    let elementOptionCreation = document.createElement("a");
    elementOptionCreation.innerHTML =
      alphabet[i] + ". " + currentExam[currentQuestionIndex]["options"][i];
    elementOptionCreation.id = "option-" + i;
    elementOptionCreation.onclick = onChoosingOption;
    elementOptionsList
      .appendChild(elementOptionCreation)
      .classList.add(
        "dropdown-item",
        "list-group-item",
        "list-group-item-action"
      );
  }
  if (Object.values(currentExam[currentQuestionIndex]["image"]) != "") {
    let elementImageCreation = document.createElement("img");
    elementImageCreation.src = currentExam[currentQuestionIndex]["image"];
    elementImageCreation.style.height = "100px";
    elementQuestionImage.appendChild(elementImageCreation);
  }
  if (localStorage.getItem(JSON.stringify(elementOptionsList.id)) != null) {
    let currentQuestionId =
      "option-" + localStorage.getItem(JSON.stringify(elementOptionsList.id));
    definePageElements(currentQuestionId);
  }
}
function defineIndex() {
  for (let i = 0; i < Object.keys(currentExam).length; i++) {
    let elementIndexButtonCreation = document.createElement("button");
    elementIndexButtonCreation.innerHTML = i + 1;
    elementIndexButtonCreation.onclick = onChoosingIndex;
    elementIndexButtonCreation.id = "page-" + i;
    elementIndexButtonCreation.setAttribute("type", "button");
    elementIndexButtons
      .appendChild(elementIndexButtonCreation)
      .classList.add("btn", "btn-outline-secondary", "index-btn");
    if (localStorage.getItem(JSON.stringify(elementOptionsList.id)) != null) {
      let questionIdToPass = localStorage.getItem(
        JSON.stringify(elementOptionsList.id)
      );
      questionIdToPass = "option-" + questionIdToPass;
      definePageElements(questionIdToPass);
    }
    let currentIndexId = currentExamString + "_" + i;
    let currentChosenAnswer = Number(currentExam[i]["answer"]) - 1;
    let localStorageSavedQuestion = localStorage.getItem(
      JSON.stringify(currentIndexId)
    );
    if (localStorageSavedQuestion != null) {
      if (localStorageSavedQuestion == currentChosenAnswer) {
        elementIndexButtonCreation.classList.remove(
          "btn-outline-primary",
          "btn-outline-danger"
        );
        elementIndexButtonCreation.classList.add("btn-outline-success");
      } else {
        elementIndexButtonCreation.classList.remove(
          "btn-outline-primary",
          "btn-outline-success"
        );
        elementIndexButtonCreation.classList.add("btn-outline-danger");
      }
    }
  }
}
function defineIndexColor() {
  for (let i = 0; i < Object.keys(currentExam).length; i++) {
    document.getElementById(`page-${i}`).classList.remove("active");
  }
  document
    .getElementById(`page-${currentQuestionIndex}`)
    .classList.add("active");
}

function defineTestsDropdownList() {
  for (let i = 0; i < Object.keys(examsArray).length; i++) {
    let elementTestCreation = document.createElement("li");
    let elementTestName = Object.values(examsArray)[i];
    elementTestCreation.innerHTML = elementTestName;
    elementTestCreation.id = "test-" + i;
    // test.onclick = setPageObjects(testName);
    elementExamNamesDropdownList
      .appendChild(elementTestCreation)
      .classList.add("dropdown-item");
  }
}

elementResetButton.addEventListener("click", onReset);
function onReset() {
  localStorage.clear();
  location.reload();
}
elementFilterButton.addEventListener("click", onFilter);
function onFilter() {
  console.log("Filtering");
}

function onChoosingIndex() {
  currentQuestionIndex = this.id.substring(5);
  defineQuestion();
  defineIndexColor();
}

document.addEventListener("keydown", onChoosingIndexUsingKeyboard);
function onChoosingIndexUsingKeyboard(keyPressed) {
  if (
    currentQuestionIndex < Object.keys(currentExam).length &&
    currentQuestionIndex >= 0
  ) {
    if (
      keyPressed.key == "ArrowLeft" &&
      currentQuestionIndex < Object.keys(currentExam).length - 1
    ) {
      currentQuestionIndex++;
    } else if (keyPressed.key == "ArrowRight" && currentQuestionIndex > 0) {
      currentQuestionIndex--;
    }
    defineQuestion();
    defineIndexColor();
  } else {
    // Do nothing
  }
}
function onChoosingOption() {
  clearChoosingOptions();
  let choosenOption = this.id;
  localStorage.setItem(
    JSON.stringify(currentExamString + "_" + currentQuestionIndex),
    choosenOption.substring(7)
  );
  definePageElements(choosenOption);
}

function definePageElements(currentChoosenOption) {
  const elementChoosenOption = document.getElementById(currentChoosenOption);
  const elementsChoosenIndex = document.getElementById(
    "page-" + currentQuestionIndex
  );
  let currentCorrectOption =
    Number(currentExam[currentQuestionIndex]["answer"]) - 1;
  currentChoosenOption = currentChoosenOption.substring(7);
  if (currentChoosenOption == currentCorrectOption) {
    elementExplanationText.innerHTML = "";
    elementChoosenOption.classList.add("list-group-item-success");
    if (elementsChoosenIndex != null) {
      elementsChoosenIndex.classList.remove(
        "btn-outline-primary",
        "btn-outline-danger"
      );
      elementsChoosenIndex.classList.add("btn-outline-success");
    }
  } else {
    elementChoosenOption.classList.add("list-group-item-danger");
    if (elementsChoosenIndex != null) {
      elementsChoosenIndex.classList.remove(
        "btn-outline-primary",
        "btn-outline-danger"
      );
      elementsChoosenIndex.classList.add("btn-outline-danger");
    }
    if (
      currentExam[currentQuestionIndex]["explain"] != "" &&
      !document.getElementById("explain-text")
    ) {
      let elementExplainCreation = document.createElement("p");
      elementExplainCreation.innerHTML =
        currentExam[currentQuestionIndex]["explain"];
      elementExplainCreation.id = "explain-text";
      elementExplanationText.appendChild(elementExplainCreation);
    }
  }
}

function clearChoosingOptions() {
  for (
    let i = 0;
    i < Object.keys(currentExam[currentQuestionIndex]).length - 1;
    i++
  ) {
    document
      .getElementById(`option-${i}`)
      .classList.remove("list-group-item-success", "list-group-item-danger");
  }
}
