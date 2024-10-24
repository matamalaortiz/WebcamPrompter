import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="p-2 rounded-lg transition-colors dark:hover:bg-zinc-800/50 hover:bg-zinc-200"
    >
      {isDark ? (
        <Sun size={18} className="text-zinc-400 hover:text-zinc-100" />
      ) : (
        <Moon size={18} className="text-zinc-600 hover:text-zinc-800" />
      )}
    </button>
  );
};

export default ThemeToggle;