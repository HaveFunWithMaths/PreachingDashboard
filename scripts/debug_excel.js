
import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, '../public/DashBoardData.xlsx');

try {
    const workbook = XLSX.readFile(filePath);

    // Check Summary Sheet
    const summarySheet = workbook.Sheets['Summary'];
    if (summarySheet) {
        console.log('--- Summary Sheet Headers ---');
        const summaryData = XLSX.utils.sheet_to_json(summarySheet, { header: 1 });
        if (summaryData.length > 0) {
            console.log(summaryData[0]);
        }
        console.log('--- Summary Sheet First Data Row ---');
        const summaryRows = XLSX.utils.sheet_to_json(summarySheet);
        if (summaryRows.length > 0) {
            console.log(summaryRows[0]);
        }
    } else {
        console.log('Summary sheet not found!');
    }

    // Check Cumulative Attendance Sheet
    const cumulativeSheet = workbook.Sheets['Cumulative Attendance'];
    if (cumulativeSheet) {
        console.log('\n--- Cumulative Attendance Sheet Headers ---');
        const cumulativeData = XLSX.utils.sheet_to_json(cumulativeSheet, { header: 1 });
        if (cumulativeData.length > 0) {
            console.log(cumulativeData[0]);
        }
        console.log('--- Cumulative Sheet First Data Row ---');
        const cumulativeRows = XLSX.utils.sheet_to_json(cumulativeSheet);
        if (cumulativeRows.length > 0) {
            console.log(cumulativeRows[0]);
        }
    } else {
        console.log('Cumulative Attendance sheet not found!');
    }

    // Check which sheets exist
    console.log('\n--- Available Sheets ---');
    console.log(workbook.SheetNames);

} catch (err) {
    console.error('Error reading file:', err);
}
