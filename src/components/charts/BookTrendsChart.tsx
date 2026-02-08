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

// Tailwind color hex values
const INDIGO_500 = '#6366f1';
const EMERALD_500 = '#10b981';
const AMBER_500 = '#f59e0b';
const ROSE_500 = '#f43f5e';

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
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 chart-container">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Book Distribution Trends</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                            dataKey="date"
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            tickLine={{ stroke: '#cbd5e1' }}
                            axisLine={{ stroke: '#e2e8f0' }}
                            label={{ value: 'Date', position: 'insideBottom', offset: -5, fill: '#64748b' }}
                        />
                        <YAxis
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            tickLine={{ stroke: '#cbd5e1' }}
                            axisLine={{ stroke: '#e2e8f0' }}
                            label={{ value: 'Books Distributed', angle: -90, position: 'insideLeft', fill: '#64748b' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                            }}
                            labelFormatter={(_, payload) => payload[0]?.payload?.fullDate || ''}
                        />
                        <Legend
                            wrapperStyle={{ paddingTop: '10px' }}
                            iconType="circle"
                        />
                        <Line
                            type="monotone"
                            dataKey="Small"
                            stroke={INDIGO_500}
                            strokeWidth={2}
                            dot={{ fill: INDIGO_500, strokeWidth: 2, r: 3 }}
                            activeDot={{ r: 5, fill: INDIGO_500, stroke: 'white', strokeWidth: 2 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="Medium"
                            stroke={EMERALD_500}
                            strokeWidth={2}
                            dot={{ fill: EMERALD_500, strokeWidth: 2, r: 3 }}
                            activeDot={{ r: 5, fill: EMERALD_500, stroke: 'white', strokeWidth: 2 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="Big"
                            stroke={AMBER_500}
                            strokeWidth={2}
                            dot={{ fill: AMBER_500, strokeWidth: 2, r: 3 }}
                            activeDot={{ r: 5, fill: AMBER_500, stroke: 'white', strokeWidth: 2 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="Arjuna"
                            stroke={ROSE_500}
                            strokeWidth={2}
                            dot={{ fill: ROSE_500, strokeWidth: 2, r: 3 }}
                            activeDot={{ r: 5, fill: ROSE_500, stroke: 'white', strokeWidth: 2 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
