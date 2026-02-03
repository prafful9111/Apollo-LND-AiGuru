'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoginBackground from '@/app/components/LoginBackground';
import LoginCard from '@/app/components/LoginCard';
import SignupCard from '@/app/components/SignupCard';

export default function Home() {
  const [view, setView] = useState<'login' | 'signup'>('login');

  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <LoginBackground />

      <div className="z-10 w-full flex justify-center">
        <AnimatePresence mode="wait">
          {view === 'login' ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.3, ease: "linear" }}
            >
              <LoginCard onSwitch={() => setView('signup')} />
            </motion.div>
          ) : (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.3, ease: "linear" }}
            >
              <SignupCard onSwitch={() => setView('login')} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
