'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Lock, User, ScanLine, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

export default function LoginCard({ onSwitch }: { onSwitch: () => void }) {
    const router = useRouter();
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    // Function to handle login transition
    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoggingIn(true);

        // Simulate API delay then transition
        setTimeout(() => {
            router.push('/dashboard');
        }, 800); // Faster transition as requested
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isLoggingIn ? { scale: 0.98, opacity: 0, filter: "blur(10px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={clsx(
                "relative w-[600px] p-8 rounded-3xl overflow-hidden",
                "bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl",
                "flex flex-col gap-6 items-center",
                isLoggingIn && "pointer-events-none"
            )}
        >
            {/* Decorative Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-apollo-blue/40 blur-md rounded-full" />

            {/* Header */}
            <div className="text-center space-y-2 mb-2">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-apollo-blue/10 to-transparent text-apollo-blue mb-2 shadow-sm"
                >
                    <Fingerprint size={24} />
                </motion.div>
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold tracking-tight text-slate-800"
                >
                    Welcome Back
                </motion.h1>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm text-slate-500 font-medium"
                >
                    Sign in to your account
                </motion.p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="w-full space-y-5">
                <div className="space-y-4">
                    <InputGroup
                        icon={<User size={18} />}
                        type="text"
                        placeholder="Staff ID"
                        delay={0.5}
                    />
                    <InputGroup
                        icon={<Lock size={18} />}
                        type="password"
                        placeholder="Password"
                        delay={0.6}
                    />
                </div>

                <div className="pt-2">
                    <motion.button
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.7 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full max-w-sm mx-auto h-12 bg-apollo-blue text-white font-semibold rounded-xl shadow-lg shadow-apollo-blue/20 hover:shadow-apollo-blue/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                    >
                        <span>Secure Login</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </div>
            </form>
            <div className="text-center mt-6">
                <p className="text-xs text-slate-500">
                    Don't have an account?{' '}
                    <button onClick={onSwitch} className="text-apollo-blue font-semibold hover:underline cursor-pointer">
                        Sign up
                    </button>
                </p>
            </div>
        </motion.div>
    );
}

function InputGroup({ icon, type, placeholder, delay }: { icon: React.ReactNode, type: string, placeholder: string, delay: number }) {
    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay }}
            className="group relative"
        >
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-apollo-blue transition-colors">
                {icon}
            </div>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-apollo-blue/20 focus:border-apollo-blue transition-all"
            />
        </motion.div>
    );
}
