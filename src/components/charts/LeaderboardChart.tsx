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
import { BDLeaderboardRow } from '../../types';

interface LeaderboardChartProps {
    data: BDLeaderboardRow[];
}

// Gold medal gradient colors - devotional theme
const COLORS = ['#F7B32B', '#FFD166', '#FF6B35', '#FF8C42', '#FFB088'];

export function LeaderboardChart({ data }: LeaderboardChartProps) {
    // Sort by points descending and take top 10
    const top10 = [...data]
        .sort((a, b) => b.Points - a.Points)
        .slice(0, 10);

    return (
        <div className="bg-white rounded-2xl shadow-lg shadow-warm-200/50 border border-warm-100 p-6 chart-container">
            <h3 className="text-lg font-bold text-warm-800 font-heading mb-4">Top 10 Book Distributors</h3>
            <div className="h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={top10} layout="vertical" margin={{ top: 10, right: 20, left: 80, bottom: 30 }}>
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
                        >
                            <Label
                                value="Points"
                                position="bottom"
                                offset={10}
                                style={{ fill: '#57534e', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}
                            />
                        </XAxis>
                        <YAxis
                            type="category"
                            dataKey="Devotee"
                            tick={{ fill: '#78716c', fontSize: 12 }}
                            tickLine={{ stroke: '#d6d3d1' }}
                            axisLine={{ stroke: '#e7e5e4' }}
                            width={75}
                        >
                            <Label
                                value="Devotee"
                                angle={-90}
                                position="left"
                                offset={55}
                                style={{ fill: '#57534e', fontSize: 13, fontWeight: 600, fontFamily: 'Inter, sans-serif', textAnchor: 'middle' }}
                            />
                        </YAxis>
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
                            {top10.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={`url(#leaderGrad-${index % COLORS.length})`} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
