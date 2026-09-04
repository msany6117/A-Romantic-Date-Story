import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, ArrowRight, PartyPopper } from 'lucide-react';
import { SiteConfig } from '../types';
import { pageTransition, slideUp, buttonPress } from '../animations/variants';
import { fireHeartConfetti } from '../utils/confetti';
import { audioManager } from '../utils/audio';

interface ReactionSceneProps {
  config: SiteConfig;
  onNext: () => void;
}

export const ReactionScene: React.FC<ReactionSceneProps> = ({ config, onNext }) => {
  const reaction = config.reactionScene || {
    badge: 'A Moment of Pure Joy',
    title: 'Wait, seriously?! You actually said YES?! 🥹',
    subtitle: 'I honestly cannot believe it... I genuinely thought you were going to say no!',
    cardParagraphs: [
      'My heart was pounding so fast while waiting for your answer. To be completely honest, I had prepared myself for you to say no! 🙈',
      'Knowing that you said YES just made my entire world brighter. I promise to make our time together unforgettable.',
    ],
    buttonText: 'Let’s look at our memories →',
  };

  // Trigger celebration on scene reveal
  useEffect(() => {
    fireHeartConfetti();
    audioManager.playCelebrationChord();
  }, []);

  return (
    <motion.section
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-16 text-center max-w-2xl mx-auto"
    >
      <div className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-14 shadow-xl shadow-black/5 border border-[#1A1A1A]/10 relative overflow-hidden">
        {/* Subtle decorative background accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#FDE2E4]/40 to-transparent pointer-events-none rounded-tr-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#FDE2E4]/30 to-transparent pointer-events-none rounded-bl-3xl" />

        {/* Celebration Medallion */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.6, type: 'spring' }}
          className="relative mb-6 inline-block"
        >
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#FDE2E4]/60 flex items-center justify-center mx-auto border border-[#E5989B]/40 shadow-xs">
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 6, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              className="flex items-center justify-center"
            >
              <Heart className="w-12 h-12 sm:w-14 sm:h-14 text-[#6D071A] fill-[#6D071A]" />
            </motion.div>
          </div>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
            className="absolute -top-1 -right-1"
          >
            <Sparkles className="w-6 h-6 text-[#6D071A]" />
          </motion.div>
          <div className="absolute -bottom-1 -left-1">
            <PartyPopper className="w-5 h-5 text-[#B5838D]" />
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div variants={slideUp} className="mb-4">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FDE2E4]/60 text-[#6D071A] text-xs font-semibold tracking-wider uppercase border border-[#E5989B]/30 font-mono">
            <Sparkles className="w-3.5 h-3.5 text-[#6D071A]" />
            {reaction.badge}
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={slideUp}
          className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] font-normal tracking-tight mb-4 leading-tight"
        >
          {reaction.title}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={slideUp}
          className="font-serif italic text-lg sm:text-xl text-[#6D071A] mb-8 max-w-lg mx-auto leading-relaxed"
        >
          &ldquo;{reaction.subtitle}&rdquo;
        </motion.p>

        {/* Message Box */}
        <motion.div
          variants={slideUp}
          className="bg-[#FDFCFB] rounded-2xl p-6 sm:p-8 border border-[#1A1A1A]/10 text-left mb-8 space-y-3.5 relative"
        >
          {reaction.cardParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className="text-sm sm:text-base text-[#1A1A1A]/80 leading-relaxed font-normal"
            >
              {paragraph.replace('{herName}', config.herName).replace('{myName}', config.myName)}
            </p>
          ))}
          <div className="pt-2 flex items-center justify-between border-t border-[#1A1A1A]/5 text-xs text-[#1A1A1A]/50 font-mono">
            <span>Status: Confirmed Date ❤️</span>
            <span>Happiness Level: 1000%</span>
          </div>
        </motion.div>

        {/* Action Button to Next Step */}
        <motion.div variants={slideUp}>
          <motion.button
            id="reaction-next-btn"
            onClick={onNext}
            variants={buttonPress}
            whileHover="hover"
            whileTap="tap"
            className="inline-flex items-center justify-center gap-2.5 px-10 sm:px-12 py-4 sm:py-5 rounded-full bg-[#6D071A] text-white font-medium text-base sm:text-lg shadow-xl shadow-[#6D071A]/20 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
          >
            <span>{reaction.buttonText}</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};
