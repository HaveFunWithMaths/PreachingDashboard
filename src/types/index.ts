// Type definitions for dashboard data

export interface SummaryRow {
    Day: Date;
    Attendance: number;
    NewAttendees: number;
    NewContacts: number;
}

export interface MentorshipRow {
    Mentor: string;
    Mentees: number;
}

export interface CumulativeAttendanceRow {
    Sessions: string;
    People: number;
}

export interface ChantingRow {
    Rounds: string;
    Number: number;
}

export interface BDRow {
    Day: Date;
    Small: number;
    Medium: number;
    Big: number;
    Arjuna: number;
    Total: number;
}

export interface BDLeaderboardRow {
    Devotee: string;
    Points: number;
}

// Timeline row: date label + one numeric value per devotee
export interface BDLeaderboardTimelineRow {
    Day: Date;
    date: string; // e.g. "4 Jan"
    [devotee: string]: Date | string | number; // devotee name → value
}

export interface WorksheetsRow {
    Worsheets: string;
    Number: number;
}

export interface DashboardData {
    summary: SummaryRow[];
    mentorship: MentorshipRow[];
    mentorsAllotted: number;
    cumulativeAttendance: CumulativeAttendanceRow[];
    chanting: ChantingRow[];
    bd: BDRow[];
    bdLeaderboard: BDLeaderboardRow[];
    bdLeaderboardTimeline: BDLeaderboardTimelineRow[];
    bdLeaderboardDevotees: string[];
    worksheets: WorksheetsRow[];
}

export interface DateRange {
    startDate: Date | null;
    endDate: Date | null;
}
