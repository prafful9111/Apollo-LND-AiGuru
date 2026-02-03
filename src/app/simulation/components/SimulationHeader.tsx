'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface SimulationHeaderProps {
    scenarioTitle: string;
}

export default function SimulationHeader({ scenarioTitle }: SimulationHeaderProps) {
    const router = useRouter();

    return (
        <header className="fixed top-0 left-20 right-0 z-50 px-6 py-4 flex items-center justify-between pointer-events-none">
            {/* Back Button (Pointer Events Enabled) */}
            <button
                onClick={() => router.back()}
                className="pointer-events-auto flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-slate-600 hover:text-apollo-blue hover:bg-white/20 transition-all font-medium text-sm"
            >
                <ArrowLeft size={16} />
                <span>Exit Simulation</span>
            </button>

            {/* Scenario Title */}
            <div className="absolute left-1/2 -translate-x-1/2 px-6 py-2 rounded-2xl bg-white/30 backdrop-blur-xl border border-white/40 shadow-sm">
                <h2 className="text-sm font-bold text-slate-800 tracking-wide uppercase">{scenarioTitle}</h2>
            </div>
        </header>
    );
}
