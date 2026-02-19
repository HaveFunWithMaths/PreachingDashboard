import { Users } from 'lucide-react';
import { MentorLoadChart } from '../components/charts/MentorLoadChart';
import { WorksheetChart } from '../components/charts/WorksheetChart';
import { MentorshipRow, WorksheetsRow } from '../types';

interface MentoringTabProps {
    mentorship: MentorshipRow[];
    worksheets: WorksheetsRow[];
}

export function MentoringTab({ mentorship, worksheets }: MentoringTabProps) {
    return (
        <div className="tab-content space-y-8">
            {/* Mentoring Section */}
            <section className="animate-on-scroll">
                <div className="flex items-center gap-4 mb-6">
                    {/* Animated accent bar */}
                    <div className="relative h-10 w-1.5 rounded-full overflow-hidden section-accent">
                        <div className="absolute inset-0 bg-gradient-to-b from-accent-500 via-accent-400 to-accent-500" />
                    </div>

                    {/* Section icon */}
                    <div className="p-2 rounded-xl bg-accent-50 icon-hover">
                        <Users className="w-6 h-6 text-accent-500" />
                    </div>

                    {/* Section title */}
                    <div>
                        <h2 className="text-2xl font-bold text-warm-800 font-heading">Mentoring</h2>
                        <p className="text-sm text-warm-400 font-light italic">Guiding spiritual journeys</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="animate-on-scroll stagger-1">
                        <MentorLoadChart data={mentorship} />
                    </div>
                    <div className="animate-on-scroll stagger-2">
                        <WorksheetChart data={worksheets} />
                    </div>
                </div>
            </section>
        </div>
    );
}
