import { Calendar, RotateCcw } from 'lucide-react';
import { format } from 'date-fns';

interface HeaderProps {
    startDate: Date | null;
    endDate: Date | null;
    onStartDateChange: (date: Date | null) => void;
    onEndDateChange: (date: Date | null) => void;
}

export function Header({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
}: HeaderProps) {
    return (
        <header className="sticky top-0 z-50">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary-50/90 via-secondary-50/80 to-accent-50/70 backdrop-blur-xl" />

            {/* Animated gradient line at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1 header-gradient-line" />

            <div className="relative max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 gap-4">
                    {/* Logo with glow effect */}
                    <div className="flex-shrink-0 group">
                        <div className="relative">
                            <img
                                src="/GNHLogo.jpeg"
                                alt="Gaur Nitai Home Logo"
                                className="h-14 w-14 rounded-xl shadow-lg object-cover ring-2 ring-primary-200 logo-glow transition-transform duration-300 group-hover:scale-105"
                            />
                            {/* Decorative ring animation */}
                            <div className="absolute inset-0 rounded-xl ring-2 ring-primary-400/50 animate-ping opacity-20" />
                        </div>
                    </div>

                    {/* Title with gradient and animation */}
                    <div className="flex-1 text-center">
                        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight" style={{ color: '#F7B32B' }}>
                            Gaur Nitai Home Preaching Dashboard
                        </h1>
                    </div>

                    {/* Date Filter with enhanced styling */}
                    <div className="flex-shrink-0 flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2 text-warm-500">
                            <Calendar className="w-5 h-5 text-primary-500 icon-hover" />
                            <span className="text-sm font-medium">Filter:</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <input
                                    type="date"
                                    value={startDate ? format(startDate, 'yyyy-MM-dd') : ''}
                                    onChange={(e) =>
                                        onStartDateChange(e.target.value ? new Date(e.target.value) : null)
                                    }
                                    className="px-3 py-2 text-sm border border-warm-200 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all hover:border-primary-300 hover:shadow-md"
                                    placeholder="Start Date"
                                />
                            </div>
                            <span className="text-warm-400 font-medium">to</span>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
                                    onChange={(e) =>
                                        onEndDateChange(e.target.value ? new Date(e.target.value) : null)
                                    }
                                    className="px-3 py-2 text-sm border border-warm-200 rounded-xl bg-white/80 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all hover:border-primary-300 hover:shadow-md"
                                    placeholder="End Date"
                                />
                            </div>
                        </div>

                        {(startDate || endDate) && (
                            <button
                                onClick={() => {
                                    onStartDateChange(null);
                                    onEndDateChange(null);
                                }}
                                className="p-2 text-warm-400 hover:text-primary-500 hover:bg-primary-50 rounded-xl transition-all duration-300 btn-glow"
                                title="Reset Date Filter"
                            >
                                <RotateCcw className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
