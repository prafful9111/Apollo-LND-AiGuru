'use client';

import { motion } from 'framer-motion';
import { BarChart2, Award, HelpCircle, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Sidebar() {
    const router = useRouter();

    return (
        <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="fixed left-0 top-0 h-screen w-20 bg-white/10 backdrop-blur-xl border-r border-white/20 z-50 flex flex-col items-center py-8"
        >
            {/* Logo Placeholder / Home */}
            <div className="mb-10 w-10 h-10 rounded-xl bg-apollo-blue/20 flex items-center justify-center text-apollo-blue">
                <div className="w-3 h-3 bg-current rounded-full neon-pulse" />
            </div>

            {/* Nav Items */}
            <nav className="flex-1 flex flex-col gap-6 w-full px-4">
                <SidebarItem icon={<BarChart2 size={22} />} label="Progress" active />
                <SidebarItem icon={<Award size={22} />} label="Top Performers" />
                <SidebarItem icon={<HelpCircle size={22} />} label="Support" />
            </nav>

            {/* Logout */}
            <button
                onClick={() => router.push('/')}
                className="mt-auto w-10 h-10 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"
                title="Logout"
            >
                <LogOut size={20} />
            </button>
        </motion.aside>
    );
}

function SidebarItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <div className="group relative flex items-center justify-center w-full aspect-square cursor-pointer">
            <div className={`p-3 rounded-xl transition-all duration-300 ${active ? 'bg-apollo-blue text-white shadow-lg shadow-apollo-blue/30' : 'text-slate-500 hover:bg-white/50 hover:text-apollo-blue'}`}>
                {icon}
            </div>

            {/* Tooltip */}
            <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {label}
            </div>
        </div>
    );
}
