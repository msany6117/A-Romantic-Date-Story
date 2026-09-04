import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioManager } from '../utils/audio';

interface MusicControllerProps {
  isDarkScene?: boolean;
}

export const MusicController: React.FC<MusicControllerProps> = ({ isDarkScene = false }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    // Check initial state from audioManager
    setIsPlaying(audioManager.getIsPlaying());
  }, []);

  const handleToggle = async () => {
    const newState = await audioManager.toggleMusic();
    setIsPlaying(newState);
  };

  return (
    <button
      id="music-toggle-btn"
      onClick={handleToggle}
      className="group flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono tracking-wide transition-all duration-300 shadow-xs border bg-white/90 text-[#1A1A1A]/70 border-[#1A1A1A]/10 hover:bg-black/5 backdrop-blur-md cursor-pointer"
      title={isPlaying ? 'Mute romantic melody' : 'Play romantic melody'}
      aria-label={isPlaying ? 'Mute music' : 'Play music'}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-3.5 h-3.5 text-[#6D071A] animate-pulse" />
          <span className="flex items-center gap-0.5 h-2.5">
            <span className="w-0.5 h-2 bg-[#6D071A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-0.5 h-3 bg-[#6D071A] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-0.5 h-1.5 bg-[#6D071A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </span>
          <span className="text-[11px] hidden sm:inline text-[#1A1A1A]">Melody On</span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 opacity-60" />
          <span className="text-[11px] hidden sm:inline text-[#1A1A1A]/60">Melody Off</span>
        </>
      )}
    </button>
  );
};
