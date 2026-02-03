'use client';

import { motion } from 'framer-motion';
import { FileText, Activity, ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface SimulationSidebarsProps {
    sessionStarted: boolean;
    scenarioDescription: string;
    logs: string[];
}

export default function SimulationSidebars({ sessionStarted, scenarioDescription, logs }: SimulationSidebarsProps) {
    const [isLogCollapsed, setIsLogCollapsed] = useState(false);

    return (
        <>
            {/* Objectives Panel - Animates from top-center to left corner */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={
                    sessionStarted
                        ? { opacity: 1 }
                        : { opacity: 1 }
                }
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className={`fixed pointer-events-none z-40 transition-all duration-500 ${sessionStarted
                    ? 'w-[20%] left-28 top-32'
                    : 'w-[40%] left-1/2 -translate-x-1/2 top-28'
                    }`}
            >
                <div className="relative pointer-events-auto">
                    <div className="p-4 rounded-xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-sm flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-apollo-blue mb-1">
                            <FileText size={16} />
                            <h3 className="text-xs font-bold uppercase tracking-wider">Objectives</h3>
                        </div>
                        <p className="text-sm text-slate-700 font-medium leading-relaxed">
                            {scenarioDescription}
                        </p>
                        <div className="mt-2 text-xs text-slate-500">
                            <h4 className="font-bold mb-1">Key Steps:</h4>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Acknowledge concerns</li>
                                <li>Provide clear options</li>
                                <li>Confirm understanding</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Right Sidebar: System Logs */}
            <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="fixed right-6 bottom-24 flex flex-col-reverse gap-2 pointer-events-none z-40"
            >
                <motion.div
                    animate={{
                        width: isLogCollapsed ? '48px' : '256px'
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="p-3 rounded-lg bg-slate-900/80 backdrop-blur-md border border-slate-700/50 shadow-lg pointer-events-auto relative overflow-hidden"
                >
                    {/* Toggle Button */}
                    <button
                        onClick={() => setIsLogCollapsed(!isLogCollapsed)}
                        className="absolute top-3 right-3 z-10 p-1 rounded hover:bg-white/10 transition-colors"
                        aria-label={isLogCollapsed ? 'Expand logs' : 'Collapse logs'}
                    >
                        <motion.div
                            animate={{ rotate: isLogCollapsed ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronRight size={14} className="text-emerald-400" />
                        </motion.div>
                    </button>

                    {isLogCollapsed ? (
                        /* Collapsed State - Just Icon */
                        <div className="flex items-center justify-center h-8">
                            <Activity size={20} className="text-emerald-400" />
                        </div>
                    ) : (
                        /* Expanded State - Full Content */
                        <>
                            <div className="flex items-center gap-2 text-emerald-400 mb-2 border-b border-white/10 pb-2 pr-6">
                                <Activity size={14} />
                                <h3 className="text-[10px] font-bold uppercase tracking-wider font-mono">System Live Feed</h3>
                            </div>
                            <div className="flex flex-col gap-1.5 h-32 overflow-y-auto no-scrollbar font-mono text-[10px]">
                                {logs.map((log, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-emerald-500/80"
                                    >
                                        <span className="text-slate-500">[{new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}]</span> {log}
                                    </motion.div>
                                ))}
                            </div>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </>
    );
}
