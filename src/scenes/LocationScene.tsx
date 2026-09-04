import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Sparkles, Heart, UtensilsCrossed, Compass } from 'lucide-react';
import { SiteConfig, DatePlan } from '../types';
import { pageTransition, slideUp, buttonPress } from '../animations/variants';
import { audioManager } from '../utils/audio';

interface LocationSceneProps {
  config: SiteConfig;
  datePlan: DatePlan;
  onUpdatePlan: (partial: Partial<DatePlan>) => void;
  onNext: () => void;
}

export const LocationScene: React.FC<LocationSceneProps> = ({
  config,
  datePlan,
  onUpdatePlan,
  onNext,
}) => {
  const [selectedId, setSelectedId] = useState<string>(datePlan.locationId || 'surprise');
  const [customText, setCustomText] = useState<string>(datePlan.customLocation || '');

  const handleSelectOption = (id: string) => {
    setSelectedId(id);
    onUpdatePlan({ locationId: id });
    audioManager.playChime(659.25);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomText(e.target.value);
    onUpdatePlan({ customLocation: e.target.value });
  };

  const handleContinue = () => {
    onUpdatePlan({
      locationId: selectedId,
      customLocation: customText,
    });
    audioManager.playChime(783.99);
    onNext();
  };

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Heart':
        return <Heart className="w-5 h-5 text-[#6D071A]" />;
      case 'UtensilsCrossed':
        return <UtensilsCrossed className="w-5 h-5 text-[#6D071A]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#6D071A]" />;
      default:
        return <Compass className="w-5 h-5 text-[#6D071A]" />;
    }
  };

  return (
    <motion.section
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-20 text-center max-w-2xl mx-auto"
    >
      {/* Title */}
      <motion.div variants={slideUp} className="mb-8">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FDE2E4]/60 text-[#6D071A] text-xs font-semibold tracking-wider uppercase mb-2 border border-[#E5989B]/30">
          <MapPin className="w-3.5 h-3.5 text-[#6D071A]" />
          Chapter Four: The Rendezvous
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] font-normal tracking-tight">
          {config.locations.prompt}
        </h2>
        <p className="text-sm sm:text-base text-[#1A1A1A]/60 mt-1">
          {config.locations.subtitle}
        </p>
      </motion.div>

      {/* Date & Time Recap Pill */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6 text-xs text-[#1A1A1A]/70 font-mono">
        <div className="px-3.5 py-1.5 rounded-full bg-white/90 border border-[#1A1A1A]/10 shadow-xs">
          📅 {datePlan.formattedDate || 'Date selected'}
        </div>
        <div className="px-3.5 py-1.5 rounded-full bg-white/90 border border-[#1A1A1A]/10 shadow-xs">
          🕖 {datePlan.time || 'Time selected'}
        </div>
      </div>

      {/* Location Options Cards */}
      <div className="w-full space-y-3 mb-8 text-left">
        {config.locations.options.map((option) => {
          const isSelected = selectedId === option.id;

          return (
            <div key={option.id}>
              <button
                type="button"
                onClick={() => handleSelectOption(option.id)}
                className={`w-full p-4 sm:p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 text-left cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#6D071A] shadow-md shadow-black/5 ring-1 ring-[#6D071A]'
                    : 'bg-white/80 border-[#1A1A1A]/10 hover:bg-white hover:border-[#1A1A1A]/20 shadow-xs'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-[#FDE2E4]/80 shadow-xs' : 'bg-black/5'
                  }`}
                >
                  {getIcon(option.icon)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-serif text-base sm:text-lg font-medium text-[#1A1A1A]">
                      {option.label}
                    </h4>
                    {isSelected && (
                      <span className="w-2.5 h-2.5 rounded-full bg-[#6D071A]" />
                    )}
                  </div>
                  {option.description && (
                    <p className="text-xs sm:text-sm text-[#1A1A1A]/60 mt-0.5 font-light">
                      {option.description}
                    </p>
                  )}
                </div>
              </button>

              {/* Reveal custom location input */}
              {option.isCustom && isSelected && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 pl-4 pr-1"
                >
                  <input
                    type="text"
                    value={customText}
                    onChange={handleCustomChange}
                    placeholder="Where should we meet? (e.g. That little bakery by the park)"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#6D071A] bg-white text-sm text-[#1A1A1A] focus:outline-hidden focus:ring-2 focus:ring-[#6D071A]/20 shadow-xs"
                    autoFocus
                  />
                </motion.div>
              )}
            </div>
          );
        })}
      </div>

      {/* Review Plan Button */}
      <motion.button
        id="review-plan-btn"
        onClick={handleContinue}
        variants={buttonPress}
        whileHover="hover"
        whileTap="tap"
        className="inline-flex items-center justify-center gap-2 px-10 sm:px-12 py-4 sm:py-5 rounded-full bg-[#6D071A] text-white font-medium text-base sm:text-lg shadow-xl shadow-[#6D071A]/20 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
      >
        <span>Review our plan</span>
        <Heart className="w-4 h-4 fill-white" />
      </motion.button>
    </motion.section>
  );
};
