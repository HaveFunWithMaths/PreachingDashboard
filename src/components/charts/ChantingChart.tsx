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
import { ChantingRow } from '../../types';

interface ChantingChartProps {
    data: ChantingRow[];
}

// Gradient colors for bars - purple theme
const COLORS = ['#7c3aed', '#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe'];

export function ChantingChart({ data }: ChantingChartProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 chart-container">
            <h3 className="text-lg font-bold text-slate-800 mb-4">Chanting Rounds Distribution</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                            dataKey="Rounds"
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            tickLine={{ stroke: '#cbd5e1' }}
                            axisLine={{ stroke: '#e2e8f0' }}
                            label={{ value: 'Rounds', position: 'insideBottom', offset: -5, fill: '#64748b' }}
                        />
                        <YAxis
                            tick={{ fill: '#64748b', fontSize: 12 }}
                            tickLine={{ stroke: '#cbd5e1' }}
                            axisLine={{ stroke: '#e2e8f0' }}
                            label={{ value: 'Number of People', angle: -90, position: 'insideLeft', fill: '#64748b' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e2e8f0',
                                borderRadius: '12px',
                                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
                            }}
                            cursor={{ fill: 'rgba(124, 58, 237, 0.1)' }}
                        />
                        <Bar dataKey="Number" radius={[8, 8, 0, 0]}>
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
