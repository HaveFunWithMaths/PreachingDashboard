import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Label,
} from 'recharts';
import { format } from 'date-fns';
import { SummaryRow } from '../../types';

interface GrowthChartProps {
    data: SummaryRow[];
}

// Devotional color palette
const ACCENT_500 = '#2D6A4F'; // Forest green
const SECONDARY_400 = '#F7B32B'; // Gold

export function GrowthChart({ data }: GrowthChartProps) {
    const chartData = data.map((row) => ({
        date: format(row.Day, 'MMM dd'),
        fullDate: format(row.Day, 'MMM dd, yyyy'),
        'New Attendees': row.NewAttendees,
        'New Contacts': row.NewContacts,
    }));

    return (
        <div className="bg-white rounded-2xl shadow-lg shadow-warm-200/50 border border-warm-100 p-6 chart-container">
            <h3 className="text-lg font-bold text-warm-800 font-heading mb-4">New Attendees & Contacts</h3>
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
                                value="Count"
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
                                boxShadow: '0 10px 25px -5px rgba(45, 106, 79, 0.15)',
                                fontFamily: 'Inter, sans-serif',
                            }}
                            labelFormatter={(_, payload) => payload[0]?.payload?.fullDate || ''}
                        />
                        <Legend
                            verticalAlign="top"
                            height={36}
                            wrapperStyle={{ paddingTop: '0px', paddingBottom: '10px', fontFamily: 'Inter, sans-serif' }}
                            iconType="circle"
                        />
                        <Line
                            type="monotone"
                            dataKey="New Attendees"
                            stroke={ACCENT_500}
                            strokeWidth={3}
                            dot={{ fill: ACCENT_500, strokeWidth: 2, r: 4, stroke: 'white' }}
                            activeDot={{ r: 7, fill: ACCENT_500, stroke: 'white', strokeWidth: 3 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="New Contacts"
                            stroke={SECONDARY_400}
                            strokeWidth={3}
                            dot={{ fill: SECONDARY_400, strokeWidth: 2, r: 4, stroke: 'white' }}
                            activeDot={{ r: 7, fill: SECONDARY_400, stroke: 'white', strokeWidth: 3 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
