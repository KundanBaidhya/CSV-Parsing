const excelToJson = require("convert-excel-to-json");
const prompt = require("prompt-sync")();
const fs = require("fs");
const { myFunc } = require("./helper");

const result = excelToJson({ sourceFile: "Presidents.xlsx" });

console.log(result); //log to show the result that has been parsed from the excel file

const language = prompt(
  "Enter which language do you want your file to be : English Spanish Chinese = "
);
//Shows a log and takes input and stores it in a language constant
const lanType = prompt("Which file extention would you like: JSON, JS, TS, RESX = ");
//takes input about the file extension type and stores in lanType constant
const mergedObject = {}; // Initialize an empty object for merging

//switch case for different language input
switch (language) {
  case "English":
    switch (lanType) {
      case 'JSON':
        myFunc('B', 'English', 'json');
        break;
      case 'JS':
        myFunc('B', 'English', 'js');
        break;
      case 'TS':
        myFunc('B', 'English', 'ts');
        break;
      case 'RESX':
        myFunc('B', 'English', 'resx');
        break;
    }
    break;

  case "Spanish":
    switch (lanType) {
      case 'JSON':
        myFunc('C', 'Spanish', 'json');
        break;
      case 'JS':
        myFunc('C', 'Spanish', 'js');
        break;
      case 'TS':
        myFunc('C', 'Spanish', 'ts');
        break;
      case 'RESX':
        myFunc('C', 'Spanish', 'resx');
        break;
    }
    break;

  case "Chinese":
    switch (lanType) {
      case 'JSON':
        myFunc('D', 'Chinese', 'json');
        break;
      case 'JS':
        myFunc('D', 'Chinese', 'js');
        break;
      case 'TS':
        myFunc('D', 'Chinese', 'ts');
        break;
      case 'RESX':
        myFunc('D', 'Chinese', 'resx');
        break;
    }
    break;

  default:
    console.log("Please choose a given languages only.");
    break;
}
