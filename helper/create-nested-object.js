const excelToJson = require('convert-excel-to-json');
const {createFile} = require('./choose-language');


const createNestedObject = (column, language, extensionType, fileName)=>{
    const sourceFile = 'files/'+fileName;
    const result = excelToJson({ sourceFile: sourceFile });

    const mergedObject = {};
    const keys = Object.keys(result); //taking every sheet name as from the key value pair and storing them in an array named keys.


    for(let sheetName of keys){ //looping over the keys
        let sheet = [];
        sheet = result[sheetName];//to make individual files for every sheet.

        for(let element of sheet){//looping over every element in the sheets
            const str1 = element.A.toString();//to get specific keys from the
            const str2 = String(element[column]);// key value pair.
            
            const keys = str1.split(/[.\s]+/).filter(Boolean);// Splitting the keys
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
            fileName: fileName,
            language : language,
            extensionType : extensionType,
            sheetName : sheetName,
            mergedObject: mergedObject
        };

    createFile(objectToPass);

    }
}

module.exports = { createNestedObject };
