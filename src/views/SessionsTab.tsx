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
            {/* KPI Cards with staggered animation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <KPICard
                    title="Attendance (Last Week)"
                    value={lastAttendance}
                    icon={<Users className="w-6 h-6 text-primary-500" />}
                    trend={{
                        value: attendanceChange,
                        label: 'vs previous week',
                    }}
                    gradient="bg-gradient-to-r from-primary-500 to-secondary-400"
                    iconBgColor="bg-primary-500/10"
                    delay={100}
                />
                <KPICard
                    title="Mentors Allotted"
                    value={mentorsAllotted}
                    icon={<Award className="w-6 h-6 text-accent-500" />}
                    gradient="bg-gradient-to-r from-accent-500 to-accent-400"
                    iconBgColor="bg-accent-500/10"
                    delay={200}
                />
                <KPICard
                    title="First Time Attendees"
                    value={lastNewAttendees}
                    icon={<UserPlus className="w-6 h-6 text-secondary-400" />}
                    gradient="bg-gradient-to-r from-secondary-400 to-primary-400"
                    iconBgColor="bg-secondary-400/10"
                    delay={300}
                />
            </div>

            {/* Charts Grid with staggered animation */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="animate-on-scroll stagger-1">
                    <AttendanceChart data={filteredSummary} />
                </div>
                <div className="animate-on-scroll stagger-2">
                    <GrowthChart data={filteredSummary} />
                </div>
                <div className="animate-on-scroll stagger-3">
                    <SessionPopularityChart data={cumulativeAttendance} />
                </div>
                <div className="animate-on-scroll stagger-4">
                    <ChantingChart data={chanting} />
                </div>
            </div>
        </div>
    );
}
