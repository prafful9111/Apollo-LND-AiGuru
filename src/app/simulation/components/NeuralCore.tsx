'use client';

import AudioWaveOrb from './PulseOrb';

type InteractionState = 'idle' | 'agent_speaking' | 'user_speaking' | 'ended';

interface NeuralCoreProps {
    state: InteractionState;
}

export default function NeuralCore({ state }: NeuralCoreProps) {
    return (
        <div className="relative w-[320px] h-[320px] flex items-center justify-center">
            {/* Audio Wave Orb */}
            <div className="absolute inset-0 z-10">
                <AudioWaveOrb state={state} />
            </div>
        </div>
    );
}
