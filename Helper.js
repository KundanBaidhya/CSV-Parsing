const excelToJson = require('convert-excel-to-json');
const prompt = require('prompt-sync')();
const fs = require('fs');

const result = excelToJson({ sourceFile: 'Presidents.xlsx' });

const mergedObject = {};
const column = '';
const keys = Object.keys(result); //taking every sheet name as from 
console.log(keys);//the key value pair and storing them in an array named keys.

const myFunc = (column, language, lanType) => {

    for (let sheetName of keys) { //looping over the keys
        sheet = result[sheetName];//to make individual files for every sheet.
        console.log(sheet);

        for (let element of sheet) {//looping over every element in the sheets
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
            fs.writeFileSync(sheetName + ' ' + language + '.json', JSON.stringify(mergedObject, null, 2));
            console.log('JSON written to ' + sheetName + ' ' + language + '.json');
        } else if (lanType === 'js') {
            // INTO JS
            fs.writeFileSync(sheetName + ' ' + language + '.js', `module.exports = ${JSON.stringify(mergedObject, null, 2)};`);
            console.log('JavaScript written to ' + sheetName + ' ' + language + '.js');
        } else if (lanType === 'ts') {
            //  INTO TS
            // importing data from the file would require using the "data" constant
            fs.writeFileSync(sheetName + ' ' + language + '.ts', `export const data = ${JSON.stringify(mergedObject, null, 2)};`);
            console.log('TypeScript written to ' + sheetName + ' ' + language + '.ts');
        } else if (lanType === 'resx') {
            //INTO RESX
            let resxContent = `<?xml version="1.0" encoding="utf-8"?>
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

            const flattenObject = (obj, prefix = '') => {
                Object.keys(obj).forEach(key => {
                    if (typeof obj[key] === 'object') {
                        flattenObject(obj[key], `${prefix}${key}.`);
                    } else {
                        //  ${key} ${prefix}
                        resxContent += `  <data name="${key}" xml:space="preserve">\n`;
                        resxContent += `    <value>${obj[key]}</value>\n`;
                        resxContent += '  </data>\n';
                    }
                });
            };
            flattenObject(mergedObject);
            resxContent += '\n</root>';
            fs.writeFileSync(sheetName + ' ' + language + '.resx', resxContent);
            console.log('RESX written to ' + sheetName + ' ' + language + '.resx');
        } else {
            console.log("Invalid file type! Please enter either: JSON, JS or TS.")
        };

    }
}

module.exports = { myFunc, };