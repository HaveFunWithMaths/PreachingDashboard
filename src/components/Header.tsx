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
        <header className="sticky top-0 z-50 bg-white border-b border-warm-200">
            {/* Single color line at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-purple-500" />

            <div className="relative w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 gap-4">
                    {/* Logo without glow */}
                    <div className="flex-shrink-0">
                        <img
                            src="/GNHLogo.jpeg"
                            alt="Gaur Nitai Home Logo"
                            className="h-14 w-14 rounded-xl shadow-md object-cover ring-2 ring-purple-100"
                        />
                    </div>

                    {/* Title */}
                    <div className="flex-1 text-center">
                        <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight" style={{ color: '#8B5CF6' }}>
                            Gaur Nitai Home Preaching Dashboard
                        </h1>
                    </div>

                    {/* Date Filter */}
                    <div className="flex-shrink-0 flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2 text-warm-500">
                            <Calendar className="w-5 h-5 text-purple-500" />
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
                                    className="px-3 py-2 text-sm border border-warm-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300 hover:shadow-md"
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
                                    className="px-3 py-2 text-sm border border-warm-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all hover:border-purple-300 hover:shadow-md"
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
                                className="p-2 text-warm-400 hover:text-purple-500 hover:bg-purple-50 rounded-xl transition-all duration-300"
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
