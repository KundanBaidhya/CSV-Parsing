const prompt = require('prompt-sync')();
const fs = require('fs');
const { createNestedObject } = require('./helper/create-nested-object');


const language = prompt('Enter which language do you want your file to be : English Spanish Chinese = ').toLowerCase();
//Shows a log and takes input and stores it in a language constant
const extensionType = prompt('Which file extention would you like: JSON, JS, TS & RESX = ').toLowerCase();
//takes input about the file extension type and stores in lanType constant

switch (language) {
  case "english":
    createNestedObject('B', 'English', extensionType);
    break;

  case "spanish":
    createNestedObject('C', 'Spanish', extensionType);
    break;

  case "chinese":
    createNestedObject('D', 'Chinese', extensionType);
    break;

  default:
    console.log('Please choose a given languages only.');
    break;
}
