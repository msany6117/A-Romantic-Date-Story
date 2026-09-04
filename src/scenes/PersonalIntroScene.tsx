import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, MessageCircleHeart } from 'lucide-react';
import { SiteConfig } from '../types';
import { pageTransition, slideUp, buttonPress } from '../animations/variants';
import { audioManager } from '../utils/audio';

interface PersonalIntroSceneProps {
  config: SiteConfig;
  onNext: () => void;
}

export const PersonalIntroScene: React.FC<PersonalIntroSceneProps> = ({ config, onNext }) => {
  const greeting = config.personalIntro.greeting.replace('{herName}', config.herName);

  const handleNext = () => {
    audioManager.playChime(783.99); // G5 chime
    onNext();
  };

  return (
    <motion.section
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-16 text-center max-w-xl mx-auto"
    >
      <div className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-14 shadow-xl shadow-black/5 border border-[#1A1A1A]/5 relative overflow-hidden">
        {/* Soft decorative background icon */}
        <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none">
          <Heart className="w-48 h-48 text-[#6D071A]" />
        </div>

        {/* Small icon badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-14 h-14 rounded-2xl bg-[#FDE2E4]/60 text-[#6D071A] border border-[#E5989B]/30 flex items-center justify-center mx-auto mb-6 shadow-xs"
        >
          <MessageCircleHeart className="w-7 h-7" />
        </motion.div>

        {/* Greeting with Her Name */}
        <motion.h2
          variants={slideUp}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] font-normal mb-5 tracking-tight"
        >
          {greeting}
        </motion.h2>

        <motion.div variants={slideUp} className="space-y-4 mb-8">
          <p className="text-base sm:text-lg text-[#1A1A1A]/70 leading-relaxed font-light">
            {config.personalIntro.message}
          </p>
          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="w-8 h-px bg-[#B5838D]/40" />
            <Sparkles className="w-4 h-4 text-[#B5838D]" />
            <span className="w-8 h-px bg-[#B5838D]/40" />
          </div>
          <p className="text-base sm:text-lg font-serif italic text-[#6D071A]">
            {config.personalIntro.subMessage}
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.button
          id="ask-me-btn"
          onClick={handleNext}
          variants={buttonPress}
          whileHover="hover"
          whileTap="tap"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 sm:px-12 py-4 sm:py-5 rounded-full bg-[#6D071A] text-white font-medium text-base shadow-xl shadow-[#6D071A]/20 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        >
          <span>{config.personalIntro.buttonText}</span>
        </motion.button>
      </div>
    </motion.section>
  );
};
