import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface FloatingHeartsProps {
  sceneIndex: number;
}

export const FloatingHearts: React.FC<FloatingHeartsProps> = ({ sceneIndex }) => {
  // Generate random floating particles once
  const hearts = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      size: Math.floor(Math.random() * 16) + 12, // 12px to 28px
      left: Math.floor(Math.random() * 94) + 3, // 3% to 97%
      bottom: -40,
      duration: Math.random() * 10 + 14, // 14s to 24s
      delay: Math.random() * 12,
      driftX: Math.random() * 60 - 30, // -30px to 30px
      opacity: Math.random() * 0.25 + 0.12, // subtle 0.12 - 0.37
      rotate: Math.random() * 40 - 20,
    }));
  }, []);

  // Subtle ambient backdrop hues based on scene emotion - Clean Minimalism
  const bgTheme = useMemo(() => {
    switch (sceneIndex) {
      case 0: // Intro
        return 'bg-[#FDFCFB]';
      case 1: // Personal intro
        return 'bg-[#FDFCFB]';
      case 2: // Proposal question
        return 'bg-[#FDFCFB]';
      case 3: // Reaction: She said yes!
        return 'bg-[#FDFCFB]';
      case 4: // Date & Time
        return 'bg-[#FDFCFB]';
      case 5: // Location
        return 'bg-[#FDFCFB]';
      case 6: // Date summary
        return 'bg-[#FDFCFB]';
      case 7: // Celebration & Countdown
        return 'bg-gradient-to-b from-[#1A0A10] via-[#2A0E1A] to-[#3B1124]'; // Rich nocturnal burgundy
      case 8: // Love letter
        return 'bg-[#FDFCFB]';
      case 9: // Final surprise
        return 'bg-gradient-to-b from-[#14060C] via-[#240A16] to-[#350F20]';
      default:
        return 'bg-[#FDFCFB]';
    }
  }, [sceneIndex]);

  const isDarkScene = sceneIndex === 7 || sceneIndex === 9;

  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-1000 ${bgTheme}`}
      aria-hidden="true"
    >
      {/* Clean Minimalism Blur Orbs & Watermark Accents */}
      {!isDarkScene ? (
        <>
          <div className="absolute top-20 left-10 w-36 h-36 bg-[#FDE2E4] rounded-full blur-3xl opacity-40 transition-opacity duration-1000" />
          <div className="absolute bottom-20 right-10 w-52 h-52 bg-[#FAD2E1] rounded-full blur-3xl opacity-35 transition-opacity duration-1000" />
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-[#E5989B] rounded-full opacity-25" />
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-[#B5838D] rounded-full opacity-30" />
          <div className="absolute bottom-1/4 left-1/3 w-6 h-6 bg-[#FFB7B2] rounded-full opacity-20" />
          
          {/* Subtle corner watermark heart */}
          <div className="absolute -bottom-10 -left-10 opacity-5 sm:opacity-8 transition-opacity">
            <svg width="400" height="400" viewBox="0 0 200 200" fill="#6D071A">
              <path d="M100 183.5l-14.5-13.2C34 123.6 0 92.8 0 55 0 24.2 24.2 0 55 0c17.4 0 34.1 8.1 45 20.9C110.9 8.1 127.6 0 145 0c30.8 0 55 24.2 55 55 0 37.8-34 6.86-85.5 115.4L100 183.5z" />
            </svg>
          </div>
        </>
      ) : (
        <>
          <div className="absolute top-10 left-10 w-72 h-72 bg-[#6D071A]/30 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#B5838D]/20 rounded-full blur-3xl" />
        </>
      )}

      {/* Floating subtle romantic hearts */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute"
          style={{
            left: `${h.left}%`,
            width: `${h.size}px`,
            height: `${h.size}px`,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: [-20, -1000],
            x: [0, h.driftX, -h.driftX, 0],
            rotate: [h.rotate, h.rotate + 25, h.rotate - 20],
            opacity: [0, h.opacity, h.opacity, 0],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: 'linear',
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill={isDarkScene ? '#FCEAE6' : '#B5838D'}
            className="w-full h-full drop-shadow-xs"
            style={{ opacity: isDarkScene ? 0.35 : 0.35 }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
