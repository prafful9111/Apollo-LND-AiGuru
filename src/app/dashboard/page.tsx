'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardHeader from './components/DashboardHeader';
import ScenarioCard from './components/ScenarioCard';
import { Clock, LogOut, BedDouble, AlertCircle, HeartHandshake, UtensilsCrossed, Frown, UserX, ShieldAlert, BadgeDollarSign } from 'lucide-react';

// Scenario Data
const SCENARIOS = [
    { id: 1, title: "Delayed Doctor Appointment", category: "Front Desk", description: "Manage patient expectations when wait times exceed limits.", icon: <Clock size={24} /> },
    { id: 2, title: "Discharge Time Management", category: "Nursing", description: "Streamline the discharge process to improve bed turnover.", icon: <LogOut size={24} /> },
    { id: 3, title: "IP Room Request Handling", category: "Front Desk", description: "Coordinate room allocation conflicts efficiently.", icon: <BedDouble size={24} /> },
    { id: 4, title: "Breaking Bad News", category: "Doctors", description: "Deliver difficult information with empathy and clarity.", icon: <AlertCircle size={24} /> },
    { id: 5, title: "Calming Anxious Patient", category: "Nursing", description: "De-escalate high-stress situations using verbal techniques.", icon: <HeartHandshake size={24} /> },
    { id: 6, title: "Outside Food Restrictions", category: "Security", description: "Enforce policy while maintaining patient satisfaction.", icon: <UtensilsCrossed size={24} /> },
    { id: 7, title: "Patient Refusing to Eat", category: "Dietary", description: "Address dietary refusal with sensitivity and protocol.", icon: <Frown size={24} /> },
    { id: 8, title: "Angry Attendant (Billing)", category: "Billing", description: "Resolve billing disputes with frustrated family members.", icon: <UserX size={24} /> },
    { id: 9, title: "Insurance Coverage Disputes", category: "Billing", description: "Navigate complex coverage denials and explain options.", icon: <ShieldAlert size={24} /> },
    { id: 10, title: "Financial Waiver Request", category: "Billing", description: "Evaluate and process requests for financial assistance.", icon: <BadgeDollarSign size={24} /> },
];

export default function Dashboard() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('All Roles');

    // Filter Logic
    const filteredScenarios = SCENARIOS.filter(scenario => {
        const matchesSearch = scenario.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = selectedRole === 'All Roles' || scenario.category === selectedRole; // Simple matching, can be expanded
        return matchesSearch && matchesRole;
    });

    return (
        <>
            <DashboardHeader
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedRole={selectedRole}
                setSelectedRole={setSelectedRole}
            />

            <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {filteredScenarios.map((scenario, index) => (
                        <ScenarioCard
                            key={scenario.id}
                            {...scenario}
                            delay={index * 0.05} // Stagger effect
                        />
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Empty State */}
            {filteredScenarios.length === 0 && (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                    <div className="w-16 h-16 mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                        <SearchX size={32} />
                    </div>
                    <p className="font-medium">No scenarios found</p>
                </div>
            )}
        </>
    );
}

function SearchX({ size }: { size: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /><path d="m14 8-6 6" /><path d="m8 8 6 6" /></svg>
    );
}
