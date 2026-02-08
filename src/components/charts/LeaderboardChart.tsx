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

// Gold medal gradient colors - devotional theme
const COLORS = ['#F7B32B', '#FFD166', '#FF6B35', '#FF8C42', '#FFB088'];

export function LeaderboardChart({ data }: LeaderboardChartProps) {
    // Sort by points descending and take top 5
    const top5 = [...data]
        .sort((a, b) => b.Points - a.Points)
        .slice(0, 5);

    return (
        <div className="bg-white rounded-2xl shadow-lg shadow-warm-200/50 border border-warm-100 p-6 chart-container">
            <h3 className="text-lg font-bold text-warm-800 font-heading mb-4">Top 5 Book Distributors</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={top5} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
                        <defs>
                            {COLORS.map((color, index) => (
                                <linearGradient key={`leader-grad-${index}`} id={`leaderGrad-${index}`} x1="0" y1="0" x2="1" y2="0">
                                    <stop offset="0%" stopColor={color} stopOpacity={0.8} />
                                    <stop offset="100%" stopColor={color} stopOpacity={1} />
                                </linearGradient>
                            ))}
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" horizontal={true} vertical={false} />
                        <XAxis
                            type="number"
                            tick={{ fill: '#78716c', fontSize: 12 }}
                            tickLine={{ stroke: '#d6d3d1' }}
                            axisLine={{ stroke: '#e7e5e4' }}
                            label={{ value: 'Points', position: 'insideBottom', offset: -5, fill: '#78716c' }}
                        />
                        <YAxis
                            type="category"
                            dataKey="Devotee"
                            tick={{ fill: '#78716c', fontSize: 12 }}
                            tickLine={{ stroke: '#d6d3d1' }}
                            axisLine={{ stroke: '#e7e5e4' }}
                            width={75}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e7e5e4',
                                borderRadius: '12px',
                                boxShadow: '0 10px 25px -5px rgba(247, 179, 43, 0.15)',
                                fontFamily: 'Inter, sans-serif',
                            }}
                            cursor={{ fill: 'rgba(247, 179, 43, 0.1)' }}
                        />
                        <Bar dataKey="Points" radius={[0, 8, 8, 0]}>
                            {top5.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={`url(#leaderGrad-${index % COLORS.length})`} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
