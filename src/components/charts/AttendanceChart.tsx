import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Area,
    AreaChart,
} from 'recharts';
import { format } from 'date-fns';
import { SummaryRow } from '../../types';

interface AttendanceChartProps {
    data: SummaryRow[];
}

// Devotional color palette
const PRIMARY_500 = '#FF6B35'; // Saffron

export function AttendanceChart({ data }: AttendanceChartProps) {
    const chartData = data.map((row) => ({
        date: format(row.Day, 'MMM dd'),
        fullDate: format(row.Day, 'MMM dd, yyyy'),
        Attendance: row.Attendance,
    }));

    return (
        <div className="bg-white rounded-2xl shadow-lg shadow-warm-200/50 border border-warm-100 p-6 chart-container">
            <h3 className="text-lg font-bold text-warm-800 font-heading mb-4">Attendance Over Time</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <defs>
                            <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={PRIMARY_500} stopOpacity={0.4} />
                                <stop offset="95%" stopColor={PRIMARY_500} stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
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
                            label={{ value: 'Attendance', angle: -90, position: 'insideLeft', fill: '#78716c' }}
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
                        <Area
                            type="monotone"
                            dataKey="Attendance"
                            stroke={PRIMARY_500}
                            strokeWidth={3}
                            fill="url(#attendanceGradient)"
                            dot={{ fill: PRIMARY_500, strokeWidth: 2, r: 4, stroke: 'white' }}
                            activeDot={{ r: 7, fill: PRIMARY_500, stroke: 'white', strokeWidth: 3 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
