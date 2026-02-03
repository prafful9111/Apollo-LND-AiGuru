'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function LoginBackground() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="fixed inset-0 z-0 bg-soft-slate" />;

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-soft-slate">
            <div className="absolute inset-0 bg-gradient-to-br from-soft-slate via-white to-slate-100 opacity-80" />

            {/* Ambient glowing orbs - Slower, more breathing-like */}
            <motion.div
                animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.2, 0.35, 0.2]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-20%] left-[20%] w-[45vw] h-[45vw] bg-apollo-blue/10 rounded-full blur-[120px]"
            />
            <motion.div
                animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.15, 0.3, 0.15]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[-10%] right-[10%] w-[50vw] h-[50vw] bg-cyan-100/30 rounded-full blur-[130px]"
            />

            {/* Neural Mesh / DNA / ECG Layer */}
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 900">
                <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--color-apollo-blue)" stopOpacity="0" />
                        <stop offset="20%" stopColor="var(--color-apollo-blue)" stopOpacity="0.2" />
                        <stop offset="50%" stopColor="#2883A3" stopOpacity="0.4" />
                        <stop offset="80%" stopColor="var(--color-apollo-blue)" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="var(--color-apollo-blue)" stopOpacity="0" />
                    </linearGradient>

                    <filter id="glow">
                        <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Continuous ECG Pulse Line */}
                <path
                    id="ecg-line"
                    d="M0,450 L200,450 L220,400 L240,500 L260,350 L280,550 L300,450 L600,450 L620,400 L640,500 L660,350 L680,550 L700,450 L1100,450 L1120,400 L1140,500 L1160,350 L1180,550 L1200,450 L1440,450"
                    fill="none"
                    stroke="var(--color-apollo-blue)"
                    strokeWidth="1.5"
                    strokeOpacity="0.01"
                />

                {/* The Active Pulse causing the beat */}
                <motion.path
                    d="M0,450 L200,450 L220,400 L240,500 L260,350 L280,550 L300,450 L600,450 L620,400 L640,500 L660,350 L680,550 L700,450 L1100,450 L1120,400 L1140,500 L1160,350 L1180,550 L1200,450 L1440,450"
                    fill="none"
                    stroke="#2883A3"
                    strokeWidth="3"
                    strokeLinecap="round"
                    filter="url(#glow)"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{
                        pathLength: [0, 0.3, 0],
                        opacity: [0, 0.3, 0],
                        pathOffset: [0, 1, 0]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    style={{
                        strokeDasharray: "1 1",
                    }}
                />
            </svg>
        </div>
    );
}
