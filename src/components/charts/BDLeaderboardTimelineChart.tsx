import { useState } from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Label,
} from 'recharts';
import { BDLeaderboardTimelineRow } from '../../types';

interface BDLeaderboardTimelineChartProps {
    data: BDLeaderboardTimelineRow[];
    devotees: string[];
}

// Rich devotional color palette for each devotee line
const DEVOTEE_COLORS = [
    '#FF6B35', // Saffron
    '#2D6A4F', // Forest Green
    '#F7B32B', // Gold
    '#8B5CF6', // Violet
    '#EC4899', // Pink
    '#06B6D4', // Cyan
    '#F97316', // Orange
    '#10B981', // Emerald
    '#A855F7', // Purple
    '#EF4444', // Red
    '#14B8A6', // Teal
    '#F59E0B', // Amber
];

/** Compute total score per devotee across all timeline rows */
function computeTotals(
    data: BDLeaderboardTimelineRow[],
    devotees: string[]
): Record<string, number> {
    const totals: Record<string, number> = {};
    for (const devotee of devotees) {
        totals[devotee] = data.reduce((sum, row) => {
            const v = row[devotee];
            return sum + (typeof v === 'number' ? v : 0);
        }, 0);
    }
    return totals;
}

export function BDLeaderboardTimelineChart({
    data,
    devotees,
}: BDLeaderboardTimelineChartProps) {
    // Determine top 4 devotees by total points to show by default
    const totals = computeTotals(data, devotees);
    const top4 = new Set(
        [...devotees]
            .sort((a, b) => totals[b] - totals[a])
            .slice(0, 4)
    );

    const [visibleDevotees, setVisibleDevotees] = useState<Record<string, boolean>>(
        Object.fromEntries(devotees.map((d) => [d, top4.has(d)]))
    );

    const toggleDevotee = (name: string) => {
        setVisibleDevotees((prev) => ({ ...prev, [name]: !prev[name] }));
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg shadow-warm-200/50 border border-warm-100 p-4 sm:p-6 chart-container">
            <div className="flex flex-col gap-1 mb-4">
                <h3 className="text-lg font-bold text-warm-800 font-heading">
                    Book Distribution Time Series
                </h3>
                <p className="text-xs text-warm-400 italic">
                    Weekly points per devotee
                </p>
            </div>

            {/* Custom Checkbox Legend */}
            <div className="flex flex-wrap gap-2 mb-5">
                {devotees.map((devotee, idx) => {
                    const color = DEVOTEE_COLORS[idx % DEVOTEE_COLORS.length];
                    const isVisible = visibleDevotees[devotee];
                    return (
                        <label
                            key={devotee}
                            className={`
                                inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium
                                transition-all cursor-pointer border select-none
                                ${isVisible
                                    ? 'bg-warm-50 border-warm-200 shadow-sm'
                                    : 'bg-transparent border-transparent text-warm-400 opacity-60 hover:opacity-90'
                                }
                            `}
                        >
                            <input
                                type="checkbox"
                                className="w-3.5 h-3.5 rounded accent-purple-600 focus:ring-purple-500"
                                checked={isVisible}
                                onChange={() => toggleDevotee(devotee)}
                            />
                            <span
                                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: color }}
                            />
                            <span style={{ color: isVisible ? '#1c1917' : 'inherit' }}>
                                {devotee}
                            </span>
                        </label>
                    );
                })}
            </div>

            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={data}
                        margin={{ top: 10, right: 20, left: 20, bottom: 30 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                        <XAxis
                            dataKey="date"
                            tick={{ fill: '#78716c', fontSize: 11 }}
                            tickLine={{ stroke: '#d6d3d1' }}
                            axisLine={{ stroke: '#e7e5e4' }}
                        >
                            <Label
                                value="Date"
                                position="bottom"
                                offset={10}
                                style={{
                                    fill: '#57534e',
                                    fontSize: 13,
                                    fontWeight: 600,
                                    fontFamily: 'Inter, sans-serif',
                                }}
                            />
                        </XAxis>
                        <YAxis
                            tick={{ fill: '#78716c', fontSize: 11 }}
                            tickLine={{ stroke: '#d6d3d1' }}
                            axisLine={{ stroke: '#e7e5e4' }}
                        >
                            <Label
                                value="Points"
                                angle={-90}
                                position="left"
                                offset={0}
                                style={{
                                    fill: '#57534e',
                                    fontSize: 13,
                                    fontWeight: 600,
                                    fontFamily: 'Inter, sans-serif',
                                    textAnchor: 'middle',
                                }}
                            />
                        </YAxis>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e7e5e4',
                                borderRadius: '12px',
                                boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.15)',
                                fontFamily: 'Inter, sans-serif',
                                fontSize: 12,
                            }}
                        />
                        {devotees.map((devotee, idx) => {
                            const color = DEVOTEE_COLORS[idx % DEVOTEE_COLORS.length];
                            return (
                                visibleDevotees[devotee] && (
                                    <Line
                                        key={devotee}
                                        type="monotone"
                                        dataKey={devotee}
                                        stroke={color}
                                        strokeWidth={2.5}
                                        dot={{ fill: color, strokeWidth: 2, r: 4, stroke: 'white' }}
                                        activeDot={{ r: 7, fill: color, stroke: 'white', strokeWidth: 3 }}
                                        animationDuration={600}
                                        connectNulls
                                    />
                                )
                            );
                        })}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
