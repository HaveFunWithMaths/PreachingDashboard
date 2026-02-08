import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
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

export function BookTrendsChart({ data }: BookTrendsChartProps) {
    const chartData = data.map((row) => ({
        date: format(row.Day, 'MMM dd'),
        fullDate: format(row.Day, 'MMM dd, yyyy'),
        Small: row.Small,
        Medium: row.Medium,
        Big: row.Big,
        Arjuna: row.Arjuna,
    }));

    return (
        <div className="bg-white rounded-2xl shadow-lg shadow-warm-200/50 border border-warm-100 p-6 chart-container">
            <h3 className="text-lg font-bold text-warm-800 font-heading mb-4">Book Distribution Trends</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                        <XAxis
                            dataKey="date"
                            tick={{ fill: '#78716c', fontSize: 12 }}
                            tickLine={{ stroke: '#d6d3d1' }}
                            axisLine={{ stroke: '#e7e5e4' }}
                            label={{ value: 'Date', position: 'insideBottom', offset: -5, fill: '#78716c' }}
                        />
                        <YAxis
                            tick={{ fill: '#78716c', fontSize: 12 }}
                            tickLine={{ stroke: '#d6d3d1' }}
                            axisLine={{ stroke: '#e7e5e4' }}
                            label={{ value: 'Books Distributed', angle: -90, position: 'insideLeft', fill: '#78716c' }}
                        />
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
                        <Legend
                            wrapperStyle={{ paddingTop: '10px', fontFamily: 'Inter, sans-serif' }}
                            iconType="circle"
                        />
                        <Line
                            type="monotone"
                            dataKey="Small"
                            stroke={PRIMARY_500}
                            strokeWidth={2}
                            dot={{ fill: PRIMARY_500, strokeWidth: 2, r: 3, stroke: 'white' }}
                            activeDot={{ r: 6, fill: PRIMARY_500, stroke: 'white', strokeWidth: 2 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="Medium"
                            stroke={ACCENT_500}
                            strokeWidth={2}
                            dot={{ fill: ACCENT_500, strokeWidth: 2, r: 3, stroke: 'white' }}
                            activeDot={{ r: 6, fill: ACCENT_500, stroke: 'white', strokeWidth: 2 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="Big"
                            stroke={SECONDARY_400}
                            strokeWidth={2}
                            dot={{ fill: SECONDARY_400, strokeWidth: 2, r: 3, stroke: 'white' }}
                            activeDot={{ r: 6, fill: SECONDARY_400, stroke: 'white', strokeWidth: 2 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="Arjuna"
                            stroke={PURPLE_500}
                            strokeWidth={2}
                            dot={{ fill: PURPLE_500, strokeWidth: 2, r: 3, stroke: 'white' }}
                            activeDot={{ r: 6, fill: PURPLE_500, stroke: 'white', strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
