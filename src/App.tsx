import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TabNavigation, TabId } from './components/TabNavigation';
import { SessionsTab } from './views/SessionsTab';
import { BookDistributionTab } from './views/BookDistributionTab';
import { MentoringTab } from './views/MentoringTab';
import { loadExcelData } from './utils/dataParser';
import { DashboardData, DateRange } from './types';
import { Loader2, Heart } from 'lucide-react';

function App() {
    const [activeTab, setActiveTab] = useState<TabId>('sessions');
    const [dateRange, setDateRange] = useState<DateRange>({
        startDate: null,
        endDate: null,
    });
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const dashboardData = await loadExcelData('https://docs.google.com/spreadsheets/d/1GaG2OMMg1TG7avyQpxjwfaVWv2-SVRcQbGurorWtsYg/export?format=xlsx');
                setData(dashboardData);
                setError(null);
            } catch (err) {
                console.error('Error loading data:', err);
                setError('Failed to load dashboard data. Please ensure DashBoardData.xlsx is in the public folder.');
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="relative mb-6">
                        <div className="w-20 h-20 mx-auto rounded-2xl bg-purple-500 flex items-center justify-center shadow-xl">
                            <Loader2 className="w-10 h-10 text-white animate-spin" />
                        </div>
                    </div>
                    <p className="text-lg font-heading font-medium text-warm-600">
                        Loading Dashboard...
                    </p>
                    <p className="text-sm text-warm-400 mt-2">Preparing your insights</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center max-w-md p-8 bg-white rounded-3xl shadow-2xl border border-warm-200">
                    <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <span className="text-4xl">⚠️</span>
                    </div>
                    <h2 className="text-2xl font-heading font-bold text-warm-800 mb-3">Unable to Load Data</h2>
                    <p className="text-warm-500 leading-relaxed">{error || 'An unexpected error occurred.'}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-6 px-6 py-3 bg-purple-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:bg-purple-600 transition-all duration-300"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 app-layout">
            {/* Left Sidebar Navigation */}
            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Main Content Area */}
            <div className="main-content-area">
                <Header
                    startDate={dateRange.startDate}
                    endDate={dateRange.endDate}
                    onStartDateChange={(date) => setDateRange((prev) => ({ ...prev, startDate: date }))}
                    onEndDateChange={(date) => setDateRange((prev) => ({ ...prev, endDate: date }))}
                />

                <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 pb-6 pt-4">
                    {activeTab === 'sessions' && (
                        <SessionsTab
                            summary={data.summary}
                            mentorsAllotted={data.mentorsAllotted}
                            cumulativeAttendance={data.cumulativeAttendance}
                            chanting={data.chanting}
                            dateRange={dateRange}
                        />
                    )}
                    {activeTab === 'bookDistribution' && (
                        <BookDistributionTab
                            bd={data.bd}
                            bdLeaderboard={data.bdLeaderboard}
                            bdLeaderboardTimeline={data.bdLeaderboardTimeline}
                            bdLeaderboardDevotees={data.bdLeaderboardDevotees}
                            summary={data.summary}
                            dateRange={dateRange}
                        />
                    )}
                    {activeTab === 'mentoring' && (
                        <MentoringTab
                            mentorship={data.mentorship}
                            worksheets={data.worksheets}
                        />
                    )}
                </main>

                {/* Footer */}
                <footer className="border-t border-warm-200 py-6">
                    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col items-center gap-3">
                            {/* Logo and branding */}
                            <div className="flex items-center gap-3">
                                <img
                                    src="/GNHLogo.png"
                                    alt="Gaur Nitai Home Logo"
                                    className="h-10 w-10 rounded-lg shadow-md object-cover"
                                />
                                <span className="font-heading font-bold text-warm-700">Gaur Nitai Home</span>
                            </div>

                            {/* Copyright with heart */}
                            <p className="text-sm text-warm-500 flex items-center gap-2">
                                Gaur Nitai Home

                                <span className="mx-1">•</span>
                                Made with
                                <Heart className="w-4 h-4 text-purple-500 fill-purple-500" />
                                for devotees
                            </p>

                            {/* Decorative divider */}
                            <div className="w-24 h-1 bg-purple-500 rounded-full" />
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default App;
