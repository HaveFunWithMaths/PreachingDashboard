import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ReactNode } from 'react';

interface KPICardProps {
    title: string;
    value: number | string;
    icon: ReactNode;
    trend?: {
        value: number;
        label: string;
    };
    gradient: string;
}

export function KPICard({ title, value, icon, trend, gradient }: KPICardProps) {
    const getTrendIcon = () => {
        if (!trend) return null;
        if (trend.value > 0) return <TrendingUp className="w-4 h-4" />;
        if (trend.value < 0) return <TrendingDown className="w-4 h-4" />;
        return <Minus className="w-4 h-4" />;
    };

    const getTrendColor = () => {
        if (!trend) return '';
        if (trend.value > 0) return 'text-emerald-500 bg-emerald-50';
        if (trend.value < 0) return 'text-rose-500 bg-rose-50';
        return 'text-slate-500 bg-slate-50';
    };

    return (
        <div className="relative overflow-hidden bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 chart-container">
            {/* Gradient accent */}
            <div className={`absolute top-0 left-0 right-0 h-1 ${gradient}`} />

            {/* Icon */}
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${gradient} bg-opacity-10`}>
                    {icon}
                </div>

                {trend && (
                    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${getTrendColor()}`}>
                        {getTrendIcon()}
                        <span>{Math.abs(trend.value).toFixed(1)}%</span>
                    </div>
                )}
            </div>

            {/* Value */}
            <div className="mb-1">
                <span className="text-4xl font-bold text-slate-800">{value}</span>
            </div>

            {/* Title */}
            <p className="text-sm font-medium text-slate-500">{title}</p>

            {trend && (
                <p className="text-xs text-slate-400 mt-1">{trend.label}</p>
            )}
        </div>
    );
}
