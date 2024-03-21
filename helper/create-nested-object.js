const excelToJson = require('convert-excel-to-json');
const prompt = require('prompt-sync')();
const fs = require('fs');
const {createFile} = require('./choose-language');

const sourceFile = 'files/Presidents.xlsx';
const result = excelToJson({ sourceFile: sourceFile });

const mergedObject = {};
const column = '';
const keys = Object.keys(result); //taking every sheet name as from the key value pair and storing them in an array named keys.

const createNestedObject = (column, language, extensionType)=>{

    for(let sheetName of keys){ //looping over the keys
        let sheet = [];
        sheet = result[sheetName];//to make individual files for every sheet.

        for(let element of sheet){//looping over every element in the sheets
            const str1 = element.A.toString();//to get specific keys from the
            const str2 = String(element[column]);// key value pair.
            
            const keys = str1.split('.');// Splitting the keys
            let currentObj = mergedObject;
    
            keys.forEach((key, index) => {
                if (index === keys.length - 1) { 
                    // Last key, assign the value
                    currentObj[key] = str2;
                } else {
                    currentObj[key] = currentObj[key] || {};
                    currentObj = currentObj[key];
                }
            });
        }

        const objectToPass = {
            language : language,
            extensionType : extensionType,
            sheetName : sheetName,
            mergedObject: mergedObject
        };

       createFile(objectToPass);

    }
}

module.exports = { createNestedObject, };