'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface Message {
    id: string;
    role: 'agent' | 'user';
    text: string;
}

interface LiveTranscriptProps {
    messages: Message[];
}

export default function LiveTranscript({ messages }: LiveTranscriptProps) {
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="w-full h-full flex justify-center pointer-events-none">
            <div
                ref={scrollRef}
                className="w-full h-full px-6 overflow-y-auto no-scrollbar mask-image-gradient"
                style={{ maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 80%, transparent 100%)' }}
            >
                <div className="flex flex-col gap-6 py-4 pb-32">
                    <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`max-w-[80%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                                    <p className={`text-lg md:text-xl font-medium leading-relaxed tracking-wide ${msg.role === 'user' ? 'text-apollo-blue' : 'text-slate-700'}`}>
                                        {msg.text}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
