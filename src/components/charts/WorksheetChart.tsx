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
import { WorksheetsRow } from '../../types';

interface WorksheetChartProps {
    data: WorksheetsRow[];
}

// Blue-teal gradient for worksheets - calm learning theme
const COLORS = ['#0891B2', '#22D3EE', '#67E8F9', '#A5F3FC', '#CFFAFE'];

export function WorksheetChart({ data }: WorksheetChartProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg shadow-warm-200/50 border border-warm-100 p-6 chart-container">
            <h3 className="text-lg font-bold text-warm-800 font-heading mb-4">Worksheet Completion</h3>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <defs>
                            {COLORS.map((color, index) => (
                                <linearGradient key={`ws-grad-${index}`} id={`wsGrad-${index}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={color} stopOpacity={1} />
                                    <stop offset="100%" stopColor={color} stopOpacity={0.6} />
                                </linearGradient>
                            ))}
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                        <XAxis
                            dataKey="Worsheets"
                            tick={{ fill: '#78716c', fontSize: 11 }}
                            tickLine={{ stroke: '#d6d3d1' }}
                            axisLine={{ stroke: '#e7e5e4' }}
                            angle={-45}
                            textAnchor="end"
                            height={80}
                            interval={0}
                            label={{ value: 'Worksheets', position: 'insideBottom', offset: -60, fill: '#78716c' }}
                        />
                        <YAxis
                            tick={{ fill: '#78716c', fontSize: 12 }}
                            tickLine={{ stroke: '#d6d3d1' }}
                            axisLine={{ stroke: '#e7e5e4' }}
                            label={{ value: 'Number', angle: -90, position: 'insideLeft', fill: '#78716c' }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'white',
                                border: '1px solid #e7e5e4',
                                borderRadius: '12px',
                                boxShadow: '0 10px 25px -5px rgba(8, 145, 178, 0.15)',
                                fontFamily: 'Inter, sans-serif',
                            }}
                            cursor={{ fill: 'rgba(8, 145, 178, 0.1)' }}
                        />
                        <Bar dataKey="Number" radius={[8, 8, 0, 0]}>
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={`url(#wsGrad-${index % COLORS.length})`} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
