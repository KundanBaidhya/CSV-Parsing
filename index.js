const { createNestedObject } = require('./helper/create-nested-object');
const process = require('process');
const fs = require('fs');

try {
  const language = process.argv[2].toLowerCase();
  //takes the third argument and stores it in a language constant
  const extensionType = process.argv[3].toLowerCase();
  //takes the fourth argument about the file extension type and stores in lanType constant

  const allExcelSheet = fs.readdirSync('files/');

  for(excelSheetName of allExcelSheet){
    switch (language) {
      case "english":
        createNestedObject('B', 'en', extensionType, excelSheetName);
        break;

      case "spanish":
        createNestedObject('C', 'es', extensionType, excelSheetName);
        break;

      case "chinese":
        createNestedObject('D', 'ch', extensionType. excelSheetName);
        break;

      default:
        console.log('Please choose a given languages only.');
        break;
    }
  }
} catch (error) {
  if(error.name=='TypeError'){
    console.log('Please enter both language and extension type');
  }
  else{
    console.log(error);
  }
}
