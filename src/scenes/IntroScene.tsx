import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { SiteConfig } from '../types';
import { pageTransition, slideUp, heartPop, buttonPress } from '../animations/variants';
import { fireHeartConfetti } from '../utils/confetti';
import { audioManager } from '../utils/audio';

interface IntroSceneProps {
  config: SiteConfig;
  onNext: () => void;
}

export const IntroScene: React.FC<IntroSceneProps> = ({ config, onNext }) => {
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecondLine(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    setIsOpening(true);
    fireHeartConfetti();
    audioManager.playChime(659.25); // E5 pleasant bell chime
    // Prompt playback on first interaction
    audioManager.play();

    setTimeout(() => {
      onNext();
    }, 700);
  };

  return (
    <motion.section
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center max-w-2xl mx-auto"
    >
      {/* Delicate floating romantic envelope / heart badge */}
      <motion.div
        variants={heartPop}
        initial="initial"
        animate="animate"
        className="mb-8 relative"
      >
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#FDE2E4]/60 border border-[#E5989B]/30 flex items-center justify-center mx-auto transition-transform hover:scale-105">
          <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-[#6D071A] fill-[#6D071A]" />
        </div>
        <motion.div
          animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-1 -right-1"
        >
          <Sparkles className="w-5 h-5 text-[#B5838D]" />
        </motion.div>
      </motion.div>

      {/* Primary opening texts */}
      <motion.h1
        variants={slideUp}
        className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal tracking-tight text-[#1A1A1A] leading-[1.15] mb-4"
      >
        {config.introMessage.line1}
      </motion.h1>

      <div className="h-14 sm:h-16 flex items-center justify-center mb-8">
        {showSecondLine && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="text-lg sm:text-xl text-[#B5838D] font-serif italic tracking-wide"
          >
            {config.introMessage.line2}
          </motion.p>
        )}
      </div>

      {/* Button to open surprise */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: showSecondLine ? 1 : 0, scale: showSecondLine ? 1 : 0.9 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <motion.button
          id="open-surprise-btn"
          onClick={handleClick}
          disabled={!showSecondLine || isOpening}
          variants={buttonPress}
          whileHover="hover"
          whileTap="tap"
          className="group relative inline-flex items-center gap-3 px-10 sm:px-12 py-4 sm:py-5 rounded-full bg-[#6D071A] text-white font-medium text-base sm:text-lg shadow-xl shadow-[#6D071A]/20 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        >
          <span>{config.introMessage.buttonText}</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          >
            ❤️
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 2, duration: 1 }}
        className="mt-12 text-xs tracking-[0.2em] uppercase font-mono text-[#1A1A1A]/40"
      >
        Made with love
      </motion.p>
    </motion.section>
  );
};
