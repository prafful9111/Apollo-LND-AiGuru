'use client';

import LoginBackground from '@/app/components/LoginBackground';
import UnifiedAuthCard from '@/app/components/UnifiedAuthCard';

export default function Home() {
  return (
    <main className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <LoginBackground />

      <div className="z-10 w-full flex justify-center">
        <UnifiedAuthCard />
      </div>
    </main>
  );
}
