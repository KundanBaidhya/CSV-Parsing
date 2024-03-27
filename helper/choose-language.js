const fs = require('fs');

const createFile = (passedObject)=>{
    const fileName = passedObject['fileName'].split('.')[0];
    switch(passedObject['extensionType']){
        case 'json' :
            fs.writeFileSync('/CSV-PARSING/output/'+fileName+'.'+passedObject['sheetName']+'.'+passedObject['language']+'.json', JSON.stringify(passedObject['mergedObject'], null, 2));
            console.log('JSON written to ' +fileName+' '+passedObject['sheetName']+' '+passedObject['language']+ '.json');
        break;

        case 'js' :
            fs.writeFileSync('/CSV-PARSING/output/'+fileName+'.'+passedObject['sheetName']+'.'+passedObject['language']+ '.js', `export default ${JSON.stringify(passedObject['mergedObject'], null, 2)};`);
            console.log('JavaScript written to ' +fileName+'.'+passedObject['sheetName']+'.'+passedObject['language']+ '.js');
        break;

        case 'ts' :
              //  INTO TS
              // importing data from the file would require using the "data" constant
              const formatObject = (obj, indent = 0) => {
                  let result = '';
                  const addIndent = (num) => ' '.repeat(num);
  
                  const processObject = (obj, depth) => {
                      const keys = Object.keys(obj);
                      keys.forEach((key, index) => {
                          const value = obj[key];
                          const finalValue = typeof value === 'string' && value.includes("'") ? `"${value}"` : `'${value}'`;
                          // checks if the value is a string to use the include method
                          // if its not a string, the value is surounded by single quotes
                          // if it is a string and contains a single quote, it is surrounded by
                          // double quotes to prevent syntax errors
                          if (typeof value === 'object' && value !== null) {
                              result += `${addIndent(depth)}${key}: {\n`;
                              processObject(value, depth + 2);
                              result += `${addIndent(depth)}},\n`;
                          } else {
                              result += `${addIndent(depth)}${key}: ${finalValue},\n`;
                          }
                      });
                  };
  
                  result += 'export default {\n';
                  processObject(obj, indent);
                  result += '\n};';
                  return result;
              };
              const finalData = formatObject(passedObject['mergedObject'], 2);
              fs.writeFileSync('/CSV-PARSING/output/'+fileName+'.'+passedObject['sheetName'] + '.' + passedObject['language'] + '.ts', finalData);
              console.log('TS written to ' +fileName+'.'+passedObject['sheetName']+'.'+passedObject['language']+ '.ts');
        break;

        case 'resx':

             //INTO RESX
             let resxContent = 
             `<?xml version="1.0" encoding="utf-8"?>
             <root>
             <xsd:schema id="root" xmlns="" 
                 xmlns:xsd="http://www.w3.org/2001/XMLSchema"
                 xmlns:msdata="urn:schemas-microsoft-com:xml-msdata">
                 <xsd:import namespace="http://www.w3.org/XML/1998/namespace" />
                 <xsd:element name="root" msdata:IsDataSet="true">
                     <xsd:complexType>
                         <xsd:choice maxOccurs="unbounded">
                             <xsd:element name="metadata">
                                 <xsd:complexType>
                                     <xsd:sequence>
                                         <xsd:element name="value" type="xsd:string" minOccurs="0" />
                                     </xsd:sequence>
                                     <xsd:attribute name="name" use="required" type="xsd:string" />
                                     <xsd:attribute name="type" type="xsd:string" />
                                     <xsd:attribute name="mimetype" type="xsd:string" />
                                     <xsd:attribute ref="xml:space" />
                                 </xsd:complexType>
                             </xsd:element>
                             <xsd:element name="assembly">
                                 <xsd:complexType>
                                 <xsd:attribute name="alias" type="xsd:string" />
                                 <xsd:attribute name="name" type="xsd:string" />
                                 </xsd:complexType>
                             </xsd:element>
                             <xsd:element name="data">
                                 <xsd:complexType>
                                 <xsd:sequence>
                                     <xsd:element name="value" type="xsd:string" minOccurs="0" msdata:Ordinal="1" />
                                     <xsd:element name="comment" type="xsd:string" minOccurs="0" msdata:Ordinal="2" />
                                 </xsd:sequence>
                                 <xsd:attribute name="name" type="xsd:string" use="required" msdata:Ordinal="1" />
                                 <xsd:attribute name="type" type="xsd:string" msdata:Ordinal="3" />
                                 <xsd:attribute name="mimetype" type="xsd:string" msdata:Ordinal="4" />
                                 <xsd:attribute ref="xml:space" />
                                 </xsd:complexType>
                             </xsd:element>
                             <xsd:element name="resheader">
                                 <xsd:complexType>
                                 <xsd:sequence>
                                     <xsd:element name="value" type="xsd:string" minOccurs="0" msdata:Ordinal="1" />
                                 </xsd:sequence>
                                 <xsd:attribute name="name" type="xsd:string" use="required" />
                                 </xsd:complexType>
                             </xsd:element>
                         </xsd:choice>
                     </xsd:complexType>
                 </xsd:element>
             </xsd:schema>
             <resheader name="resmimetype">
                 <value>text/microsoft-resx</value>
             </resheader>
             <resheader name="version">
                 <value>2.0</value>
             </resheader>
             <resheader name="reader">
                 <value>System.Resources.ResXResourceReader, System.Windows.Forms, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</value>
             </resheader>
             <resheader name="writer">
                 <value>System.Resources.ResXResourceWriter, System.Windows.Forms, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</value>
             </resheader> `;
 
             const flattenValue = (obj, prefix = '') => {
                 Object.keys(obj).forEach(key => {
                     if (typeof obj[key] === 'object') {
                         flattenValue(obj[key], `${prefix}${key}.`);
                     } else {
                         //  ${key} ${prefix}
                         resxContent += `  <data name="${key}" xml:space="preserve">\n`;
                         resxContent += `    <value>${obj[key]}</value>\n`;
                         resxContent += '  </data>\n';
                     }
                 });
             };
             flattenValue(passedObject['mergedObject']);
             resxContent += '\n</root>';
             fs.writeFileSync('/CSV-PARSING/output/'+fileName+'.'+passedObject['sheetName'] + '.' + passedObject['language'] + '.resx', resxContent);
             console.log('RESX written to ' +fileName+'.'+ passedObject['sheetName'] + '.' + passedObject['language'] + '.resx');
        break;

        default :
            console.log("Invalid file type! Please enter either: JSON, JS or TS.");
        break;
    }
}

module.exports = {createFile};