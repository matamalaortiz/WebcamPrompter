import React from 'react';
import { Gauge } from 'lucide-react';

interface SpeedControlProps {
  speed: number;
  setSpeed: (speed: number) => void;
}

const SpeedControl: React.FC<SpeedControlProps> = ({ speed, setSpeed }) => {
  return (
    <div className="flex items-center gap-4 dark:bg-zinc-900/30 bg-white/50 backdrop-blur p-4 rounded-xl shadow-sm">
      <Gauge size={18} className="dark:text-zinc-400 text-zinc-600" />
      <input
        type="range"
        min="0.5"
        max="5"
        step="0.5"
        value={speed}
        onChange={(e) => setSpeed(parseFloat(e.target.value))}
        className="flex-1 h-1.5 dark:bg-zinc-700/50 bg-zinc-300/50 rounded-lg appearance-none cursor-pointer"
      />
      <span className="text-sm font-mono dark:text-zinc-400 text-zinc-600 dark:bg-zinc-800/50 bg-zinc-200/50 px-2 py-1 rounded">
        {speed.toFixed(1)}x
      </span>
    </div>
  );
};

export default SpeedControl;