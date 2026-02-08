import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import { BDLeaderboardRow } from '../../types';

interface LeaderboardChartProps {
    data: BDLeaderboardRow[];
}

// Gold medal gradient colors
const COLORS = ['#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e'];

export function LeaderboardChart({ data }: LeaderboardChartProps) {
    // Sort by points descending and take top 5
    const top5 = [...data]
        .sort((a, b) => b.Points - a.Points)
        .slice(0, 5);

    return (
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 chart-container">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Top 5 Book Distributors</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={top5} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" horizontal={true} vertical={false} />
                        <XAxis
                            type="number"
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            tickLine={{ stroke: '#cbd5e1' }}
                            axisLine={{ stroke: '#e2e8f0' }}
                            label={{ value: 'Points', position: 'insideBottom', offset: -5, fill: '#64748b' }}
                        />
                        <YAxis
                            type="category"
                            dataKey="Devotee"
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            tickLine={{ stroke: '#cbd5e1' }}
                            axisLine={{ stroke: '#e2e8f0' }}
                            width={75}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                            }}
                            cursor={{ fill: 'rgba(251, 191, 36, 0.1)' }}
                        />
                        <Bar dataKey="Points" radius={[0, 8, 8, 0]}>
                            {top5.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
