import React from 'react';
import { ArrowLeft, RotateCcw, Sparkles } from 'lucide-react';
import { MusicController } from './MusicController';

interface ProgressIndicatorProps {
  currentIndex: number;
  totalScenes: number;
  onBack: () => void;
  onRestart: () => void;
  onOpenCustomizer: () => void;
  isDarkScene?: boolean;
  herName?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentIndex,
  totalScenes,
  onBack,
  onRestart,
  onOpenCustomizer,
  isDarkScene = false,
  herName = 'You',
}) => {
  const currentFormatted = String(currentIndex + 1).padStart(2, '0');
  const totalFormatted = String(totalScenes).padStart(2, '0');
  const progressPercent = ((currentIndex + 1) / totalScenes) * 100;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-10 py-4 sm:py-6 transition-colors duration-500 backdrop-blur-xs bg-[#FDFCFB]/70 border-b border-[#1A1A1A]/5">
      <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Clean Minimalism Brand Mark & Story Title */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full flex items-center justify-center shadow-xs bg-[#6D071A]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <span className="text-xs tracking-[0.2em] uppercase font-semibold text-[#6D071A] opacity-80">
            A Story for {herName}
          </span>

          {currentIndex > 0 && (
            <button
              id="story-back-btn"
              onClick={onBack}
              className="ml-2 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer bg-white text-[#1A1A1A]/70 border-[#1A1A1A]/10 hover:bg-black/5 hover:text-[#1A1A1A]"
              aria-label="Previous chapter"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}

          <button
            id="open-customizer-btn"
            onClick={onOpenCustomizer}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer bg-white text-[#6D071A] border-[#6D071A]/20 hover:bg-[#FDE2E4]/40"
            title="Personalize names & details"
          >
            <Sparkles className="w-3 h-3 text-[#B5838D]" />
            <span className="text-[11px] font-medium hidden md:inline">Customize</span>
          </button>
        </div>

        {/* Center/Right: Chapter 03 / 10 + Clean minimal progress bar */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end">
            <span className="text-xs tracking-[0.1em] font-mono uppercase text-[#1A1A1A]/50">
              Chapter {currentFormatted} <span className="mx-1 opacity-50">/</span> {totalFormatted}
            </span>
            <div className="w-24 sm:w-28 h-[2px] bg-black/10 rounded-full mt-1.5 overflow-hidden">
              <div
                className="h-full transition-all duration-500 ease-out rounded-full bg-[#6D071A]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pl-2 border-l border-[#1A1A1A]/10">
            <MusicController />

            {currentIndex > 0 && (
              <button
                id="story-restart-btn"
                onClick={onRestart}
                className="p-2 rounded-full transition-all duration-200 border cursor-pointer bg-white text-[#1A1A1A]/50 border-[#1A1A1A]/10 hover:text-[#6D071A] hover:bg-black/5"
                title="Start over from beginning"
                aria-label="Restart story"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
