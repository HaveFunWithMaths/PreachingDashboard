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
            emoji: '📅',
        },
        {
            id: 'bookDistribution' as const,
            label: 'Book Distribution and Mentoring',
            icon: BookOpen,
            emoji: '📚',
        },
    ];

    return (
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-center">
                <div className="inline-flex p-1.5 bg-gradient-to-r from-warm-100 via-primary-50 to-secondary-50 rounded-2xl shadow-inner border border-warm-200/50">
                    {tabs.map((tab, index) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTabChange(tab.id)}
                                className={`
                                    relative flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300
                                    ${isActive
                                        ? 'bg-white text-primary-600 shadow-lg shadow-primary-500/20 scale-[1.02]'
                                        : 'text-warm-500 hover:text-warm-700 hover:bg-white/50'
                                    }
                                    ${isActive ? 'animate-bounce-soft' : ''}
                                `}
                                style={{
                                    animationDelay: `${index * 0.1}s`,
                                }}
                            >
                                {/* Icon with animation */}
                                <span className={`transition-all duration-300 ${isActive ? 'scale-110' : ''}`}>
                                    <Icon className={`w-5 h-5 ${isActive ? 'text-primary-500' : ''}`} />
                                </span>

                                {/* Emoji indicator */}
                                <span className={`text-base transition-transform duration-300 ${isActive ? 'animate-bounce-soft' : 'opacity-70'}`}>
                                    {tab.emoji}
                                </span>

                                <span className="font-heading">{tab.label}</span>

                                {/* Active indicator line */}
                                {isActive && (
                                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-primary-500 to-secondary-400 rounded-full" />
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
