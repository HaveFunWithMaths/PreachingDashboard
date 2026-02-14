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
import { format } from 'date-fns';
import { BDRow } from '../../types';

interface BookTrendsChartProps {
    data: BDRow[];
}

// Devotional color palette
const PRIMARY_500 = '#FF6B35'; // Saffron
const ACCENT_500 = '#2D6A4F'; // Forest green
const SECONDARY_400 = '#F7B32B'; // Gold
const PURPLE_500 = '#8B5CF6'; // Violet
const TOTAL_600 = '#0f172a'; // Slate 900 for Total

const LINES = [
    { key: 'Total', color: TOTAL_600, label: 'Total' },
    { key: 'Small', color: PRIMARY_500, label: 'Small' },
    { key: 'Medium', color: ACCENT_500, label: 'Medium' },
    { key: 'Big', color: SECONDARY_400, label: 'Big' },
    { key: 'Arjuna', color: PURPLE_500, label: 'Arjuna' },
] as const;

export function BookTrendsChart({ data }: BookTrendsChartProps) {
    const [visibleLines, setVisibleLines] = useState<Record<string, boolean>>({
        Total: true,
        Small: false,
        Medium: false,
        Big: false,
        Arjuna: false,
    });

    const chartData = data.map((row) => ({
        date: format(row.Day, 'MMM dd'),
        fullDate: format(row.Day, 'MMM dd, yyyy'),
        Small: row.Small,
        Medium: row.Medium,
        Big: row.Big,
        Arjuna: row.Arjuna,
        Total: row.Total,
    }));

    const toggleLine = (key: string) => {
        setVisibleLines((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg shadow-warm-200/50 border border-warm-100 p-4 sm:p-6 chart-container">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h3 className="text-lg font-bold text-warm-800 font-heading">Book Distribution Trends</h3>

                {/* Custom Checkbox Legend */}
                <div className="flex flex-wrap gap-3">
                    {LINES.map((line) => (
                        <label
                            key={line.key}
                            className={`
                                inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer border
                                ${visibleLines[line.key]
                                    ? 'bg-warm-50 border-warm-200 shadow-sm'
                                    : 'bg-transparent border-transparent text-warm-400 opacity-70 hover:opacity-100'
                                }
                            `}
                        >
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 border-gray-300"
                                checked={visibleLines[line.key]}
                                onChange={() => toggleLine(line.key)}
                            />
                            <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: line.color }}
                            />
                            <span style={{ color: visibleLines[line.key] ? '#1c1917' : 'inherit' }}>
                                {line.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 10, right: 20, left: 20, bottom: 30 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                        <XAxis
                            dataKey="date"
                            tick={{ fill: '#78716c', fontSize: 12 }}
                            tickLine={{ stroke: '#d6d3d1' }}
                            axisLine={{ stroke: '#e7e5e4' }}
                        >
                            <Label
                                value="Date"
                                position="bottom"
                                offset={10}
                                style={{ fill: '#57534e', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
                            />
                        </XAxis>
                        <YAxis
                            tick={{ fill: '#78716c', fontSize: 12 }}
                            tickLine={{ stroke: '#d6d3d1' }}
                            axisLine={{ stroke: '#e7e5e4' }}
                        >
                            <Label
                                value="Books Distributed"
                                angle={-90}
                                position="left"
                                offset={0}
                                style={{ fill: '#57534e', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif', textAnchor: 'middle' }}
                            />
                        </YAxis>
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e7e5e4',
                                borderRadius: '12px',
                                boxShadow: '0 10px 25px -5px rgba(255, 107, 53, 0.15)',
                                fontFamily: 'Inter, sans-serif',
                            }}
                            labelFormatter={(_, payload) => payload[0]?.payload?.fullDate || ''}
                        />

                        {LINES.map((line) => (
                            visibleLines[line.key] && (
                                <Line
                                    key={line.key}
                                    type="monotone"
                                    dataKey={line.key}
                                    stroke={line.color}
                                    strokeWidth={2}
                                    dot={{ fill: line.color, strokeWidth: 2, r: 3, stroke: 'white' }}
                                    activeDot={{ r: 6, fill: line.color, stroke: 'white', strokeWidth: 2 }}
                                    animationDuration={500}
                                />
                            )
                        ))}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
