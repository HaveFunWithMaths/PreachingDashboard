import * as XLSX from 'xlsx';
import {
    DashboardData,
    SummaryRow,
    MentorshipRow,
    CumulativeAttendanceRow,
    ChantingRow,
    BDRow,
    BDLeaderboardRow,
    WorksheetsRow,
} from '../types';

// Helper to convert Excel serial date to JS Date
function excelDateToJSDate(serial: number): Date {
    const utcDays = Math.floor(serial - 25569);
    const utcValue = utcDays * 86400;
    return new Date(utcValue * 1000);
}

// Helper to parse date from various formats
function parseDate(value: unknown): Date | null {
    if (value === null || value === undefined || value === '') return null;

    if (typeof value === 'number') {
        return excelDateToJSDate(value);
    }

    if (value instanceof Date) {
        return value;
    }

    if (typeof value === 'string') {
        const parsed = new Date(value);
        if (!isNaN(parsed.getTime())) {
            return parsed;
        }

        // Try removing "st", "nd", "rd", "th" from day part
        // Example: "4th Jan 2025" -> "4 Jan 2025"
        const cleaned = value.replace(/(\d+)(st|nd|rd|th)/, '$1');
        const parsedCleaned = new Date(cleaned);
        if (!isNaN(parsedCleaned.getTime())) return parsedCleaned;
    }

    return null;
}

// Helper to parse number safely
function parseNumber(value: unknown): number {
    if (value === null || value === undefined || value === '') return 0;
    const num = Number(value);
    return isNaN(num) ? 0 : num;
}

// Helper to adjust year if date is in the future (likely due to wrong year assumption)
function adjustYearIfFuture(date: Date): Date {
    const now = new Date();
    // If date is more than 30 days in the future, assume it belongs to previous year
    if (date > new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)) {
        const newDate = new Date(date);
        newDate.setFullYear(date.getFullYear() - 1);
        return newDate;
    }
    return date;
}

