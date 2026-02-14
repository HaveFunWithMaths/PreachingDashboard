
const XLSX = require('xlsx');
const path = require('path');

const filePath = path.join(__dirname, '../public/DashBoardData.xlsx');
console.log('Reading file:', filePath);

try {
    const workbook = XLSX.readFile(filePath);
    const sheetName = 'BD';
    const sheet = workbook.Sheets[sheetName];

    if (!sheet) {
        console.error(`Sheet "${sheetName}" not found.`);
        process.exit(1);
    }

    // varied range to get headers
    const range = XLSX.utils.decode_range(sheet['!ref']);
    const headers = [];
    for (let currentColumn = range.s.c; currentColumn <= range.e.c; ++currentColumn) {
        const cellAddress = { c: currentColumn, r: range.s.r };
        const cellRef = XLSX.utils.encode_cell(cellAddress);
        const cell = sheet[cellRef];
        headers.push(cell ? cell.v : `UNKNOWN_COL_${currentColumn}`);
    }

    console.log('Headers in BD sheet:', headers);
} catch (error) {
    console.error('Error reading Excel file:', error.message);
}
