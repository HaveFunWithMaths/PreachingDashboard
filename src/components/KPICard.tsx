import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';

interface KPICardProps {
    title: string;
    value: number | string;
    icon: ReactNode;
    trend?: {
        value: number;
        label: string;
    };
    iconBgColor?: string;
    gradient: string;
    delay?: number;
}

export function KPICard({ title, value, icon, trend, gradient, iconBgColor = 'bg-warm-50', delay = 0 }: KPICardProps) {
    const [displayValue, setDisplayValue] = useState<number | string>(typeof value === 'number' ? 0 : value);
    const [isVisible, setIsVisible] = useState(false);

    // Animated counter effect
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        if (typeof value === 'number' && isVisible) {
            const duration = 1000;
            const steps = 30;
            const stepDuration = duration / steps;
            let currentStep = 0;

            const interval = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;
                const easeOut = 1 - Math.pow(1 - progress, 3);
                setDisplayValue(Math.round(value * easeOut));

                if (currentStep >= steps) {
                    clearInterval(interval);
                    setDisplayValue(value);
                }
            }, stepDuration);

            return () => clearInterval(interval);
        } else {
            setDisplayValue(value);
        }
    }, [value, isVisible]);

    const getTrendIcon = () => {
        if (!trend) return null;
        if (trend.value > 0) return <TrendingUp className="w-4 h-4" />;
        if (trend.value < 0) return <TrendingDown className="w-4 h-4" />;
        return <Minus className="w-4 h-4" />;
    };

    // Green for positive, Red for negative - as requested
    const getTrendColor = () => {
        if (!trend) return '';
        if (trend.value > 0) return 'text-green-600 bg-green-50';
        if (trend.value < 0) return 'text-red-600 bg-red-50';
        return 'text-warm-500 bg-warm-50';
    };

    return (
        <div
            className={`kpi-card relative overflow-hidden bg-white rounded-2xl shadow-lg shadow-warm-200/50 border-t-4 p-6 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={{
                transitionDelay: `${delay}ms`,
                borderTopColor: gradient.includes('primary') ? '#FF6B35' : gradient.includes('accent') ? '#2D6A4F' : '#F7B32B',
                borderLeftColor: '#e7e5e4',
                borderRightColor: '#e7e5e4',
                borderBottomColor: '#e7e5e4',
                borderLeftWidth: '1px',
                borderRightWidth: '1px',
                borderBottomWidth: '1px',
            }}
        >
            {/* Floating particles */}
            <div className="particles">
                <div className="particle" />
                <div className="particle" />
                <div className="particle" />
                <div className="particle" />
                <div className="particle" />
            </div>

            {/* Icon with hover animation */}
            <div className="mb-4 relative z-10">
                <div className={`p-3 rounded-xl ${iconBgColor} w-fit icon-hover shadow-sm`}>
                    {icon}
                </div>
            </div>

            {/* Value and Trend */}
            <div className="flex items-baseline gap-3 mb-1 relative z-10">
                <span className="text-4xl font-bold text-warm-800 font-mono number-animate">
                    {displayValue}
                </span>
                {trend && (
                    <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${getTrendColor()} trend-pulse`}>
                        {getTrendIcon()}
                        <span>{Math.abs(trend.value).toFixed(1)}%</span>
                    </div>
                )}
            </div>

            {/* Title */}
            <p className="text-sm font-medium text-warm-500 font-heading relative z-10">{title}</p>

            {trend && (
                <p className="text-xs text-warm-400 mt-1 relative z-10">{trend.label}</p>
            )}

            {/* Decorative corner gradient */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-tl from-primary-100/50 via-secondary-100/30 to-transparent rounded-full blur-xl" />
        </div>
    );
}
