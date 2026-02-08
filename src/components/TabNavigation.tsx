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
                <div className="inline-flex p-1.5 bg-warm-100 rounded-2xl shadow-inner border border-warm-200/50">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={`
                                    relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300
                                    ${isActive
                                        ? 'bg-white text-purple-600 shadow-lg shadow-purple-500/20 scale-[1.02]'
                                        : 'text-warm-500 hover:text-warm-700 hover:bg-white/50'
                                    }
                                `}
                            >
                                {/* Icon */}
                                <span className={`transition-all duration-300 ${isActive ? 'scale-110' : ''}`}>
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-purple-500' : ''}`} />
                                </span>

                                <span className="font-heading">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
