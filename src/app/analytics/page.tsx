'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Target, Award, Clock, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Sidebar from '@/app/dashboard/components/Sidebar';

export default function AnalyticsPage() {
    const router = useRouter();

    // Sample data
    const overallStats = {
        totalSessions: 47,
        averageScore: 91.2,
        improvementRate: 12.5,
        hoursCompleted: 23.5
    };

    const recentSessions = [
        { id: 1, scenario: 'Delayed Appointment', date: '2026-02-03', score: 94, empathy: 96, resolution: 88, protocol: 100 },
        { id: 2, scenario: 'Calming Anxious Patient', date: '2026-02-02', score: 89, empathy: 92, resolution: 84, protocol: 92 },
        { id: 3, scenario: 'Insurance Coverage Dispute', date: '2026-02-01', score: 87, empathy: 88, resolution: 86, protocol: 88 },
        { id: 4, scenario: 'Delayed Appointment', date: '2026-01-31', score: 92, empathy: 94, resolution: 90, protocol: 92 },
        { id: 5, scenario: 'Calming Anxious Patient', date: '2026-01-30', score: 85, empathy: 86, resolution: 82, protocol: 88 }
    ];

    const skillBreakdown = [
        { skill: 'Empathy', current: 92, target: 95, color: 'bg-apollo-blue' },
        { skill: 'Resolution', current: 86, target: 90, color: 'bg-indigo-500' },
        { skill: 'Protocol', current: 93, target: 95, color: 'bg-amber-500' }
    ];

    return (
        <>
            <Sidebar />
            <main className="min-h-screen bg-slate-50 pl-20">
                {/* Header */}
                <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => router.back()}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                            >
                                <ArrowLeft size={18} />
                                <span className="font-medium">Back</span>
                            </button>
                            <div className="h-6 w-[1px] bg-slate-200" />
                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">Performance Analytics</h1>
                                <p className="text-sm text-slate-500">Track your training progress and skill development</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-slate-100">
                            <Calendar size={16} className="text-slate-500" />
                            <span className="text-sm font-medium text-slate-700">Last 30 Days</span>
                        </div>
                    </div>
                </header>

                {/* Content */}
                <div className="p-8 max-w-7xl mx-auto">

                    {/* Overall Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            icon={<Target size={20} />}
                            label="Total Sessions"
                            value={overallStats.totalSessions.toString()}
                            iconColor="text-apollo-blue"
                            iconBg="bg-apollo-blue/10"
                        />
                        <StatCard
                            icon={<Award size={20} />}
                            label="Average Score"
                            value={`${overallStats.averageScore}%`}
                            iconColor="text-emerald-500"
                            iconBg="bg-emerald-500/10"
                        />
                        <StatCard
                            icon={<TrendingUp size={20} />}
                            label="Improvement Rate"
                            value={`+${overallStats.improvementRate}%`}
                            iconColor="text-indigo-500"
                            iconBg="bg-indigo-500/10"
                        />
                        <StatCard
                            icon={<Clock size={20} />}
                            label="Hours Completed"
                            value={overallStats.hoursCompleted.toString()}
                            iconColor="text-amber-500"
                            iconBg="bg-amber-500/10"
                        />
                    </div>

                    {/* Skill Breakdown */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-xl border border-slate-200 p-6 mb-8"
                    >
                        <h2 className="text-lg font-bold text-slate-900 mb-6">Skill Progression</h2>
                        <div className="space-y-6">
                            {skillBreakdown.map((skill, index) => (
                                <div key={index}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-semibold text-slate-700">{skill.skill}</span>
                                        <div className="flex items-center gap-3">
                                            <span className="text-sm text-slate-500">Current: <span className="font-bold text-slate-900">{skill.current}%</span></span>
                                            <span className="text-sm text-slate-400">Target: {skill.target}%</span>
                                        </div>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${skill.current}%` }}
                                            transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                                            className={`h-full ${skill.color} rounded-full`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Recent Sessions Table */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-xl border border-slate-200 overflow-hidden"
                    >
                        <div className="px-6 py-4 border-b border-slate-200">
                            <h2 className="text-lg font-bold text-slate-900">Recent Sessions</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-slate-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Scenario</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Overall</th>
                                        <th className="px-6 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Empathy</th>
                                        <th className="px-6 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Resolution</th>
                                        <th className="px-6 py-3 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Protocol</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-200">
                                    {recentSessions.map((session, index) => (
                                        <motion.tr
                                            key={session.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 + index * 0.05 }}
                                            className="hover:bg-slate-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle size={16} className="text-emerald-500" />
                                                    <span className="text-sm font-medium text-slate-900">{session.scenario}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{session.date}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${session.score >= 90 ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                    {session.score}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-slate-700">{session.empathy}%</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-slate-700">{session.resolution}%</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-slate-700">{session.protocol}%</td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>

                </div>
            </main>
        </>
    );
}

function StatCard({ icon, label, value, iconColor, iconBg }: { icon: React.ReactNode, label: string, value: string, iconColor: string, iconBg: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-slate-200 p-6"
        >
            <div className="flex items-start justify-between mb-4">
                <div className={`p-2 rounded-lg ${iconBg}`}>
                    <div className={iconColor}>{icon}</div>
                </div>
            </div>
            <div>
                <p className="text-sm text-slate-500 mb-1">{label}</p>
                <p className="text-3xl font-bold text-slate-900">{value}</p>
            </div>
        </motion.div>
    );
}
