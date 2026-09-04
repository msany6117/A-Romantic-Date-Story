import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { SiteConfig } from '../types';
import { pageTransition, slideUp, buttonPress } from '../animations/variants';
import { fireHeartConfetti } from '../utils/confetti';
import { audioManager } from '../utils/audio';

interface ProposalSceneProps {
  config: SiteConfig;
  onAccept: () => void;
}

export const ProposalScene: React.FC<ProposalSceneProps> = ({ config, onAccept }) => {
  const [noCount, setNoCount] = useState<number>(0);
  const [noOffset, setNoOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [surrendered, setSurrendered] = useState<boolean>(false);
  const [isAccepted, setIsAccepted] = useState<boolean>(false);

  const maxNo = config.maxNoClicksBeforeSurrender || 6;

  const handleNoInteraction = () => {
    const nextCount = noCount + 1;
    setNoCount(nextCount);
    audioManager.playChime(349.23); // Playful lower soft tone

    if (nextCount >= maxNo) {
      setSurrendered(true);
      setNoOffset({ x: 0, y: 0 });
      return;
    }

    // Playful small dodge offset within bounds
    const randomX = (Math.random() - 0.5) * 160;
    const randomY = (Math.random() - 0.5) * 80;
    setNoOffset({ x: randomX, y: randomY });
  };

  const handleYes = () => {
    if (isAccepted) return;
    setIsAccepted(true);
    fireHeartConfetti();
    audioManager.playCelebrationChord();

    setTimeout(() => {
      onAccept();
    }, 850);
  };

  // Current cheeky message for NO button
  const currentNoMessage = surrendered
    ? 'Okay okay... YES! ❤️'
    : config.noButtonMessages[noCount % config.noButtonMessages.length] || 'No 🙈';

  // Yes button scale grows with each "No" attempt
  const yesScale = Math.min(1 + noCount * 0.12, 1.4);

  return (
    <motion.section
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-16 text-center max-w-2xl mx-auto"
    >
      <div className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-14 shadow-xl shadow-black/5 border border-[#1A1A1A]/5 relative overflow-hidden">
        
        {/* Visual proposal illustration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="relative mb-8 inline-block"
        >
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#FDE2E4]/50 flex items-center justify-center mx-auto border border-[#E5989B]/30">
            <motion.div
              animate={
                isAccepted
                  ? { scale: [1, 1.35, 1], rotate: [0, 10, -10, 0] }
                  : { scale: [1, 1.08, 1] }
              }
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
              <Heart className="w-12 h-12 sm:w-14 sm:h-14 text-[#6D071A] fill-[#6D071A]" />
            </motion.div>
          </div>
          <div className="absolute -top-1 -right-1">
            <Sparkles className="w-5 h-5 text-[#B5838D] animate-spin" style={{ animationDuration: '8s' }} />
          </div>
        </motion.div>

        {/* Clean Minimalism Pre-heading & Main Question */}
        <div className="text-center mb-8">
          <p className="text-[#B5838D] italic font-serif text-lg sm:text-xl mb-3">
            I have one tiny question...
          </p>
          <motion.h1
            variants={slideUp}
            className="text-4xl sm:text-5xl md:text-[56px] font-serif leading-[1.1] text-[#1A1A1A] max-w-xl mx-auto mb-4 tracking-tight font-normal"
          >
            {config.proposalQuestion.includes('date') ? (
              <>
                {config.proposalQuestion.split('date')[0]}
                <span className="text-[#6D071A]">date</span>
                {config.proposalQuestion.split('date')[1]}
              </>
            ) : (
              config.proposalQuestion
            )}
          </motion.h1>
          <p className="text-xs sm:text-sm text-[#1A1A1A]/40 font-mono uppercase tracking-widest mt-2">
            Choose wisely, my heart is in your hands
          </p>
        </div>

        {/* Playful Banner if user is repeatedly clicking NO */}
        <AnimatePresence>
          {surrendered ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3 bg-[#FDE2E4]/60 text-[#6D071A] rounded-2xl text-xs sm:text-sm font-medium border border-[#E5989B]/30"
            >
              Okay okay... I&apos;ll stop teasing you. Just say yes! 🥺❤️
            </motion.div>
          ) : noCount > 0 ? (
            <motion.div
              key={noCount}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mb-6 text-xs sm:text-sm font-medium text-[#B5838D]"
            >
              Attempt {noCount}: Don&apos;t be shy!
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Buttons Container */}
        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-6 min-h-[120px]">
          {/* YES Button */}
          <motion.button
            id="proposal-yes-btn"
            onClick={handleYes}
            variants={buttonPress}
            whileHover="hover"
            whileTap="tap"
            style={{ transformOrigin: 'center' }}
            animate={{ scale: isAccepted ? 1.15 : yesScale }}
            className="group relative px-10 sm:px-12 py-4 sm:py-5 bg-[#6D071A] text-white rounded-full text-base sm:text-lg font-medium tracking-wide shadow-xl shadow-[#6D071A]/20 transition-transform hover:scale-105 active:scale-95 cursor-pointer z-20 flex items-center justify-center gap-2.5"
          >
            <span>YES, OF COURSE</span>
            <Heart className="w-5 h-5 fill-white text-white" />
          </motion.button>

          {/* NO Button with playful evasion */}
          <motion.div
            animate={{ x: noOffset.x, y: noOffset.y }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="z-10"
          >
            <motion.button
              id="proposal-no-btn"
              onClick={surrendered ? handleYes : handleNoInteraction}
              onMouseEnter={noCount > 1 && !surrendered ? handleNoInteraction : undefined}
              className={`px-10 sm:px-12 py-4 sm:py-5 rounded-full text-base sm:text-lg font-medium transition-all duration-200 cursor-pointer ${
                surrendered
                  ? 'bg-[#E5989B] text-white shadow-md hover:bg-[#B5838D]'
                  : 'border border-[#1A1A1A]/15 text-[#1A1A1A]/70 bg-white/70 hover:bg-black/5 hover:text-[#1A1A1A]'
              }`}
            >
              <span>{currentNoMessage}</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Escape hatch for extra comfort */}
        {noCount > 2 && !surrendered && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8">
            <button
              onClick={handleYes}
              className="text-xs text-[#B5838D] hover:text-[#6D071A] underline underline-offset-4 cursor-pointer transition-colors"
            >
              Okay, I changed my mind... YES! ❤️
            </button>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};
