import { LayoutDashboard, BookOpen } from 'lucide-react';
import { useState } from 'react';

interface TabNavigationProps {
    activeTab: 'sessions' | 'bookDistribution';
    onTabChange: (tab: 'sessions' | 'bookDistribution') => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
    const [hoveredTab, setHoveredTab] = useState<string | null>(null);

    const tabs = [
        {
            id: 'sessions' as const,
            label: 'Sessions',
            icon: LayoutDashboard,
        },
        {
            id: 'bookDistribution' as const,
            label: 'Book Distribution & Mentoring',
            icon: BookOpen,
        },
    ];

    return (
        <div className="sidebar-nav">
            <div className="sidebar-nav-inner">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    const isHovered = hoveredTab === tab.id;
                    return (
                        <div key={tab.id} className="sidebar-tab-wrapper">
                            <button
                                onClick={() => onTabChange(tab.id)}
                                onMouseEnter={() => setHoveredTab(tab.id)}
                                onMouseLeave={() => setHoveredTab(null)}
                                className={`sidebar-tab-btn ${isActive ? 'active' : ''}`}
                                title={tab.label}
                            >
                                {/* Active indicator bar */}
                                {isActive && (
                                    <span className="sidebar-active-indicator" />
                                )}
                                {/* Icon */}
                                <span className={`sidebar-tab-icon ${isActive ? 'active' : ''}`}>
                                    <Icon className="w-5 h-5" />
                                </span>
                            </button>
                            {/* Tooltip on hover */}
                            {isHovered && (
                                <div className="sidebar-tooltip">
                                    <span className="sidebar-tooltip-text">{tab.label}</span>
                                    <span className="sidebar-tooltip-arrow" />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
