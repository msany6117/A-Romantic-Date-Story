import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { SiteConfig } from '../types';
import { pageTransition, slideUp, buttonPress } from '../animations/variants';
import { fireHeartConfetti } from '../utils/confetti';
import { audioManager } from '../utils/audio';

interface ProposalSceneProps {
  config: SiteConfig;
  onAccept: () => void;
}

// Safe evasion coordinates that guarantee:
// 1. Desktop: X is always positive (+35px to +140px), so it only moves to the right/down, NEVER left towards YES button.
// 2. Mobile: Y is always positive (+30px to +65px), so it only moves downwards, NEVER up towards YES button.
const DESKTOP_SAFE_OFFSETS = [
  { x: 85, y: 15 },
  { x: 130, y: 35 },
  { x: 45, y: 50 },
  { x: 110, y: -10 },
  { x: 65, y: 40 },
  { x: 140, y: 10 },
  { x: 35, y: 45 },
  { x: 105, y: 55 },
];

const MOBILE_SAFE_OFFSETS = [
  { x: 45, y: 35 },
  { x: -45, y: 35 },
  { x: 30, y: 65 },
  { x: -30, y: 65 },
  { x: 0, y: 60 },
  { x: 50, y: 45 },
  { x: -50, y: 45 },
];

export const ProposalScene: React.FC<ProposalSceneProps> = ({ config, onAccept }) => {
  const [posIndex, setPosIndex] = useState<number>(0);
  const [isAccepted, setIsAccepted] = useState<boolean>(false);
  const lastDodgeTime = useRef<number>(0);

  // Safe evasion spots:
  // Desktop: Only moves right/down/angles to the right, never colliding with YES or title.
  // Mobile: Moves downwards and sideways, never jumping up over YES button.
  const getNextPosition = useCallback((currentIndex: number) => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const desktopPositions = [
      { x: 95, y: 15 },
      { x: 50, y: 55 },
      { x: 135, y: -10 },
      { x: 70, y: 35 },
      { x: 120, y: 60 },
      { x: 40, y: -20 },
      { x: 145, y: 20 },
      { x: 80, y: -15 },
    ];
    const mobilePositions = [
      { x: 50, y: 35 },
      { x: -50, y: 35 },
      { x: 40, y: 65 },
      { x: -40, y: 65 },
      { x: 55, y: 50 },
      { x: -55, y: 50 },
      { x: 0, y: 70 },
    ];

    const positions = isMobile ? mobilePositions : desktopPositions;
    const nextIdx = (currentIndex + 1) % positions.length;
    return { pos: positions[nextIdx], nextIndex: nextIdx };
  }, []);

  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Swift & smooth dodge: triggers whenever cursor or finger attempts to touch the button
  const handleDodge = useCallback((e?: React.SyntheticEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const now = Date.now();
    // 100ms cooldown prevents rapid re-entry jitter while allowing instant sequential jumps
    if (now - lastDodgeTime.current < 100) return;
    lastDodgeTime.current = now;

    setPosIndex((prevIdx) => {
      const { pos, nextIndex } = getNextPosition(prevIdx);
      setCoords(pos);
      audioManager.playChime(380 + (nextIndex % 6) * 35);
      return nextIndex;
    });
  }, [getNextPosition]);

  const handleYes = () => {
    if (isAccepted) return;
    setIsAccepted(true);
    fireHeartConfetti();
    audioManager.playCelebrationChord();

    setTimeout(() => {
      onAccept();
    }, 700);
  };

  return (
    <motion.section
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-16 text-center max-w-2xl mx-auto"
    >
      <div className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-14 pb-12 sm:pb-16 shadow-xl shadow-black/5 border border-[#1A1A1A]/5 relative overflow-hidden select-none">
        
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
        <div className="text-center mb-10">
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

        {/* Buttons Container with stable layout footprint */}
        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 min-h-[90px] pb-4">
          {/* YES Button - perfectly stable, elegant compact size */}
          <motion.button
            id="proposal-yes-btn"
            onClick={handleYes}
            variants={buttonPress}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            animate={isAccepted ? { scale: 1.1 } : { scale: 1 }}
            className="group relative px-7 sm:px-8 py-3 sm:py-3.5 bg-[#6D071A] text-white rounded-full text-sm sm:text-base font-medium tracking-wide shadow-md shadow-[#6D071A]/20 cursor-pointer z-20 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>YES, OF COURSE</span>
            <Heart className="w-4 h-4 fill-white text-white" />
          </motion.button>

          {/* NO Button Slot - fixed dimensional wrapper prevents any layout shift */}
          <div className="relative w-28 sm:w-32 h-11 sm:h-12 flex items-center justify-center">
            <motion.div
              animate={{ x: coords.x, y: coords.y }}
              transition={{
                type: 'spring',
                stiffness: 450,
                damping: 25,
                mass: 0.7,
              }}
              className="absolute inset-0 z-10 flex items-center justify-center"
            >
              <button
                id="proposal-no-btn"
                tabIndex={-1}
                onMouseEnter={handleDodge}
                onPointerEnter={handleDodge}
                onTouchStart={handleDodge}
                onPointerDown={handleDodge}
                onClick={handleDodge}
                className="w-full h-full rounded-full text-sm sm:text-base font-medium transition-colors border border-[#1A1A1A]/15 text-[#1A1A1A]/70 bg-white/95 hover:bg-black/5 hover:text-[#1A1A1A] cursor-pointer select-none shadow-xs flex items-center justify-center whitespace-nowrap active:scale-95"
              >
                <span>No? 😭</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
