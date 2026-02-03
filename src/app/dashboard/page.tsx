'use client';

import { motion } from 'framer-motion';

export default function Dashboard() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="min-h-screen bg-slate-50 p-8"
        >
            <header className="flex items-center justify-between mb-10">
                <h1 className="text-2xl font-bold text-slate-800">AI Guru Dashboard</h1>
                <div className="w-10 h-10 rounded-full bg-apollo-blue/10 flex items-center justify-center text-apollo-blue font-bold">
                    LS
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="h-48 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                        <div className="w-12 h-12 rounded-lg bg-slate-100 mb-4 animate-pulse"></div>
                        <div className="h-4 w-3/4 bg-slate-100 rounded mb-2 animate-pulse"></div>
                        <div className="h-4 w-1/2 bg-slate-100 rounded animate-pulse"></div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
