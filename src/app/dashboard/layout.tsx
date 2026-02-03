'use client';

import Sidebar from './components/Sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-apollo-blue/20">
            {/* Noise Texture Overlay */}
            <div
                className="fixed inset-0 opacity-[0.03] pointer-events-none z-0"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E")' }}
            />

            <Sidebar />

            <main className="relative z-10 pl-24 pr-8 py-8 min-h-screen transition-all duration-300 ease-in-out">
                {children}
            </main>
        </div>
    );
}
