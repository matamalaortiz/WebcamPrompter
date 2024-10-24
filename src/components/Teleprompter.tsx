import React, { useEffect, useRef } from 'react';

interface TeleprompterProps {
  text: string;
  isPlaying: boolean;
  speed: number;
  currentWordIndex: number;
  setCurrentWordIndex: (index: number) => void;
}

const Teleprompter: React.FC<TeleprompterProps> = ({ 
  text, 
  isPlaying, 
  speed,
  currentWordIndex,
  setCurrentWordIndex
}) => {
  const words = text.split(' ');
  const intervalRef = useRef<number>();

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        setCurrentWordIndex((prev) => {
          if (prev >= words.length - 1) {
            clearInterval(intervalRef.current);
            return prev;
          }
          return prev + 1;
        });
      }, 1000 / speed);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, speed, words.length, setCurrentWordIndex]);

  return (
    <div className="text-2xl leading-relaxed tracking-wide font-light">
      {words.map((word, index) => (
        <span
          key={index}
          className={`inline-block mx-1 px-1.5 py-0.5 rounded transition-all ${
            index === currentWordIndex
              ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400'
              : index < currentWordIndex
              ? 'dark:text-zinc-700 text-zinc-400'
              : 'dark:text-zinc-400 text-zinc-600'
          }`}
        >
          {word}
        </span>
      ))}
    </div>
  );
};

export default Teleprompter;