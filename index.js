const excelToJson = require('convert-excel-to-json');
const prompt = require('prompt-sync')();
const fs = require('fs');

const result = excelToJson({sourceFile: 'Presidents.xlsx'});

console.log(result); //log to show the result that has been parsed from the excel file


const language = prompt("Enter which language do you want your file to be : English Spanish Chinese = ");
//Shows a log and takes input and stores it in a language constant

const mergedObject = {};// Initialize an empty object for merging

switch (language) {//switch case for different language input
    case 'English':
            result.sharingModal2.forEach(element => {
            const str1 = element.A.toString();
            const str2 = element.B.toString();

            // Split the keys
            const keys = str1.split('.');
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
            });

            // Writing the merged object to a file
            fs.writeFileSync('English.json', JSON.stringify(mergedObject, null, 2));

            console.log('JSON written to English.json');
        break;

    case 'Spanish':
        result.sharingModal2.forEach(element => {
            const str1 = element.A.toString();
            const str2 = element.C.toString();

            
            const keys = str1.split('.');
            let currentObj = mergedObject;

            keys.forEach((key, index) => {
                if (index === keys.length - 1) {
                    
                    currentObj[key] = str2;
                } else {
                    currentObj[key] = currentObj[key] || {};
                    currentObj = currentObj[key];
                }
                });
            });

            
            fs.writeFileSync('Spanish.json', JSON.stringify(mergedObject, null, 2));

            console.log('JSON written to Spanish.json');
        break;

    case 'Chinese':
        result.sharingModal2.forEach(element => {
            const str1 = element.A.toString();
            const str2 = element.D.toString();

            
            const keys = str1.split('.');
            let currentObj = mergedObject;

            keys.forEach((key, index) => {
                if (index === keys.length - 1) {
                    
                    currentObj[key] = str2;
                } else {
                    currentObj[key] = currentObj[key] || {};
                    currentObj = currentObj[key];
                }
                });
            });

            
            fs.writeFileSync('Chinese.json', JSON.stringify(mergedObject, null, 2));

            console.log('JSON written to Chinese.json');
        break;

    default:
        console.log('Please choose a given languages only.');
        break;
}

//some changes for pr