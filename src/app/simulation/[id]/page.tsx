'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import NeuralCore from '../components/NeuralCore';
import SimulationHeader from '../components/SimulationHeader';
import LiveTranscript from '../components/LiveTranscript';
import SimulationSidebars from '../components/SimulationSidebars';
import ControlDock from '../components/ControlDock';
import PerformanceAnalytics from '../components/PerformanceAnalytics';
import Sidebar from '@/app/dashboard/components/Sidebar';

type InteractionState = 'idle' | 'agent_speaking' | 'user_speaking' | 'ended';

interface Message {
    id: string;
    role: 'agent' | 'user';
    text: string;
}

export default function SimulationPage({ params }: { params: { id: string } }) {
    const [sessionStarted, setSessionStarted] = useState(false);
    const [interactionState, setInteractionState] = useState<InteractionState>('idle');
    const [isMuted, setIsMuted] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    // Mock simulation flow - only runs when session is started
    useEffect(() => {
        if (!sessionStarted) return;

        let mounted = true;

        const runSimulation = async () => {
            // Initial delay
            await new Promise(r => setTimeout(r, 1000));
            if (!mounted) return;

            // 1. Agent greets
            setInteractionState('agent_speaking');
            await new Promise(r => setTimeout(r, 2000));
            setMessages(prev => [...prev, { id: '1', role: 'agent', text: "Good morning, I understand you're upset about the wait time. How can I assist you right now?" }]);

            if (!mounted) return;
            setInteractionState('idle');

            // 2. User speaks (Simulated)
            await new Promise(r => setTimeout(r, 1500));
            if (!mounted) return;
            setInteractionState('user_speaking');

            await new Promise(r => setTimeout(r, 3000));
            if (!mounted) return;
            setMessages(prev => [...prev, { id: '2', role: 'user', text: "It's been 45 minutes! My appointment was at 10:00 AM. This is unacceptable." }]);
            setInteractionState('idle');

            // 3. Agent responds
            await new Promise(r => setTimeout(r, 1000));
            if (!mounted) return;
            setInteractionState('agent_speaking');

            await new Promise(r => setTimeout(r, 2500));
            if (!mounted) return;
            setMessages(prev => [...prev, { id: '3', role: 'agent', text: "I sincerely apologize for the delay. Dr. Smith had an emergency case. Would you like me to check an estimated time for you?" }]);
            setInteractionState('idle');
        };

        runSimulation();
        return () => { mounted = false; };
    }, [sessionStarted]);

    const handleEndSession = () => {
        setInteractionState('ended');
    };

    return (
        <>
            <Sidebar />
            <main className="relative min-h-screen w-full bg-slate-50 overflow-hidden font-sans selection:bg-apollo-blue/20 pl-20">
                {/* Background - Clean Light Theme */}
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-50 via-white to-slate-50" />

                {/* Header */}
                <SimulationHeader scenarioTitle="Scenario #1: Delayed Appointment" />

                {/* Main Content Layer */}
                <div className="relative z-10 w-full h-[calc(100vh-80px)] mt-14 flex flex-col items-center justify-center">

                    {/* 1. Neural Core (Visualizer) - Top Section */}
                    <div className={`flex-none w-full flex flex-col items-center relative gap-6 ${sessionStarted ? 'justify-start pt-8' : 'justify-center pt-48'}`}>
                        <NeuralCore state={interactionState} />

                        {/* Pre-Session Information & Start Button - Below Orb */}
                        {!sessionStarted && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="flex flex-col items-center gap-4 max-w-2xl px-8"
                            >
                                {/* Informational Content */}
                                <div className="text-center space-y-2">
                                    <h2 className="text-xl font-bold text-slate-800">
                                        Scenario #1: Delayed Appointment
                                    </h2>
                                    <p className="text-sm text-slate-600 leading-relaxed max-w-xl">
                                        Practice handling a frustrated patient experiencing a 45-minute wait.
                                        Your goal is to de-escalate the situation with empathy and provide actionable solutions.
                                    </p>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex items-center justify-center">
                                    {/* Cool Start Session Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setSessionStarted(true)}
                                        className="group relative px-8 py-3 bg-gradient-to-r from-apollo-blue to-blue-600 text-white font-bold rounded-xl shadow-xl shadow-apollo-blue/30 overflow-hidden transition-all"
                                    >
                                        {/* Animated background gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-apollo-blue opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                        {/* Button content */}
                                        <div className="relative flex items-center gap-2">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>Start Session</span>
                                            <motion.div
                                                animate={{ x: [0, 4, 0] }}
                                                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                            >
                                                <ArrowRight size={18} />
                                            </motion.div>
                                        </div>
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* 2. Live Transcript - Bottom Section */}
                    <div className="flex-1 w-full max-w-4xl relative min-h-0">
                        <LiveTranscript messages={messages} />
                    </div>

                    {/* 3. Sidebars */}
                    <SimulationSidebars
                        sessionStarted={sessionStarted}
                        scenarioDescription="Patient is agitated due to a 45-minute wait. Goal: De-escalate and offer options."
                        logs={[
                            "Session Initialized",
                            "Microphone: Active",
                            "Sentiment: Neutral",
                            "User Input Detected",
                            "Sentiment: Negative (Agitation)",
                            "Strategy: Empathy Loop"
                        ]}
                    />

                    {/* 4. Control Dock - Only show when session started */}
                    {sessionStarted && (
                        <ControlDock
                            isMuted={isMuted}
                            onToggleMute={() => setIsMuted(!isMuted)}
                            onEndSession={handleEndSession}
                        />
                    )}
                </div>

                {/* 5. End Session Verification (Analytics) */}
                <AnimatePresence>
                    {interactionState === 'ended' && (
                        <PerformanceAnalytics />
                    )}
                </AnimatePresence>

            </main>
        </>
    );
}
