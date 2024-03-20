const excelToJson = require('convert-excel-to-json');
const prompt = require('prompt-sync')();
const fs = require('fs');

const result = excelToJson({ sourceFile: 'Presidents.xlsx' });

const mergedObject = {};
const column = '';
const keys = Object.keys(result); //taking every sheet name as from 
console.log(keys);//the key value pair and storing them in an array named keys.

const myFunc = (column, language, lanType)=>{

    for(let sheetName of keys){ //looping over the keys
        sheet = result[sheetName];//to make individual files for every sheet.
        console.log(sheet);

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

        // Writing the merged object to a file
        if (lanType === 'json') {
            // INTO JSON
            fs.writeFileSync(sheetName+' '+language+'.json', JSON.stringify(mergedObject, null, 2));
            console.log('JSON written to ' +sheetName+' '+language+ '.json');
        } else if (lanType === 'js') {
            // INTO JS
            fs.writeFileSync(sheetName+' '+language+ '.js', `module.exports = ${JSON.stringify(mergedObject, null, 2)};`);
            console.log('JavaScript written to ' +sheetName+' '+language+ '.js');
        } else if (lanType === 'ts') {
            //  INTO TS
            // importing data from the file would require using the "data" constant
            fs.writeFileSync(sheetName+' '+language+ '.ts', `export const data = ${JSON.stringify(mergedObject, null, 2)};`);
            console.log('TypeScript written to ' + sheetName+' '+language+ '.ts');
        } else {
            console.log("Invalid file type! Please enter either: JSON, JS or TS.")
        };

    }
}

module.exports = { myFunc, };