import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    Label,
} from 'recharts';
import { MentorshipRow } from '../../types';

interface MentorLoadChartProps {
    data: MentorshipRow[];
}

// Forest green gradient colors - mentoring theme
const COLORS = ['#2D6A4F', '#40916C', '#52B788', '#74C69D', '#95D5B2'];

export function MentorLoadChart({ data }: MentorLoadChartProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg shadow-warm-200/50 border border-warm-100 p-6 chart-container">
            <h3 className="text-lg font-bold text-warm-800 font-heading mb-4">Mentees Allotted</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 10, right: 20, left: 20, bottom: 50 }}>
                        <defs>
                            {COLORS.map((color, index) => (
                                <linearGradient key={`mentor-grad-${index}`} id={`mentorGrad-${index}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={color} stopOpacity={1} />
                                    <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                                </linearGradient>
                            ))}
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                        <XAxis
                            dataKey="Mentor"
                            tick={{ fill: '#78716c', fontSize: 11 }}
                            tickLine={{ stroke: '#d6d3d1' }}
                            axisLine={{ stroke: '#e7e5e4' }}
                            angle={-45}
                            textAnchor="end"
                            height={80}
                            interval={0}
                        >
                            <Label
                                value="Mentor"
                                position="bottom"
                                offset={5}
                                style={{ fill: '#57534e', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
                            />
                        </XAxis>
                        <YAxis
                            tick={{ fill: '#78716c', fontSize: 12 }}
                            tickLine={{ stroke: '#d6d3d1' }}
                            axisLine={{ stroke: '#e7e5e4' }}
                        >
                            <Label
                                value="Mentees"
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
                            cursor={{ fill: 'rgba(45, 106, 79, 0.1)' }}
                        />
                        <Bar dataKey="Mentees" radius={[8, 8, 0, 0]}>
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={`url(#mentorGrad-${index % COLORS.length})`} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
