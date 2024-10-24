import React, { useState, useCallback, useEffect } from 'react';
import { Settings, X } from 'lucide-react';
import Teleprompter from './components/Teleprompter';
import WebcamRecorder from './components/WebcamRecorder';
import SpeedControl from './components/SpeedControl';
import Modal from './components/Modal';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(2);
  const [script, setScript] = useState(
    "Welcome to this professional recording session. This is a sample script that you can edit. The teleprompter will highlight each word as you speak, helping you maintain a natural pace. Feel free to adjust the speed to match your speaking style."
  );
  const [isRecording, setIsRecording] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleStart = useCallback((withRecording: boolean) => {
    setIsPlaying(true);
    if (withRecording) {
      setIsRecording(true);
    }
  }, []);

  const handleStop = useCallback(() => {
    setIsPlaying(false);
    setIsRecording(false);
  }, []);

  const handleReset = useCallback(() => {
    setCurrentWordIndex(0);
    setIsPlaying(false);
    setIsRecording(false);
  }, []);

  // Calculate estimated reading time
  const wordCount = script.split(' ').length;
  const averageWordsPerMinute = 130; // Average speaking rate
  const estimatedMinutes = Math.ceil(wordCount / averageWordsPerMinute);

  return (
    <div className="min-h-screen dark:bg-black bg-zinc-50 flex flex-col transition-colors">
      <div className="flex-1 container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-6">
          <div className="text-sm dark:text-zinc-500 text-zinc-600">
            Estimated time: {estimatedMinutes} minute{estimatedMinutes !== 1 ? 's' : ''} 
            <span className="mx-2">•</span> 
            {wordCount} words
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 dark:bg-zinc-900/50 bg-zinc-200/50 dark:hover:bg-zinc-800/50 hover:bg-zinc-300/50 rounded-lg transition-colors dark:text-zinc-400 text-zinc-600 hover:text-zinc-900 dark:hover:text-white"
            >
              <Settings size={18} />
              <span className="text-sm font-medium">Edit Script</span>
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <WebcamRecorder 
              isRecording={isRecording}
              setIsRecording={setIsRecording}
            />
            <SpeedControl speed={speed} setSpeed={setSpeed} />
          </div>

          <div className="dark:bg-zinc-900/30 bg-white/50 backdrop-blur rounded-2xl p-6 shadow-xl">
            <div className="h-[calc(100vh-24rem)] overflow-y-auto scrollbar-hide">
              <Teleprompter 
                text={script}
                isPlaying={isPlaying}
                speed={speed}
                currentWordIndex={currentWordIndex}
                setCurrentWordIndex={setCurrentWordIndex}
              />
            </div>
          </div>
        </div>

        <Footer 
          isPlaying={isPlaying}
          isRecording={isRecording}
          onStart={handleStart}
          onStop={handleStop}
          onReset={handleReset}
        />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold dark:text-zinc-100 text-zinc-900">Edit Script</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 dark:hover:bg-zinc-800 hover:bg-zinc-200 rounded-lg transition-colors dark:text-zinc-400 text-zinc-600 dark:hover:text-white hover:text-zinc-900"
              >
                <X size={18} />
              </button>
            </div>
            <textarea
              className="w-full h-64 dark:bg-zinc-800/50 bg-zinc-100/50 backdrop-blur dark:text-zinc-100 text-zinc-900 rounded-lg p-4 resize-none focus:ring-1 focus:ring-blue-500/50 focus:outline-none text-sm"
              value={script}
              onChange={(e) => setScript(e.target.value)}
              placeholder="Enter your script here..."
            />
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default App;