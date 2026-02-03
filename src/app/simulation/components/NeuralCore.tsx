'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Orb from './Orb';

type InteractionState = 'idle' | 'agent_speaking' | 'user_speaking' | 'ended';

interface NeuralCoreProps {
    state: InteractionState;
}

export default function NeuralCore({ state }: NeuralCoreProps) {
    // Generate random bars for the user speaking visualizer
    const [bars, setBars] = useState<{ height: number; duration: number }[]>([]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setBars(Array.from({ length: 20 }, () => ({
            height: Math.random(),
            duration: 0.4 + Math.random() * 0.3
        })));
    }, []);

    // Determine Orb interaction props based on state
    const orbProps = {
        hue: state === 'agent_speaking' ? 20 : state === 'user_speaking' ? 40 : 0,
        hoverIntensity: state === 'agent_speaking' ? 0.8 : state === 'user_speaking' ? 0.5 : 0.2,
        rotateOnHover: true,
        forceHoverState: state === 'agent_speaking',
    };

    return (
        <div className="relative w-[320px] h-[320px] flex items-center justify-center">

            {/* React Bits ORB Component */}
            <div className="absolute inset-0 z-10">
                <Orb
                    hue={orbProps.hue}
                    hoverIntensity={orbProps.hoverIntensity}
                    rotateOnHover={orbProps.rotateOnHover}
                    forceHoverState={orbProps.forceHoverState}
                    backgroundColor="transparent"
                />
            </div>

            {/* Scale-in/out Animation for Enter/Exit */}
            <motion.div
                className="absolute inset-0 z-0 bg-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            />

            {/* USER SPEAKING STATE: Clean Waveform Overlay */}
            {state === 'user_speaking' && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 z-20 pointer-events-none">
                    {bars.map((bar, i) => (
                        <motion.div
                            key={i}
                            initial={{ height: 4, opacity: 0 }}
                            animate={{
                                height: [4, 12 + bar.height * 24, 4],
                                opacity: 1,
                                backgroundColor: "var(--color-apollo-blue)"
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: bar.duration,
                                repeatType: "mirror",
                                ease: "easeInOut"
                            }}
                            className="w-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                        />
                    ))}
                </div>
            )}

        </div>
    );
}
