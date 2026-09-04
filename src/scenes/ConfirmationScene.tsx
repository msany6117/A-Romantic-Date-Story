import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Mail, Clock } from 'lucide-react';
import { SiteConfig, DatePlan } from '../types';
import { pageTransition, slideUp, buttonPress } from '../animations/variants';
import { fireGrandCelebration } from '../utils/confetti';
import { audioManager } from '../utils/audio';

interface ConfirmationSceneProps {
  config: SiteConfig;
  datePlan: DatePlan;
  onNext: () => void;
}

export const ConfirmationScene: React.FC<ConfirmationSceneProps> = ({
  config,
  datePlan,
  onNext,
}) => {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isPast: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    // Fire celebratory confetti burst
    fireGrandCelebration();
    audioManager.playCelebrationChord();

    // Calculate target timestamp
    const computeCountdown = () => {
      if (!datePlan.date) {
        // Default to tomorrow 7 PM if not chosen
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(19, 0, 0, 0);
        return tomorrow.getTime();
      }

      // Parse time string e.g. "7:00 PM"
      const dateParts = datePlan.date.split('-');
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1;
      const day = parseInt(dateParts[2], 10);

      let hours = 19;
      let minutes = 0;
      if (datePlan.time) {
        const match = datePlan.time.match(/(\d+):(\d+)\s*(AM|PM)?/i);
        if (match) {
          hours = parseInt(match[1], 10);
          minutes = parseInt(match[2], 10);
          const period = match[3]?.toUpperCase();
          if (period === 'PM' && hours < 12) hours += 12;
          if (period === 'AM' && hours === 12) hours = 0;
        }
      }

      const target = new Date(year, month, day, hours, minutes, 0);
      return target.getTime();
    };

    const targetTime = computeCountdown();

    const updateTimer = () => {
      const now = Date.now();
      const diff = targetTime - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [datePlan.date, datePlan.time]);

  return (
    <motion.section
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-20 text-center max-w-2xl mx-auto"
    >
      {/* Expanding Heart Animation */}
      <motion.div
        initial={{ scale: 0.2, opacity: 0 }}
        animate={{ scale: [0.2, 1.25, 1], opacity: 1 }}
        transition={{ duration: 1.2, times: [0, 0.6, 1], ease: 'easeOut' }}
        className="relative mb-6"
      >
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#FDE2E4]/60 border border-[#E5989B]/40 flex items-center justify-center mx-auto shadow-xl shadow-[#6D071A]/10">
          <Heart className="w-12 h-12 sm:w-14 sm:h-14 text-[#6D071A] fill-[#6D071A] animate-pulse" />
        </div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          className="absolute -inset-2 rounded-full border border-dashed border-[#6D071A]/20 pointer-events-none"
        />
      </motion.div>

      {/* Main Message */}
      <motion.h1
        variants={slideUp}
        className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1A1A1A] font-normal tracking-tight mb-3"
      >
        It&apos;s a date. ❤️
      </motion.h1>

      <motion.p
        variants={slideUp}
        className="text-base sm:text-xl text-[#1A1A1A]/70 font-light mb-8 max-w-md mx-auto"
      >
        I&apos;ll be counting every single minute until I get to see you,{' '}
        <span className="font-medium text-[#1A1A1A]">{config.herName}</span>.
      </motion.p>

      {/* Countdown Module */}
      <motion.div
        variants={slideUp}
        className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#1A1A1A]/10 mb-10 shadow-xl shadow-black/5 text-[#1A1A1A]"
      >
        <div className="flex items-center justify-center gap-2 mb-4 text-xs tracking-widest uppercase font-mono text-[#B5838D]">
          <Clock className="w-3.5 h-3.5 text-[#6D071A]" />
          <span>Countdown to Our Date</span>
        </div>

        {timeLeft.isPast ? (
          <div className="py-3 text-base sm:text-lg font-serif italic text-[#6D071A]">
            ✨ That date has already arrived. ❤️
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-[#FDFCFB] rounded-2xl p-3 border border-[#1A1A1A]/10 shadow-xs">
              <span className="font-mono text-2xl sm:text-3xl font-medium text-[#1A1A1A] block">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-[#B5838D] uppercase tracking-wider font-mono">
                Days
              </span>
            </div>
            <div className="bg-[#FDFCFB] rounded-2xl p-3 border border-[#1A1A1A]/10 shadow-xs">
              <span className="font-mono text-2xl sm:text-3xl font-medium text-[#1A1A1A] block">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-[#B5838D] uppercase tracking-wider font-mono">
                Hours
              </span>
            </div>
            <div className="bg-[#FDFCFB] rounded-2xl p-3 border border-[#1A1A1A]/10 shadow-xs">
              <span className="font-mono text-2xl sm:text-3xl font-medium text-[#1A1A1A] block">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-[#B5838D] uppercase tracking-wider font-mono">
                Mins
              </span>
            </div>
            <div className="bg-[#FDFCFB] rounded-2xl p-3 border border-[#1A1A1A]/10 shadow-xs">
              <span className="font-mono text-2xl sm:text-3xl font-medium text-[#6D071A] block">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] sm:text-xs text-[#B5838D] uppercase tracking-wider font-mono">
                Secs
              </span>
            </div>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-[#1A1A1A]/10 text-xs text-[#1A1A1A]/60 flex items-center justify-center gap-1.5 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-[#6D071A]" />
          <span>
            {datePlan.formattedDate} at {datePlan.time}
          </span>
        </div>
      </motion.div>

      {/* Button to Love Letter */}
      <motion.button
        id="open-love-letter-btn"
        onClick={() => {
          audioManager.playChime(659.25);
          onNext();
        }}
        variants={buttonPress}
        whileHover="hover"
        whileTap="tap"
        className="inline-flex items-center justify-center gap-2 px-10 sm:px-12 py-4 sm:py-5 rounded-full bg-[#6D071A] text-white font-medium text-base sm:text-lg shadow-xl shadow-[#6D071A]/20 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
      >
        <Mail className="w-5 h-5" />
        <span>I have a letter for you... ✉️</span>
      </motion.button>
    </motion.section>
  );
};
