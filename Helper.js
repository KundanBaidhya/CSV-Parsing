const excelToJson = require('convert-excel-to-json');
const prompt = require('prompt-sync')();
const fs = require('fs');

const result = excelToJson({ sourceFile: 'Presidents.xlsx' });

const mergedObject = {};
const column = '';

const myFunc = (column, Language, LanType) => {
    result.sharingModal2.forEach(element => {
        const str1 = element.A.toString();
        const str2 = String(element[column]);
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
    if (LanType === 'json') {
        // INTO JSON
        fs.writeFileSync(Language + '.json', JSON.stringify(mergedObject, null, 2));
        console.log('JSON written to ' + Language + '.json');
    } else if (LanType === 'js') {
        // INTO JS
        fs.writeFileSync(Language + '.js', `module.exports = ${JSON.stringify(mergedObject, null, 2)};`);
        console.log('JavaScript written to ' + Language + '.js');
    } else if (LanType === 'ts') {
        //  INTO TS
        // importing data from the file would require using the "data" constant
        fs.writeFileSync(Language + '.ts', `export const data = ${JSON.stringify(mergedObject, null, 2)};`);
        console.log('TypeScript written to ' + Language + '.ts');
    } else {
        console.log("Invalid file type! Please enter either: JSON, JS or TS.")
    };
}

module.exports = { myFunc, };