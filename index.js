const excelToJson = require('convert-excel-to-json');
const prompt = require('prompt-sync')();
const fs = require('fs');

const result = excelToJson({sourceFile: 'Presidents.xlsx'});

console.log(result); //log to show the result that has been parsed from the excel file


const language = prompt("Enter which language do you want your file to be : English Spanish Chinese = ");
//Shows a log and takes input and stores it in a language constant


switch (language) {//switch case for different language input
    case 'English':
        if(fs.existsSync('English.json')){//if there's already a file, deletes the file to create a new one 
            fs.unlinkSync('English.json');//such that multiple file appending is prevented
        }
        fs.appendFileSync('English.json', "{");//Creates a new file
        result.sharingModal2.forEach(element => {//For loop to take out elements from the result array's sharingModal2 page

            const str1 = element.A.toString();//takes the value from the A key
            const str1Split1 = str1.split('.')[0];//splits the value the value from the .
            const str1Split2 = str1.split('.')[1];
            const str1Split3 = str1.split('.')[2];
            const str2 = element.B.toString();

            if(str1Split3==undefined){//if str1split3 is undefined, executes the following code
                if(str1Split2==undefined){//if str1split2 is undefined, executes the following code
                    fs.appendFileSync('English.json', '\"'+str1+'\" : \"'+str2+'\",\n\n');
                }
                else{
                    fs.appendFileSync('English.json', '\"'+str1Split1+'\" : {\n \t \"'+str1Split2+'\" : \"'+str2+'\" \n},\n\n');
                }
            }
            else{
                fs.appendFileSync('English.json', '\"'+str1Split1+'\" : {\n \t \"'+str1Split2+'\" : {\n \t\t \"'+str1Split3+'\" : \"'+str2+'\"\n \t\t} \n \t},\n\n');
            }
            
        });

        fs.appendFileSync('English.json', '\"\":\"\"\n}');//closes the json file with an empty key value such that error is prevented
        break;

    case 'Spanish':
        if(fs.existsSync('Spanish.json')){
            fs.unlinkSync('Spanish.json');
        }
        fs.appendFileSync('Spanish.json', "{");
        result.sharingModal2.forEach(element => {

            const str1 = element.A.toString();
            const str1Split1 = str1.split('.')[0];
            const str1Split2 = str1.split('.')[1];
            const str1Split3 = str1.split('.')[2];
            const str2 = element.C.toString();

            if(str1Split3==undefined){
                if(str1Split2==undefined){
                    fs.appendFileSync('Spanish.json', '\"'+str1+'\" : \"'+str2+'\",\n\n');
                }
                else{
                    fs.appendFileSync('Spanish.json', '\"'+str1Split1+'\" : {\n \t \"'+str1Split2+'\" : \"'+str2+'\" \n},\n\n');
                }
            }
            else{
                fs.appendFileSync('Spanish.json', '\"'+str1Split1+'\" : {\n \t \"'+str1Split2+'\" : {\n \t\t \"'+str1Split3+'\" : \"'+str2+'\"\n \t\t} \n \t},\n\n');
            }
            
        });

        fs.appendFileSync('Spanish.json', '\"\":\"\"\n}');
        break;

    case 'Chinese':
        if(fs.existsSync('Chinese.json')){
            fs.unlinkSync('Chinese.json');
        }        
        fs.appendFileSync('Chinese.json', "{");
        result.sharingModal2.forEach(element => {

            const str1 = element.A.toString();
            const str1Split1 = str1.split('.')[0];
            const str1Split2 = str1.split('.')[1];
            const str1Split3 = str1.split('.')[2];
            const str2 = element.D.toString();

            if(str1Split3==undefined){
                if(str1Split2==undefined){
                    fs.appendFileSync('Chinese.json', '\"'+str1+'\" : \"'+str2+'\",\n\n');
                }
                else{
                    fs.appendFileSync('Chinese.json', '\"'+str1Split1+'\" : {\n \t \"'+str1Split2+'\" : \"'+str2+'\" \n},\n\n');
                }
            }
            else{
                fs.appendFileSync('Chinese.json', '\"'+str1Split1+'\" : {\n \t \"'+str1Split2+'\" : {\n \t\t \"'+str1Split3+'\" : \"'+str2+'\"\n \t\t} \n \t},\n\n');
            }
            
        });

        fs.appendFileSync('Chinese.json', '\"\":\"\"\n}');
        break;

    default:
        console.log('Please choose a given languages only');
        break;
}

//some changes for pr