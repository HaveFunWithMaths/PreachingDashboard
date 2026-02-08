import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TabNavigation } from './components/TabNavigation';
import { SessionsTab } from './views/SessionsTab';
import { BookDistributionTab } from './views/BookDistributionTab';
import { loadExcelData } from './utils/dataParser';
import { DashboardData, DateRange } from './types';
import { Loader2 } from 'lucide-react';

function App() {
    const [activeTab, setActiveTab] = useState<'sessions' | 'bookDistribution'>('sessions');
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
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-indigo-500 animate-spin mx-auto mb-4" />
                    <p className="text-lg font-medium text-slate-600 loading-pulse">Loading Dashboard...</p>
                </div>
            </div>
        );
    }

    if (error || !data) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-rose-50">
                <div className="text-center max-w-md p-8 bg-white rounded-2xl shadow-xl">
                    <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-3xl">⚠️</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Unable to Load Data</h2>
                    <p className="text-slate-500">{error || 'An unexpected error occurred.'}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20">
            <Header
                startDate={dateRange.startDate}
                endDate={dateRange.endDate}
                onStartDateChange={(date) => setDateRange((prev) => ({ ...prev, startDate: date }))}
                onEndDateChange={(date) => setDateRange((prev) => ({ ...prev, endDate: date }))}
            />

            <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

            <main className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                {activeTab === 'sessions' ? (
                    <SessionsTab
                        summary={data.summary}
                        mentorsAllotted={data.mentorsAllotted}
                        cumulativeAttendance={data.cumulativeAttendance}
                        chanting={data.chanting}
                        dateRange={dateRange}
                    />
                ) : (
                    <BookDistributionTab
                        bd={data.bd}
                        bdLeaderboard={data.bdLeaderboard}
                        mentorship={data.mentorship}
                        worksheets={data.worksheets}
                        dateRange={dateRange}
                    />
                )}
            </main>

            {/* Footer */}
            <footer className="py-6 text-center text-sm text-slate-400 border-t border-slate-200/50">
                <p>© 2026 Gaur Nitai Home. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;
