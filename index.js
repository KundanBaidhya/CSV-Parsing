const excelToJson = require('convert-excel-to-json');
const prompt = require('prompt-sync')();
const fs = require('fs');
const {myFunc} = require('./Helper');

const result = excelToJson({sourceFile: 'Presidents.xlsx'});

console.log(result); //log to show the result that has been parsed from the excel file


const language = prompt("Enter which language do you want your file to be : English Spanish Chinese = ");
//Shows a log and takes input and stores it in a language constant

const mergedObject = {};// Initialize an empty object for merging

switch (language) {//switch case for different language input
    case 'English':
            myFunc('B', 'English');
            break;

    case 'Spanish':
            myFunc('C', 'Spanish');
        break;

    case 'Chinese':
            myFunc('D', 'Chinese')
        break;

    default:
        console.log('Please choose a given languages only.');
        break;
}