# Excel to Localization File Converter

This program converts Excel files into localization files based on the user's language preference. It supports multiple output formats including `.resx` used in .NET applications, `.json`, `.js` and `ts` for now.

## Directory Structure

- `files/`: Place all the Excel files you want to convert in this directory.
- `output/`: The converted localization files will be generated in this directory.

## Usage

To start the program, use the following command:

```bash
# node index.js <language> <extension>
node index.js spanish resx
```
