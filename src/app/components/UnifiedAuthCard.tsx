'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Lock, User, Mail, UserPlus, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import clsx from 'clsx';

type AuthMode = 'login' | 'signup';

export default function UnifiedAuthCard() {
    const router = useRouter();
    const [mode, setMode] = useState<AuthMode>('login');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            router.replace('/dashboard');
        }, 800);
    };

    const isLogin = mode === 'login';

    return (
        <motion.div
            animate={{
                height: isLogin ? '580px' : '640px'
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={clsx(
                "relative w-[600px] p-8 rounded-3xl overflow-hidden",
                "bg-white/70 backdrop-blur-2xl border border-white/50 shadow-lg",
                "flex flex-col gap-6 items-center",
                isSubmitting && "pointer-events-none"
            )}
        >
            {/* Decorative Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-apollo-blue/40 blur-md rounded-full" />

            {/* Logo Branding */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center mb-2 mt-4"
            >
                <img
                    src="/Logo.png"
                    alt="AI Guru Logo"
                    className="h-16 w-auto mx-auto"
                />
            </motion.div>

            {/* Header - Animated Content */}
            <div className="text-center space-y-2 mb-2 flex flex-col items-center">
                <AnimatePresence mode="wait">
                    <motion.h1
                        key={`title-${mode}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="text-2xl font-bold tracking-tight text-slate-800"
                    >
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </motion.h1>
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    <motion.p
                        key={`subtitle-${mode}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2, delay: 0.05 }}
                        className="text-sm text-slate-500 font-medium"
                    >
                        {isLogin ? 'Sign in to your account' : 'Join the clinical network'}
                    </motion.p>
                </AnimatePresence>
            </div>

            {/* Form - Animated Content */}
            <form onSubmit={handleSubmit} className="w-full space-y-5">
                <motion.div
                    animate={{
                        height: isLogin ? '150px' : '200px'
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="space-y-4 overflow-hidden"
                >
                    <AnimatePresence mode="wait">
                        {isLogin ? (
                            <motion.div
                                key="login-inputs"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.25 }}
                                className="space-y-4"
                            >
                                <InputGroup
                                    icon={<User size={18} />}
                                    type="text"
                                    placeholder="Staff ID"
                                />
                                <InputGroup
                                    icon={<Lock size={18} />}
                                    type="password"
                                    placeholder="Password"
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="signup-inputs"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.25 }}
                                className="space-y-2.5"
                            >
                                <InputGroup
                                    icon={<User size={18} />}
                                    type="text"
                                    placeholder="Full Name"
                                />
                                <InputGroup
                                    icon={<Mail size={18} />}
                                    type="email"
                                    placeholder="Email Address"
                                />
                                <InputGroup
                                    icon={<Lock size={18} />}
                                    type="password"
                                    placeholder="Choose Password"
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <div>
                    <AnimatePresence mode="wait">
                        <motion.button
                            key={`button-${mode}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full max-w-sm mx-auto h-12 bg-apollo-blue text-white font-semibold rounded-xl shadow-lg shadow-apollo-blue/20 hover:shadow-apollo-blue/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                        >
                            <span>{isLogin ? 'Secure Login' : 'Create Profile'}</span>
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </motion.button>
                    </AnimatePresence>
                </div>
            </form>

            {/* Footer Toggle */}
            <div className="text-center mt-6">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={`footer-${mode}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                        className="text-xs text-slate-500"
                    >
                        {isLogin ? "Don't have an account? " : 'Already have an account? '}
                        <button
                            onClick={() => setMode(isLogin ? 'signup' : 'login')}
                            className="text-apollo-blue font-semibold hover:underline cursor-pointer"
                        >
                            {isLogin ? 'Sign up' : 'Log in'}
                        </button>
                    </motion.p>
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

function InputGroup({ icon, type, placeholder }: { icon: React.ReactNode, type: string, placeholder: string }) {
    return (
        <div className="group relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-apollo-blue transition-colors">
                {icon}
            </div>
            <input
                type={type}
                placeholder={placeholder}
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-slate-50/50 border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-apollo-blue/20 focus:border-apollo-blue transition-all"
            />
        </div>
    );
}
