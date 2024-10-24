import React from 'react';
import { Play, Square, RotateCcw, Video, Presentation } from 'lucide-react';

interface FooterProps {
  isPlaying: boolean;
  isRecording: boolean;
  onStart: (withRecording: boolean) => void;
  onStop: () => void;
  onReset: () => void;
}

const Footer: React.FC<FooterProps> = ({
  isPlaying,
  isRecording,
  onStart,
  onStop,
  onReset,
}) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 dark:bg-zinc-900/80 bg-white/80 backdrop-blur-lg dark:border-zinc-800/50 border-zinc-200/50 border-t">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-4">
          {!isPlaying ? (
            <>
              <button
                onClick={() => onStart(false)}
                className="flex items-center gap-2 px-4 py-2 dark:bg-zinc-800 bg-zinc-200 dark:hover:bg-zinc-700 hover:bg-zinc-300 rounded-lg transition-colors dark:text-zinc-100 text-zinc-900"
              >
                <Presentation size={18} />
                <span className="font-medium">Rehearse</span>
              </button>
              <button
                onClick={() => onStart(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-white"
              >
                <Video size={18} />
                <span className="font-medium">Record</span>
              </button>
            </>
          ) : (
            <button
              onClick={onStop}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors text-white"
            >
              <Square size={18} />
              <span className="font-medium">Stop</span>
            </button>
          )}
          
          <button
            onClick={onReset}
            className="flex items-center gap-2 px-3 py-2 dark:text-zinc-400 text-zinc-600 dark:hover:text-zinc-100 hover:text-zinc-900 rounded-lg transition-colors"
          >
            <RotateCcw size={18} />
            <span className="font-medium">Reset</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;