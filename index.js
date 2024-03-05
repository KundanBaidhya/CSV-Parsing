const excelToJson = require('convert-excel-to-json');
const prompt = require('prompt-sync')();
const fs = require('fs');

const result = excelToJson({sourceFile: 'Presidents.xlsx'});

console.log(result);

const language = prompt("Enter which language do you want your file to be : English Spanish Chinese = ");



switch (language) {
    case 'English':
        fs.appendFileSync('English.json', "{");
        result.sharingModal2.forEach(element => {

            const str1 = element.A.toString();
            const str2 = element.B.toString();
            fs.appendFileSync('English.json', '\"'+str1+'\" : \"'+str2+'\",\n');
        });

        fs.appendFileSync('English.json', '\"\":\"\"}');
        break;

    case 'Spanish':
        fs.appendFileSync('Spanish.json', "{");
        result.sharingModal2.forEach(element => {

            const str1 = element.A.toString();
            const str2 = element.C.toString();
            fs.appendFileSync('Spanish.json', '\"'+str1+'\" : \"'+str2+'\",\n');
        });

        fs.appendFileSync('Spanish.json', '\"\":\"\"}');
        break;

    case 'Chinese':
        fs.appendFileSync('Chinese.json', "{");
        result.sharingModal2.forEach(element => {

            const str1 = element.A.toString();
            const str2 = element.D.toString();
            fs.appendFileSync('Chinese.json', '\"'+str1+'\" : \"'+str2+'\",\n');
        });

        fs.appendFileSync('Chinese.json', '\"\":\"\"}');
        break;

    default:
        console.log('Please choose a given languages only');
        break;
}