export async function loadExcelData(filePath: string): Promise<DashboardData> {
    const response = await fetch(filePath);
    const arrayBuffer = await response.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer, { type: 'array', cellDates: true });

    // Parse Summary sheet
    const summarySheet = workbook.Sheets['Summary'];
    const summaryRaw = XLSX.utils.sheet_to_json<Record<string, unknown>>(summarySheet);
    const summary: SummaryRow[] = summaryRaw
        .map((row) => {
            const day = parseDate(row['Day']);
            if (!day) return null;
            return {
                Day: adjustYearIfFuture(day),
                Attendance: parseNumber(row['Attendance']),
                NewAttendees: parseNumber(row['New Attendees']),
                NewContacts: parseNumber(row['New Contacts']),
            };
        })
        .filter((row): row is SummaryRow => row !== null);

    // Parse Mentorship sheet
    const mentorshipSheet = workbook.Sheets['Mentorship'];
    const mentorshipRaw = XLSX.utils.sheet_to_json<Record<string, unknown>>(mentorshipSheet);
    const mentorship: MentorshipRow[] = mentorshipRaw.map((row) => ({
        Mentor: String(row['Mentor'] || ''),
        Mentees: parseNumber(row['Mentees']),
    })).filter(row => row.Mentor !== '');

    // Get Mentors Allotted from E2
    const mentorsAllottedCell = mentorshipSheet['E2'];
    const mentorsAllotted = mentorsAllottedCell ? parseNumber(mentorsAllottedCell.v) : 0;

    // Parse Cumulative Attendance sheet
    const cumulativeSheet = workbook.Sheets['Cumulative Attendance'];
    const cumulativeRaw = XLSX.utils.sheet_to_json<Record<string, unknown>>(cumulativeSheet);
    const cumulativeAttendance: CumulativeAttendanceRow[] = cumulativeRaw.map((row) => ({
        // Using "number of sessions attended in Jan" as the key. 
        // Note: This is brittle if the month changes in the excel file.
        Sessions: String(row['number of sessions attended in Jan'] || row['Sessions'] || ''),
        People: parseNumber(row['Number of people'] || row['People']),
    })).filter(row => row.Sessions !== '');

    // Parse Chanting sheet
    const chantingSheet = workbook.Sheets['Chanting'];
    const chantingRaw = XLSX.utils.sheet_to_json<Record<string, unknown>>(chantingSheet);
    const chanting: ChantingRow[] = chantingRaw.map((row) => ({
        Rounds: String(row['Chanting status'] || row['Rounds'] || ''),
        Number: parseNumber(row['Number']),
    })).filter(row => row.Rounds !== '');

    // Parse BD sheet
    const bdSheet = workbook.Sheets['BD'];
    const bdRaw = XLSX.utils.sheet_to_json<Record<string, unknown>>(bdSheet);
    const bd: BDRow[] = bdRaw
        .map((row) => {
            // 'Type' column contains date-like strings e.g., 'Week1 (4th Jan)'
            // We need to parse this. For now, let's try to extract date if possible, 
            // or if 'Day' column exists use that.
            // The excel shows 'Type'.
            let day: Date | null = null;
            if (row['Day']) {
                day = parseDate(row['Day']);
            } else if (row['Type']) {
                // Try to parse '4th Jan' from 'Week1 (4th Jan)'
                const typeStr = String(row['Type']);
                const match = typeStr.match(/\((.*?)\)/); // Extract content inside ()
                if (match) {
                    // Append current year to make it a valid date
                    const dateStr = `${match[1]} ${new Date().getFullYear()}`;
                    day = parseDate(dateStr);
                }
            }

            if (!day) return null;
            return {
                Day: adjustYearIfFuture(day),
                Small: parseNumber(row['Small']),
                Medium: parseNumber(row['Medium']),
                Big: parseNumber(row['Big']),
                Arjuna: parseNumber(row['Arjuna']),
            };
        })
        .filter((row): row is BDRow => row !== null);

    // Parse BD Leaderboard sheet
    const leaderboardSheet = workbook.Sheets['BD Leaderboard'];
    const leaderboardRaw = XLSX.utils.sheet_to_json<Record<string, unknown>>(leaderboardSheet);
    const bdLeaderboard: BDLeaderboardRow[] = leaderboardRaw.map((row) => ({
        Devotee: String(row['Name of Devotee'] || row['Devotee'] || ''),
        Points: parseNumber(row['Points']),
    })).filter(row => row.Devotee !== '');

    // Parse WorkSheets sheet
    const worksheetsSheet = workbook.Sheets['WorkSheets'];
    const worksheetsRaw = XLSX.utils.sheet_to_json<Record<string, unknown>>(worksheetsSheet);
    const worksheets: WorksheetsRow[] = worksheetsRaw.map((row) => ({
        Worsheets: String(row['Worksheets'] || row['Worsheets'] || ''),
        Number: parseNumber(row['Number']),
    })).filter(row => row.Worsheets !== '');

    return {
        summary,
        mentorship,
        mentorsAllotted,
        cumulativeAttendance,
        chanting,
        bd,
        bdLeaderboard,
        worksheets,
    };
}

// Filter data by date range
export function filterByDateRange<T extends { Day: Date }>(
    data: T[],
    startDate: Date | null,
    endDate: Date | null
): T[] {
    if (!startDate && !endDate) return data;

    return data.filter((row) => {
        const rowDate = row.Day;
        if (startDate && rowDate < startDate) return false;
        if (endDate && rowDate > endDate) return false;
        return true;
    });
}

// Get last non-empty value from array
export function getLastNonEmpty<T, K extends keyof T>(data: T[], key: K): T[K] | null {
    for (let i = data.length - 1; i >= 0; i--) {
        const value = data[i][key];
        if (value !== null && value !== undefined && value !== 0) {
            return value;
        }
    }
    return null;
}

// Calculate percentage change
export function calculatePercentageChange(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
}
