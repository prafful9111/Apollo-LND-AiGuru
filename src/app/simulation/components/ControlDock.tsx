'use client';

import { Mic, MicOff, PhoneOff, HelpCircle } from 'lucide-react';
import clsx from 'clsx';

interface ControlDockProps {
    isMuted: boolean;
    onToggleMute: () => void;
    onEndSession: () => void;
}

export default function ControlDock({ isMuted, onToggleMute, onEndSession }: ControlDockProps) {
    return (
        <div className="fixed bottom-8 left-[calc(50%+40px)] -translate-x-1/2 flex items-center gap-4 z-50">
            {/* Dock Container */}
            <div className="flex items-center gap-2 p-2 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl">

                {/* Hint Button */}
                <button className="w-12 h-12 rounded-full flex items-center justify-center text-slate-600 hover:text-apollo-blue hover:bg-white/40 transition-all">
                    <HelpCircle size={20} />
                </button>

                {/* Mic Toggle (Main Action) */}
                <button
                    onClick={onToggleMute}
                    className={clsx(
                        "w-16 h-16 rounded-full flex items-center justify-center transition-all shadow-lg",
                        isMuted
                            ? "bg-slate-100 text-slate-500 hover:bg-slate-200"
                            : "bg-apollo-blue text-white hover:bg-apollo-blue/90 animate-pulse-slow"
                    )}
                >
                    {isMuted ? <MicOff size={24} /> : <Mic size={28} />}
                </button>

                {/* End Session Button */}
                <button
                    onClick={onEndSession}
                    className="w-12 h-12 rounded-full flex items-center justify-center text-rose-500 hover:bg-rose-500/10 transition-all"
                >
                    <PhoneOff size={20} />
                </button>

            </div>
        </div>
    );
}
