import { LayoutDashboard, BookOpen } from 'lucide-react';

interface TabNavigationProps {
    activeTab: 'sessions' | 'bookDistribution';
    onTabChange: (tab: 'sessions' | 'bookDistribution') => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
    const tabs = [
        {
            id: 'sessions' as const,
            label: 'Sessions',
            icon: LayoutDashboard,
        },
        {
            id: 'bookDistribution' as const,
            label: 'Book Distribution and Mentoring',
            icon: BookOpen,
        },
    ];

    return (
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-center">
                <div className="inline-flex p-1.5 bg-slate-100 rounded-2xl shadow-inner">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={`
                  flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300
                  ${isActive
                                        ? 'bg-white text-indigo-600 shadow-lg shadow-indigo-500/20 scale-[1.02]'
                                        : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
                                    }
                `}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'text-indigo-500' : ''}`} />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
