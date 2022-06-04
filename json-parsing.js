"use strict";

let choosenExam = "";

function readTextFile(file, callback) {
  let rawFile = new XMLHttpRequest();
  rawFile.overrideMimeType("application/json");
  rawFile.open("GET", file, true);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4 && rawFile.status == "200") {
      callback(rawFile.responseText);
    }
  };
  rawFile.send(null);
}

//usage:
readTextFile("exams/example.json", function (text) {
  choosenExam = JSON.parse(text);
  console.log(choosenExam);
});
