import { useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import { BookTrendsChart } from '../components/charts/BookTrendsChart';
import { LeaderboardChart } from '../components/charts/LeaderboardChart';
import { GrowthChart } from '../components/charts/GrowthChart';
import { BDLeaderboardTimelineChart } from '../components/charts/BDLeaderboardTimelineChart';
import {
    BDRow,
    BDLeaderboardRow,
    BDLeaderboardTimelineRow,
    SummaryRow,
    DateRange,
} from '../types';
import { filterByDateRange } from '../utils/dataParser';

interface BookDistributionTabProps {
    bd: BDRow[];
    bdLeaderboard: BDLeaderboardRow[];
    bdLeaderboardTimeline: BDLeaderboardTimelineRow[];
    bdLeaderboardDevotees: string[];
    summary: SummaryRow[];
    dateRange: DateRange;
}

export function BookDistributionTab({
    bd,
    bdLeaderboard,
    bdLeaderboardTimeline,
    bdLeaderboardDevotees,
    summary,
    dateRange,
}: BookDistributionTabProps) {
    // Filter BD data by date range
    const filteredBD = useMemo(
        () => filterByDateRange(bd, dateRange.startDate, dateRange.endDate),
        [bd, dateRange]
    );

    // Filter summary data by date range (for GrowthChart)
    const filteredSummary = useMemo(
        () => filterByDateRange(summary, dateRange.startDate, dateRange.endDate),
        [summary, dateRange]
    );

    return (
        <div className="tab-content space-y-8">
            {/* Book Distribution Section */}
            <section className="animate-on-scroll">
                <div className="flex items-center gap-4 mb-6">
                    {/* Animated accent bar */}
                    <div className="relative h-10 w-1.5 rounded-full overflow-hidden section-accent">
                        <div className="absolute inset-0 bg-gradient-to-b from-primary-500 via-secondary-400 to-primary-500" />
                    </div>

                    {/* Section icon */}
                    <div className="p-2 rounded-xl bg-primary-50 icon-hover">
                        <BookOpen className="w-6 h-6 text-primary-500" />
                    </div>

                    {/* Section title */}
                    <div>
                        <h2 className="text-2xl font-bold text-warm-800 font-heading">Book Distribution</h2>
                        <p className="text-sm text-warm-400 font-light italic">Spreading knowledge through literature</p>
                    </div>
                </div>

                {/* Row 1: Book Trends + Leaderboard */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <div className="animate-on-scroll stagger-1">
                        <BookTrendsChart data={filteredBD} />
                    </div>
                    <div className="animate-on-scroll stagger-2">
                        <LeaderboardChart data={bdLeaderboard} />
                    </div>
                </div>

                {/* Row 2: New Attendees & Contacts (duplicate) + BD Contributor Timeline */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="animate-on-scroll stagger-3">
                        <GrowthChart data={filteredSummary} />
                    </div>
                    <div className="animate-on-scroll stagger-4">
                        <BDLeaderboardTimelineChart
                            data={bdLeaderboardTimeline}
                            devotees={bdLeaderboardDevotees}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
