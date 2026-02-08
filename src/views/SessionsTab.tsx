import { useMemo } from 'react';
import { Users, UserPlus, Award } from 'lucide-react';
import { KPICard } from '../components/KPICard';
import { AttendanceChart } from '../components/charts/AttendanceChart';
import { GrowthChart } from '../components/charts/GrowthChart';
import { SessionPopularityChart } from '../components/charts/SessionPopularityChart';
import { ChantingChart } from '../components/charts/ChantingChart';
import {
    SummaryRow,
    CumulativeAttendanceRow,
    ChantingRow,
    DateRange,
} from '../types';
import {
    filterByDateRange,
    getLastNonEmpty,
    calculatePercentageChange,
} from '../utils/dataParser';

interface SessionsTabProps {
    summary: SummaryRow[];
    mentorsAllotted: number;
    cumulativeAttendance: CumulativeAttendanceRow[];
    chanting: ChantingRow[];
    dateRange: DateRange;
}

export function SessionsTab({
    summary,
    mentorsAllotted,
    cumulativeAttendance,
    chanting,
    dateRange,
}: SessionsTabProps) {
    // Filter summary data by date range
    const filteredSummary = useMemo(
        () => filterByDateRange(summary, dateRange.startDate, dateRange.endDate),
        [summary, dateRange]
    );

    // Calculate KPI values
    const lastAttendance = getLastNonEmpty(summary, 'Attendance') ?? 0;
    const previousAttendance = summary.length >= 2 ? summary[summary.length - 2]?.Attendance ?? 0 : 0;
    const attendanceChange = calculatePercentageChange(lastAttendance, previousAttendance);

    const lastNewAttendees = getLastNonEmpty(summary, 'NewAttendees') ?? 0;

    return (
        <div className="tab-content space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <KPICard
                    title="Attendance (Last Week)"
                    value={lastAttendance}
                    icon={<Users className="w-6 h-6 text-indigo-500" />}
                    trend={{
                        value: attendanceChange,
                        label: 'vs previous week',
                    }}
                    gradient="bg-gradient-to-r from-indigo-500 to-purple-500"
                />
                <KPICard
                    title="Mentors Allotted"
                    value={mentorsAllotted}
                    icon={<Award className="w-6 h-6 text-emerald-500" />}
                    gradient="bg-gradient-to-r from-emerald-500 to-teal-500"
                />
                <KPICard
                    title="First Time Attendees"
                    value={lastNewAttendees}
                    icon={<UserPlus className="w-6 h-6 text-amber-500" />}
                    gradient="bg-gradient-to-r from-amber-500 to-orange-500"
                />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AttendanceChart data={filteredSummary} />
                <GrowthChart data={filteredSummary} />
                <SessionPopularityChart data={cumulativeAttendance} />
                <ChantingChart data={chanting} />
            </div>
        </div>
    );
}
