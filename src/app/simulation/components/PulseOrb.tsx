'use client';

import { motion } from 'framer-motion';
import Orb from './Orb';
import { Bot } from 'lucide-react';

type InteractionState = 'idle' | 'agent_speaking' | 'user_speaking' | 'ended';

interface AudioWaveOrbProps {
    state: InteractionState;
}

export default function AudioWaveOrb({ state }: AudioWaveOrbProps) {
    // Color scheme based on state
    const getColors = () => {
        switch (state) {
            case 'agent_speaking':
                return {
                    sphere: 'from-blue-400 to-indigo-500',
                    wave: '#3b82f6',
                    glow: 'rgba(59, 130, 246, 0.2)'
                };
            case 'user_speaking':
                return {
                    sphere: 'from-emerald-400 to-teal-500',
                    wave: '#10b981',
                    glow: 'rgba(16, 185, 129, 0.2)'
                };
            case 'ended':
                return {
                    sphere: 'from-slate-300 to-slate-400',
                    wave: '#94a3b8',
                    glow: 'rgba(148, 163, 184, 0.15)'
                };
            default:
                return {
                    sphere: 'from-sky-400 to-blue-500',
                    wave: '#0ea5e9',
                    glow: 'rgba(14, 165, 233, 0.15)'
                };
        }
    };

    const colors = getColors();
    const getHue = () => {
        switch (state) {
            case 'user_speaking':
                return 120; // Greenish
            case 'ended':
                return 200; // Shift for ended state
            default:
                return 0; // Default blue/purple
        }
    }

    const isActive = state === 'agent_speaking' || state === 'user_speaking';

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            {/* WebGL Orb */}
            <div className="relative w-48 h-48 flex items-center justify-center z-10">
                <Orb
                    color={state === 'agent_speaking' ? '#2883A3' : state === 'user_speaking' ? '#10B981' : '#67E8F9'}
                    state={state}
                />

                {/* AI Bot Logo in center */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                    <Bot
                        size={48}
                        className="text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                        strokeWidth={2}
                    />
                </div>
            </div>

            {/* Horizontal Audio Waveform - below the sphere */}
            {isActive && (
                <div className="absolute bottom-8 flex items-end justify-center gap-1 h-16">
                    {[...Array(40)].map((_, i) => {
                        // Create varied heights for more natural waveform
                        const baseHeight = Math.sin(i * 0.5) * 20 + 30;

                        return (
                            <motion.div
                                key={i}
                                animate={{
                                    height: [`${baseHeight * 0.3}%`, `${baseHeight}%`, `${baseHeight * 0.6}%`, `${baseHeight * 0.9}%`, `${baseHeight * 0.3}%`]
                                }}
                                transition={{
                                    duration: 0.8,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: i * 0.02
                                }}
                                className="w-1 rounded-full"
                                style={{
                                    backgroundColor: colors.wave,
                                    boxShadow: `0 0 6px ${colors.glow}`,
                                    minHeight: '4px'
                                }}
                            />
                        );
                    })}
                </div>
            )}

            {/* Status indicator */}
            <div className="absolute bottom-0 flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border border-slate-200 shadow-lg z-20">
                <motion.div
                    animate={{
                        scale: isActive ? [1, 1.3, 1] : 1,
                        opacity: isActive ? [0.8, 1, 0.8] : 1
                    }}
                    transition={{
                        duration: 1,
                        repeat: isActive ? Infinity : 0,
                        ease: "easeInOut"
                    }}
                    className="w-2 h-2 rounded-full"
                    style={{
                        backgroundColor: isActive ? colors.wave : '#94a3b8',
                        boxShadow: isActive ? `0 0 8px ${colors.wave}` : 'none'
                    }}
                />
                <span className="text-xs font-medium text-slate-700">
                    {state === 'agent_speaking' ? 'AI Speaking' : state === 'user_speaking' ? 'Listening' : state === 'ended' ? 'Session Ended' : 'Ready'}
                </span>
            </div>
        </div>
    );
}
