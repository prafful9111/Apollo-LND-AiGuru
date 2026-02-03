'use client';

import { motion } from 'framer-motion';
import { LayoutGrid, Radio, BarChart2, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <motion.aside
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="fixed left-0 top-0 h-screen w-20 bg-white/10 backdrop-blur-xl border-r border-white/20 shadow-xl z-50 flex flex-col items-center py-8"
        >
            {/* Nav Items */}
            <nav className="flex-1 flex flex-col gap-6 w-full px-4 items-center">
                <SidebarItem
                    icon={<LayoutGrid size={22} />}
                    label="Scenarios"
                    href="/dashboard"
                    active={pathname === '/dashboard'}
                />
                <SidebarItem
                    icon={<Radio size={22} />}
                    label="Simulation"
                    href="/simulation/1"
                    active={pathname?.startsWith('/simulation')}
                />
                <SidebarItem
                    icon={<BarChart2 size={22} />}
                    label="Analytics"
                    href="/analytics"
                    active={pathname === '/analytics'}
                />
            </nav>

            {/* Logout */}
            <button
                onClick={() => router.replace('/')}
                className="mt-auto w-10 h-10 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors bg-slate-100/50 dark:bg-slate-800/50 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-500/10"
                title="Logout"
            >
                <LogOut size={20} />
            </button>
        </motion.aside>
    );
}

function SidebarItem({ icon, label, href, active = false }: { icon: React.ReactNode, label: string, href: string, active?: boolean }) {
    return (
        <Link href={href} className="group relative flex items-center justify-center w-full aspect-square cursor-pointer">
            <div className={`p-3 rounded-xl transition-all duration-300 ${active ? 'bg-apollo-blue text-white shadow-lg shadow-apollo-blue/30' : 'text-slate-500 dark:text-slate-400 hover:bg-white/50 dark:hover:bg-slate-700 hover:text-apollo-blue'}`}>
                {icon}
            </div>

            {/* Tooltip */}
            <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                {label}
            </div>
        </Link>
    );
}
