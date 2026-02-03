'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, UserPlus, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

export default function SignupCard({ onSwitch }: { onSwitch: () => void }) {
    const router = useRouter();
    const [isSigningUp, setIsSigningUp] = useState(false);

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSigningUp(true);
        setTimeout(() => {
            router.push('/dashboard');
        }, 800);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isSigningUp ? { scale: 0.98, opacity: 0, filter: "blur(10px)" } : { opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className={clsx(
                "relative w-[600px] p-8 rounded-3xl overflow-hidden",
                "bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl",
                "flex flex-col gap-6 items-center",
                isSigningUp && "pointer-events-none"
            )}
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-apollo-blue/40 blur-md rounded-full" />

            <div className="text-center space-y-2 mb-2">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-apollo-blue/10 to-transparent text-apollo-blue mb-2 shadow-sm"
                >
                    <UserPlus size={24} />
                </motion.div>
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl font-bold tracking-tight text-slate-800"
                >
                    Create Account
                </motion.h1>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm text-slate-500 font-medium"
                >
                    Join the clinical network
                </motion.p>
            </div>

            <form onSubmit={handleSignup} className="w-full space-y-5">
                <div className="space-y-4">
                    <InputGroup
                        icon={<User size={18} />}
                        type="text"
                        placeholder="Full Name"
                        delay={0.5}
                    />
                    <InputGroup
                        icon={<Mail size={18} />}
                        type="email"
                        placeholder="Email Address"
                        delay={0.6}
                    />
                    <InputGroup
                        icon={<Lock size={18} />}
                        type="password"
                        placeholder="Choose Password"
                        delay={0.7}
                    />
                </div>

                <div className="pt-2">
                    <motion.button
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full max-w-sm mx-auto h-12 bg-apollo-blue text-white font-semibold rounded-xl shadow-lg shadow-apollo-blue/20 hover:shadow-apollo-blue/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                    >
                        <span>Create Profile</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                </div>
            </form>

            <div className="text-center mt-6">
                <p className="text-xs text-slate-500">
                    Already have an account?{' '}
                    <button onClick={onSwitch} className="text-apollo-blue font-semibold hover:underline cursor-pointer">
                        Log in
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
