import * as XLSX from 'xlsx';
import {
    DashboardData,
    SummaryRow,
    MentorshipRow,
    CumulativeAttendanceRow,
    ChantingRow,
    BDRow,
    BDLeaderboardRow,
    BDLeaderboardTimelineRow,
    WorksheetsRow,
} from '../types';

// Helper to normalize a date to local midnight
function normalizeToLocalMidnight(date: Date): Date {
    // Add 12 hours to "push" the date to the middle of the day.
    // This handles both:
    // 1. Floating point errors (e.g., 23:59:59.999 becomes the next day's noon)
    // 2. Timezone shifts (e.g., UTC midnight in a negative offset timezone becomes the same day's noon)
    // Then we take the local year, month, and day.
    const adjusted = new Date(date.getTime() + 12 * 60 * 60 * 1000);
    return new Date(adjusted.getFullYear(), adjusted.getMonth(), adjusted.getDate());
}

// Helper to convert Excel serial date to JS Date
function excelDateToJSDate(serial: number): Date {
    // Use Math.round to handle floating point inaccuracies (e.g., 45657.999999)
    const days = Math.round(serial - 25569);
    const utcValue = days * 86400;
    const date = new Date(utcValue * 1000);
    return normalizeToLocalMidnight(date);
}

// Helper to parse date from various formats
function parseDate(value: unknown): Date | null {
    if (value === null || value === undefined || value === '') return null;

    let date: Date;

    if (typeof value === 'number') {
        date = excelDateToJSDate(value);
    } else if (value instanceof Date) {
        // If it's already a Date (from XLSX cellDates: true), normalize it
        date = normalizeToLocalMidnight(value);
    } else if (typeof value === 'string') {
        // Handle YYYY-MM-DD strings explicitly as local
        const ymdMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
        if (ymdMatch) {
            const [_, y, m, d] = ymdMatch;
            date = new Date(Number(y), Number(m) - 1, Number(d));
        } else {
            // For other strings, parse and then normalize
            const parsed = new Date(value);
            if (isNaN(parsed.getTime())) {
                // Try removing "st", "nd", "rd", "th" from day part
                const cleaned = value.replace(/(\d+)(st|nd|rd|th)/, '$1');
                date = new Date(cleaned);
            } else {
                date = parsed;
            }
            if (!isNaN(date.getTime())) {
                date = normalizeToLocalMidnight(date);
            }
        }
    } else {
        return null;
    }

    if (isNaN(date.getTime())) return null;
    return date;
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
        // Re-normalize to be safe
        return new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate());
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
                Total: parseNumber(row['Total']),
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

    // Parse BD Leaderboard Timeline from Column E onwards
    const bdLeaderboardTimeline: BDLeaderboardTimelineRow[] = [];
    const bdLeaderboardDevotees: string[] = [];
    {
        const ws = workbook.Sheets['BD Leaderboard'];
        if (ws) {
            const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');

            // Read date headers from row 0, starting from Column E (index 4)
            const dateHeaders: { label: string; day: Date; colIndex: number }[] = [];
            for (let c = 4; c <= range.e.c; c++) {
                const cell = ws[XLSX.utils.encode_cell({ r: 0, c })];
                if (cell && cell.v !== undefined && cell.v !== null && String(cell.v).trim() !== '') {
                    const label = cell.w || String(cell.v);
                    let day = parseDate(cell.v);
                    if (!day) {
                        // Try to infer date from label if it's like "4 Jan"
                        const year = new Date().getFullYear();
                        day = parseDate(`${label} ${year}`);
                    }
                    dateHeaders.push({ label, day: day || new Date(), colIndex: c });
                }
            }

            // Read devotee rows: Column D (index 3) = name, Column E (index 4) onwards = values
            // Collect devotees and per-devotee data keyed by date index
            const devoteeData: Record<string, number[]> = {};
            for (let r = 1; r <= range.e.r; r++) {
                const nameCell = ws[XLSX.utils.encode_cell({ r, c: 3 })];
                if (!nameCell || nameCell.v === undefined || nameCell.v === null) continue;
                const devotee = String(nameCell.v).trim();
                if (!devotee) continue;
                if (!bdLeaderboardDevotees.includes(devotee)) {
                    bdLeaderboardDevotees.push(devotee);
                }
                const values: number[] = [];
                for (const header of dateHeaders) {
                    const cell = ws[XLSX.utils.encode_cell({ r, c: header.colIndex })];
                    values.push(cell ? parseNumber(cell.v) : 0);
                }
                devoteeData[devotee] = values;
            }

            // Build timeline rows: one per date
            for (let i = 0; i < dateHeaders.length; i++) {
                const row: BDLeaderboardTimelineRow = {
                    Day: dateHeaders[i].day,
                    date: dateHeaders[i].label,
                };
                for (const devotee of bdLeaderboardDevotees) {
                    row[devotee] = devoteeData[devotee]?.[i] ?? 0;
                }
                bdLeaderboardTimeline.push(row);
            }
        }
    }

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
        bdLeaderboardTimeline,
        bdLeaderboardDevotees,
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
