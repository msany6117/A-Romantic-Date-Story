import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Heart, Calendar, Image as ImageIcon } from 'lucide-react';
import { SiteConfig, MemoryItem } from '../types';
import { pageTransition, slideUp, buttonPress } from '../animations/variants';
import { audioManager } from '../utils/audio';

interface MemorySceneProps {
  config: SiteConfig;
  onNext: () => void;
}

export const MemoryScene: React.FC<MemorySceneProps> = ({ config, onNext }) => {
  const memories = config.memorySection.items;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const currentMemory = memories[currentIndex] || memories[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : memories.length - 1));
    audioManager.playChime(523.25);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < memories.length - 1 ? prev + 1 : 0));
    audioManager.playChime(659.25);
  };

  const handleFinish = () => {
    audioManager.playChime(783.99);
    onNext();
  };

  return (
    <motion.section
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-20 text-center max-w-3xl mx-auto"
    >
      {/* Title & Subtitle */}
      <motion.div variants={slideUp} className="mb-8 sm:mb-10">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FDE2E4]/60 text-[#6D071A] text-xs font-semibold tracking-wider uppercase mb-3 border border-[#E5989B]/30">
          <Heart className="w-3.5 h-3.5 fill-[#6D071A] text-[#6D071A]" />
          Chapter Three: Sweet Memories
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] font-normal tracking-tight">
          {config.memorySection.title}
        </h2>
        <p className="text-sm sm:text-base text-[#1A1A1A]/60 mt-2 max-w-md mx-auto">
          {config.memorySection.subtitle}
        </p>
      </motion.div>

      {/* Polaroid Memory Card Showcase */}
      <div className="relative w-full max-w-md mx-auto mb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentMemory.id}
            initial={{ opacity: 0, scale: 0.94, rotate: (currentMemory.rotation || 0) * 1.5 }}
            animate={{ opacity: 1, scale: 1, rotate: currentMemory.rotation || 0 }}
            exit={{ opacity: 0, scale: 0.94, rotate: -(currentMemory.rotation || 0) * 1.5 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="bg-white p-5 sm:p-6 rounded-2xl shadow-xl shadow-black/5 border border-[#1A1A1A]/10 text-left transform transition-transform"
          >
            {/* Minimalist washi detail */}
            <div className="w-20 h-4 bg-[#FDE2E4]/80 rounded-xs mx-auto -mt-7 mb-4 shadow-2xs rotate-1" />

            {/* Photo frame */}
            <div className="relative aspect-4/3 w-full rounded-xl overflow-hidden bg-[#FAF3F0] mb-4 border border-[#1A1A1A]/5">
              {imageError[currentMemory.id] ? (
                // Elegant fallback when image fails to load
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-tr from-[#FDE2E4]/40 to-[#FAF4F2]">
                  <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mb-3 shadow-xs">
                    <ImageIcon className="w-6 h-6 text-[#6D071A]" />
                  </div>
                  <span className="font-serif font-normal text-[#1A1A1A] text-base">
                    {currentMemory.title}
                  </span>
                  <span className="text-xs text-[#B5838D] mt-1 italic">
                    &ldquo;{currentMemory.description}&rdquo;
                  </span>
                </div>
              ) : (
                <img
                  src={currentMemory.image}
                  alt={currentMemory.title}
                  onError={() => setImageError((prev) => ({ ...prev, [currentMemory.id]: true }))}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              )}
            </div>

            {/* Memory caption & metadata */}
            <div className="px-1 py-1">
              <div className="flex items-center justify-between text-xs text-[#1A1A1A]/40 mb-1 font-mono">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-[#B5838D]" />
                  {currentMemory.date}
                </span>
                <span className="font-semibold text-[#6D071A]">
                  {currentIndex + 1} of {memories.length}
                </span>
              </div>
              <h3 className="font-serif text-xl font-medium text-[#1A1A1A] mb-1.5">
                {currentMemory.title}
              </h3>
              <p className="text-sm text-[#1A1A1A]/70 leading-relaxed font-light">
                {currentMemory.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Previous & Next arrows */}
        <button
          onClick={handlePrev}
          className="absolute -left-4 sm:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-[#1A1A1A] border border-[#1A1A1A]/10 shadow-md flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer z-20"
          aria-label="Previous memory"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute -right-4 sm:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-[#1A1A1A] border border-[#1A1A1A]/10 shadow-md flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer z-20"
          aria-label="Next memory"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Pagination dots */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {memories.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              currentIndex === idx ? 'w-6 bg-[#6D071A]' : 'w-2 bg-[#1A1A1A]/15 hover:bg-[#1A1A1A]/30'
            }`}
            aria-label={`Go to memory ${idx + 1}`}
          />
        ))}
      </div>

      {/* Next Step Button */}
      <motion.button
        id="plan-date-btn"
        onClick={handleFinish}
        variants={buttonPress}
        whileHover="hover"
        whileTap="tap"
        className="inline-flex items-center justify-center gap-2 px-10 sm:px-12 py-4 sm:py-5 rounded-full bg-[#6D071A] text-white font-medium text-base sm:text-lg shadow-xl shadow-[#6D071A]/20 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
      >
        <span>Ready to plan our date</span>
        <Heart className="w-4 h-4 fill-white" />
      </motion.button>
    </motion.section>
  );
};
