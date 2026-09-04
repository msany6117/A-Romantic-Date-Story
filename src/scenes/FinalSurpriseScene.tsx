import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Scroll, RotateCcw } from 'lucide-react';
import { SiteConfig, DatePlan } from '../types';
import { pageTransition, slideUp, buttonPress } from '../animations/variants';
import { fireGrandCelebration } from '../utils/confetti';
import { audioManager } from '../utils/audio';
import { EasterEggModal } from './EasterEggModal';

interface FinalSurpriseSceneProps {
  config: SiteConfig;
  datePlan: DatePlan;
  onRestart: () => void;
}

export const FinalSurpriseScene: React.FC<FinalSurpriseSceneProps> = ({
  config,
  datePlan,
  onRestart,
}) => {
  const [step, setStep] = useState<number>(0);
  const [celebrated, setCelebrated] = useState<boolean>(false);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState<boolean>(false);

  // Progressive dramatic suspense timing
  useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 1200); // "I wasn't actually finished."
    const timer2 = setTimeout(() => setStep(2), 2600); // "There's one last question."
    const timer3 = setTimeout(() => setStep(3), 4000); // The question and buttons appear

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleCelebrate = () => {
    setCelebrated(true);
    fireGrandCelebration();
    audioManager.playCelebrationChord();
  };

  const final = config.finalSurprise;

  return (
    <motion.section
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-20 text-center max-w-2xl mx-auto"
    >
      <AnimatePresence mode="wait">
        {!celebrated ? (
          <motion.div
            key="suspense"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col items-center justify-center"
          >
            {/* Step 0: "Wait..." */}
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="font-serif text-3xl sm:text-5xl text-[#1A1A1A] font-light mb-4"
            >
              {final.intro1}
            </motion.span>

            {/* Step 1: "I wasn't actually finished." */}
            {step >= 1 && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="font-serif italic text-xl sm:text-2xl text-[#1A1A1A]/70 mb-6"
              >
                {final.intro2}
              </motion.p>
            )}

            {/* Step 2: "There's one last question." */}
            {step >= 2 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2 mb-8"
              >
                <span className="w-8 h-px bg-[#1A1A1A]/20" />
                <Sparkles className="w-4 h-4 text-[#6D071A]" />
                <span className="w-8 h-px bg-[#1A1A1A]/20" />
              </motion.div>
            )}

            {/* Step 3: The question and buttons */}
            {step >= 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-[#1A1A1A]/10 shadow-xl shadow-black/5"
              >
                <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1A1A1A] font-normal mb-8 leading-snug">
                  {final.question}
                </h2>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <motion.button
                    id="final-yes-btn"
                    onClick={handleCelebrate}
                    variants={buttonPress}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-[#6D071A] text-white font-medium text-base sm:text-lg shadow-xl shadow-[#6D071A]/20 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  >
                    <span>{final.yesButtonText}</span>
                    <Heart className="w-5 h-5 fill-white" />
                  </motion.button>

                  <motion.button
                    id="final-obviously-btn"
                    onClick={handleCelebrate}
                    variants={buttonPress}
                    whileHover="hover"
                    whileTap="tap"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-full bg-white text-[#1A1A1A] font-medium text-base sm:text-lg border border-[#1A1A1A]/15 hover:bg-black/5 active:scale-95 transition-all cursor-pointer shadow-xs"
                  >
                    <span>{final.altButtonText}</span>
                    <Sparkles className="w-5 h-5 text-[#6D071A]" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ) : (
          /* Celebrated State */
          <motion.div
            key="celebration"
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col items-center justify-center"
          >
            {/* Glowing Heart */}
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-[#FDE2E4]/60 border border-[#E5989B]/40 p-1 shadow-xl shadow-[#6D071A]/15 mb-8 flex items-center justify-center"
            >
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center shadow-xs">
                <Heart className="w-14 h-14 sm:w-18 sm:h-18 text-[#6D071A] fill-[#6D071A]" />
              </div>
            </motion.div>

            <motion.h1
              variants={slideUp}
              className="font-serif text-3xl sm:text-5xl text-[#1A1A1A] font-normal tracking-tight mb-4"
            >
              {final.finalTitle}
            </motion.h1>

            <motion.p
              variants={slideUp}
              className="font-serif italic text-xl sm:text-2xl text-[#6D071A] font-medium mb-3 max-w-lg leading-relaxed"
            >
              &ldquo;{final.finalMessage}&rdquo;
            </motion.p>

            <motion.p
              variants={slideUp}
              className="text-sm sm:text-base text-[#1A1A1A]/60 mb-10 max-w-md font-light"
            >
              {final.finalSubtext}
            </motion.p>

            {/* Action buttons & Easter egg */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
              <button
                id="easter-egg-btn"
                onClick={() => setIsEasterEggOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-[#1A1A1A]/80 border border-[#1A1A1A]/15 hover:bg-black/5 text-sm font-medium transition-all cursor-pointer shadow-xs"
              >
                <Scroll className="w-4 h-4 text-[#6D071A]" />
                <span>Wait... what&apos;s this? 📜</span>
              </button>

              <button
                id="celebration-restart-btn"
                onClick={onRestart}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#6D071A] text-white hover:bg-[#580514] text-sm font-medium transition-all cursor-pointer shadow-md shadow-[#6D071A]/20"
              >
                <RotateCcw className="w-4 h-4 text-white" />
                <span>Relive the Story</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Easter Egg Agreement Modal */}
      <EasterEggModal
        isOpen={isEasterEggOpen}
        onClose={() => setIsEasterEggOpen(false)}
        config={config}
      />
    </motion.section>
  );
};
