import { useMemo } from 'react';
import { BookTrendsChart } from '../components/charts/BookTrendsChart';
import { LeaderboardChart } from '../components/charts/LeaderboardChart';
import { MentorLoadChart } from '../components/charts/MentorLoadChart';
import { WorksheetChart } from '../components/charts/WorksheetChart';
import {
    BDRow,
    BDLeaderboardRow,
    MentorshipRow,
    WorksheetsRow,
    DateRange,
} from '../types';
import { filterByDateRange } from '../utils/dataParser';

interface BookDistributionTabProps {
    bd: BDRow[];
    bdLeaderboard: BDLeaderboardRow[];
    mentorship: MentorshipRow[];
    worksheets: WorksheetsRow[];
    dateRange: DateRange;
}

export function BookDistributionTab({
    bd,
    bdLeaderboard,
    mentorship,
    worksheets,
    dateRange,
}: BookDistributionTabProps) {
    // Filter BD data by date range
    const filteredBD = useMemo(
        () => filterByDateRange(bd, dateRange.startDate, dateRange.endDate),
        [bd, dateRange]
    );

    return (
        <div className="tab-content space-y-8">
            {/* Book Distribution Section */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-8 w-1 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full" />
                    <h2 className="text-2xl font-bold text-slate-800">Book Distribution</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <BookTrendsChart data={filteredBD} />
                    <LeaderboardChart data={bdLeaderboard} />
                </div>
            </section>

            {/* Mentoring Section */}
            <section>
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-8 w-1 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full" />
                    <h2 className="text-2xl font-bold text-slate-800">Mentoring</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <MentorLoadChart data={mentorship} />
                    <WorksheetChart data={worksheets} />
                </div>
            </section>
        </div>
    );
}
