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
        <header className="sticky top-0 z-50 glass border-b border-slate-200/50">
            <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20 gap-4">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <img
                            src="/GNHLogo.jpeg"
                            alt="Gaur Nitai Home Logo"
                            className="h-14 w-14 rounded-xl shadow-lg object-cover ring-2 ring-indigo-100"
                        />
                    </div>

                    {/* Title */}
                    <div className="flex-1 text-center">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold gradient-text tracking-tight">
                            Gaur Nitai Home Preaching Dashboard
                        </h1>
                    </div>

                    {/* Date Filter */}
                    <div className="flex-shrink-0 flex items-center gap-3">
                        <div className="hidden sm:flex items-center gap-2 text-slate-500">
                            <Calendar className="w-5 h-5 text-indigo-500" />
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
                                    className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                                    placeholder="Start Date"
                                />
                            </div>
                            <span className="text-slate-400">to</span>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={endDate ? format(endDate, 'yyyy-MM-dd') : ''}
                                    onChange={(e) =>
                                        onEndDateChange(e.target.value ? new Date(e.target.value) : null)
                                    }
                                    className="px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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
                                className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-slate-100 rounded-lg transition-colors"
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
