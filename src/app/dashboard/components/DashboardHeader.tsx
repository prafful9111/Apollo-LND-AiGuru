'use client';

import { Search, Bell, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface DashboardHeaderProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    selectedRole: string;
    setSelectedRole: (role: string) => void;
}

export default function DashboardHeader({ searchTerm, setSearchTerm, selectedRole, setSelectedRole }: DashboardHeaderProps) {
    return (
        <header className="sticky top-0 z-40 mb-8 pt-4 pb-4">
            <div className="flex items-center justify-between gap-8">

                {/* Title & Date */}
                <div className="hidden md:block">
                    <h1 className="text-2xl font-bold text-slate-800">The Training Orbit</h1>
                    <p className="text-sm text-slate-500 font-medium">Select a scenario to begin</p>
                </div>

                {/* Search & Filter Bar */}
                <div className="flex-1 max-w-2xl">
                    <div className="relative group">
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-xl rounded-2xl shadow-sm border border-white/60 transition-all group-focus-within:shadow-md group-focus-within:border-apollo-blue/20" />
                        <div className="relative flex items-center h-14 px-4 gap-4">
                            <Search className="text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search scenarios..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 text-slate-700 placeholder:text-slate-400 font-medium"
                            />

                            {/* Role Separator */}
                            <div className="w-[1px] h-6 bg-slate-200" />

                            {/* Role Dropdown (Simple) */}
                            <div className="relative group/dropdown cursor-pointer flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-apollo-blue transition-colors">
                                <span>{selectedRole}</span>
                                <ChevronDown size={16} />

                                {/* Dropdown Menu */}
                                <div className="absolute top-full right-0 mt-4 w-48 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl border border-white/50 p-2 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all transform origin-top-right">
                                    {['All Roles', 'Doctors', 'Nursing', 'Front Desk', 'Billing'].map((role) => (
                                        <div
                                            key={role}
                                            onClick={() => setSelectedRole(role)}
                                            className={`px-3 py-2 rounded-lg cursor-pointer transition-colors ${selectedRole === role ? 'bg-apollo-blue/10 text-apollo-blue' : 'hover:bg-slate-50 text-slate-600'}`}
                                        >
                                            {role}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Profile */}
                <div className="flex items-center gap-4">
                    <button className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 hover:text-apollo-blue transition-colors relative">
                        <Bell size={20} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full" />
                    </button>
                    <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-bold text-slate-800">Dr. Sarah L.</p>
                            <div className="flex items-center justify-end gap-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">Ready to Train</p>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-apollo-blue to-cyan-400 p-[2px]">
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="User" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </header>
    );
}
