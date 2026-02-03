'use client';

import { motion } from 'framer-motion';
import { CheckCircle, AlertCircle, TrendingUp, ChevronRight, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PerformanceAnalytics() {
    const router = useRouter();

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 backdrop-blur-md p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="w-full max-w-3xl bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
            >
                {/* Header: Clinical Report Style */}
                <div className="flex-none px-8 py-6 border-b border-slate-100 bg-slate-50/50 flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-wider">Completed</span>
                            <span className="text-xs text-slate-400 font-mono">ID: SIM-8492-X</span>
                        </div>
                        <h2 className="text-xl font-bold text-slate-900">Performance Evaluation</h2>
                        <p className="text-sm text-slate-500 mt-1">Scenario: Delayed Appointment De-escalation</p>
                    </div>

                    <div className="text-right">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Overall Score</p>
                        <div className="text-4xl font-bold text-slate-900 tracking-tight">94<span className="text-lg text-slate-400 font-normal">/100</span></div>
                    </div>
                </div>

                {/* Body: Scrollable Metrics */}
                <div className="flex-1 overflow-y-auto p-8">

                    {/* Key Metrics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        {/* Metric 1 */}
                        <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-1.5 rounded-md bg-white shadow-sm border border-slate-100 text-apollo-blue">
                                    <TrendingUp size={16} />
                                </div>
                                <span className="text-sm font-semibold text-slate-700">Empathy</span>
                            </div>
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-2xl font-bold text-slate-900">96%</span>
                                <span className="text-xs text-emerald-500 font-medium mb-1.5">+4% vs avg</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-apollo-blue w-[96%] rounded-full" />
                            </div>
                        </div>

                        {/* Metric 2 */}
                        <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-1.5 rounded-md bg-white shadow-sm border border-slate-100 text-indigo-500">
                                    <CheckCircle size={16} />
                                </div>
                                <span className="text-sm font-semibold text-slate-700">Resolution</span>
                            </div>
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-2xl font-bold text-slate-900">88%</span>
                                <span className="text-xs text-slate-400 font-medium mb-1.5">Standard</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500 w-[88%] rounded-full" />
                            </div>
                        </div>

                        {/* Metric 3 */}
                        <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="p-1.5 rounded-md bg-white shadow-sm border border-slate-100 text-amber-500">
                                    <AlertCircle size={16} />
                                </div>
                                <span className="text-sm font-semibold text-slate-700">Protocol</span>
                            </div>
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-2xl font-bold text-slate-900">100%</span>
                                <span className="text-xs text-emerald-500 font-medium mb-1.5">Perfect</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 w-[100%] rounded-full" />
                            </div>
                        </div>
                    </div>

                    {/* Feedback Section */}
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Analysis Summary</h3>
                            <div className="p-4 rounded-lg border border-slate-100 bg-white text-sm leading-relaxed text-slate-600">
                                <p>Candidate demonstrated excellent de-escalation techniques. The use of the "apology sandwich" method was effectively timed. Empathy markers were high throughout the interaction. The resolution offered was within protocol guidelines.</p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">Areas for Improvement</h3>
                            <ul className="space-y-2">
                                <li className="flex items-start gap-3 p-3 rounded-md bg-amber-50/50 border border-amber-100">
                                    <AlertCircle size={16} className="text-amber-600 mt-0.5 shrink-0" />
                                    <span className="text-sm text-slate-700">Tone variance could be improved during the initial greeting to establish firmer authority while maintaining empathy.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>

                {/* Footer Actions */}
                <div className="flex-none p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end items-center">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            Return to Scenarios
                        </button>
                        <button
                            onClick={() => router.push('/dashboard')}
                            className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity shadow-sm"
                        >
                            Start Next Scenario <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

            </motion.div>
        </div>
    );
}
