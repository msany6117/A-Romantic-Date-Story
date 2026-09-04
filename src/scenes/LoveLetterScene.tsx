import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Feather, ArrowRight } from 'lucide-react';
import { SiteConfig } from '../types';
import { pageTransition, slideUp, buttonPress } from '../animations/variants';
import { audioManager } from '../utils/audio';

interface LoveLetterSceneProps {
  config: SiteConfig;
  onNext: () => void;
}

export const LoveLetterScene: React.FC<LoveLetterSceneProps> = ({ config, onNext }) => {
  const [displayedParagraphs, setDisplayedParagraphs] = useState<number>(0);
  const letter = config.loveLetter;

  const greeting = letter.greeting.replace('{herName}', config.herName);
  const closing = letter.closing.replace('{myName}', config.myName);

  // Progressive reveal of paragraphs
  useEffect(() => {
    if (displayedParagraphs < letter.paragraphs.length) {
      const timer = setTimeout(() => {
        setDisplayedParagraphs((prev) => prev + 1);
        audioManager.playChime(523.25 + displayedParagraphs * 40);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [displayedParagraphs, letter.paragraphs.length]);

  return (
    <motion.section
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-20 text-center max-w-2xl mx-auto"
    >
      {/* Title */}
      <motion.div variants={slideUp} className="mb-6">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FDE2E4]/60 text-[#6D071A] text-xs font-semibold tracking-wider uppercase mb-2 border border-[#E5989B]/30">
          <Feather className="w-3.5 h-3.5 text-[#6D071A]" />
          Chapter Six: A Handwritten Note
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] font-normal tracking-tight">
          {letter.title}
        </h2>
      </motion.div>

      {/* Minimalist Letter Card */}
      <motion.div
        variants={slideUp}
        className="w-full bg-white rounded-3xl p-8 sm:p-12 shadow-xl shadow-black/5 border border-[#1A1A1A]/10 text-left relative overflow-hidden mb-8"
      >
        {/* Subtle top accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#FDE2E4]/40 to-transparent pointer-events-none rounded-tr-3xl" />

        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-serif text-2xl sm:text-3xl text-[#1A1A1A] font-medium mb-6"
        >
          {greeting}
        </motion.p>

        {/* Body Paragraphs */}
        <div className="space-y-4 mb-8">
          {letter.paragraphs.map((p, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: idx <= displayedParagraphs ? 1 : 0,
                y: idx <= displayedParagraphs ? 0 : 10,
              }}
              transition={{ duration: 0.6 }}
              className="text-base sm:text-lg text-[#1A1A1A]/80 font-serif leading-relaxed"
            >
              {p.replace('{herName}', config.herName).replace('{myName}', config.myName)}
            </motion.p>
          ))}
        </div>

        {/* Closing & Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: displayedParagraphs >= letter.paragraphs.length ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="pt-6 border-t border-[#1A1A1A]/10 flex justify-end"
        >
          <div className="text-right">
            <span
              className="font-script text-3xl sm:text-4xl text-[#6D071A] block tracking-wide"
              style={{ fontFamily: "'Dancing Script', cursive" }}
            >
              {closing}
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* Button to Final Surprise */}
      <motion.button
        id="final-surprise-step-btn"
        onClick={() => {
          audioManager.playChime(783.99);
          onNext();
        }}
        variants={buttonPress}
        whileHover="hover"
        whileTap="tap"
        className="inline-flex items-center justify-center gap-2 px-10 sm:px-12 py-4 sm:py-5 rounded-full bg-[#6D071A] text-white font-medium text-base sm:text-lg shadow-xl shadow-[#6D071A]/20 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
      >
        <span>There&apos;s one last thing...</span>
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    </motion.section>
  );
};
