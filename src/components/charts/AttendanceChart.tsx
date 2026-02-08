import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import { format } from 'date-fns';
import { SummaryRow } from '../../types';

interface AttendanceChartProps {
    data: SummaryRow[];
}

// Tailwind color hex values
const INDIGO_500 = '#6366f1';

export function AttendanceChart({ data }: AttendanceChartProps) {
    const chartData = data.map((row) => ({
        date: format(row.Day, 'MMM dd'),
        fullDate: format(row.Day, 'MMM dd, yyyy'),
        Attendance: row.Attendance,
    }));

    return (
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 chart-container">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Attendance Over Time</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <defs>
                            <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={INDIGO_500} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={INDIGO_500} stopOpacity={0} />
                            </linearGradient>
                        </defs>
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
                            label={{ value: 'Attendance', angle: -90, position: 'insideLeft', fill: '#64748b' }}
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
                        <Line
                            type="monotone"
                            dataKey="Attendance"
                            stroke={INDIGO_500}
                            strokeWidth={3}
                            dot={{ fill: INDIGO_500, strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, fill: INDIGO_500, stroke: 'white', strokeWidth: 2 }}
                            fill="url(#attendanceGradient)"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
