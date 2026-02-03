'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

interface ScenarioCardProps {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    category: string;
    delay: number;
}

export default function ScenarioCard({ id, title, description, icon, category, delay }: ScenarioCardProps) {
    const router = useRouter();

    // Category Color Map (for better visibility)
    const categoryColors: Record<string, string> = {
        'Doctors': 'bg-blue-100 text-blue-700 border-blue-200',
        'Nursing': 'bg-rose-100 text-rose-700 border-rose-200',
        'Front Desk': 'bg-purple-100 text-purple-700 border-purple-200',
        'Billing': 'bg-amber-100 text-amber-700 border-amber-200',
        'Security': 'bg-slate-200 text-slate-700 border-slate-300',
        'Dietary': 'bg-green-100 text-green-700 border-green-200',
    };

    const tagStyle = categoryColors[category] || 'bg-slate-100 text-slate-600 border-slate-200';

    const handleStartSimulation = () => {
        router.push(`/simulation/${id}`);
    };

    return (
        <motion.div
            layout
            onClick={handleStartSimulation}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{
                duration: 0.5,
                delay: delay,
                type: "spring",
                stiffness: 100,
                damping: 15
            }}
            className="group relative h-48 rounded-3xl overflow-hidden cursor-pointer"
        >
            {/* High Contrast Background */}
            <div className={clsx(
                "absolute inset-0 bg-white shadow-lg border border-slate-100",
                "transition-all duration-300 group-hover:border-apollo-blue/50 group-hover:shadow-[0_12px_40px_0_rgba(40,131,163,0.1)]",
                "group-hover:-translate-y-1"
            )} />

            {/* Decorative Background Shape to fill space */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-apollo-blue/5 to-transparent rounded-full blur-2xl group-hover:bg-apollo-blue/10 transition-colors" />

            {/* Content */}
            <div className="relative z-10 h-full p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    {/* Icon Container (Normal Size) */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 text-apollo-blue shadow-sm border border-slate-100 group-hover:bg-apollo-blue/5 transition-colors">
                        {icon}
                    </div>

                    {/* High Visibility Category Tag */}
                    <span className={clsx("px-3 py-1.5 text-[11px] font-bold tracking-wide uppercase rounded-full border", tagStyle)}>
                        {category}
                    </span>
                </div>

                <div>
                    <h3 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-apollo-blue transition-colors mb-2">
                        {title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed pr-2 line-clamp-2">
                        {description}
                    </p>
                </div>
            </div>

            {/* Start Simulation Overlay */}
            <div className={clsx(
                "absolute inset-0 z-20 bg-apollo-blue/95 backdrop-blur-md flex items-center justify-center gap-3 text-white font-bold",
                "transition-all duration-300 translate-y-full opacity-0",
                "group-hover:translate-y-0 group-hover:opacity-100"
            )}>
                <span className="text-lg">Start Simulation</span>
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Play size={18} fill="currentColor" />
                </div>
            </div>
        </motion.div>
    );
}
