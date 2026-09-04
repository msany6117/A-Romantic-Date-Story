import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Heart, Edit3, CheckCircle2 } from 'lucide-react';
import { SiteConfig, DatePlan } from '../types';
import { pageTransition, slideUp, buttonPress } from '../animations/variants';
import { audioManager } from '../utils/audio';

interface DateSummarySceneProps {
  config: SiteConfig;
  datePlan: DatePlan;
  onConfirm: () => void;
  onChangeSomething: () => void;
}

export const DateSummaryScene: React.FC<DateSummarySceneProps> = ({
  config,
  datePlan,
  onConfirm,
  onChangeSomething,
}) => {
  // Format location name
  const locationOption = config.locations.options.find((o) => o.id === datePlan.locationId);
  const locationDisplay =
    datePlan.customLocation && datePlan.locationId === 'custom'
      ? datePlan.customLocation
      : locationOption?.label || 'Somewhere special';

  const handleConfirm = () => {
    audioManager.playCelebrationChord();
    onConfirm();
  };

  return (
    <motion.section
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-20 text-center max-w-xl mx-auto"
    >
      {/* Badge */}
      <motion.div variants={slideUp} className="mb-6">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FDE2E4]/60 text-[#6D071A] text-xs font-semibold tracking-wider uppercase mb-2 border border-[#E5989B]/30">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#6D071A]" />
          Chapter Five: Summary
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] font-normal tracking-tight">
          Our Special Date
        </h2>
        <p className="text-sm sm:text-base text-[#1A1A1A]/60 mt-1">
          Everything is set up, just waiting for your final seal.
        </p>
      </motion.div>

      {/* Romantic Ticket / Card */}
      <motion.div
        variants={slideUp}
        className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/5 border border-[#1A1A1A]/10 mb-8 text-left relative overflow-hidden"
      >
        {/* Subtle decorative stamp */}
        <div className="absolute top-5 right-5 text-xs font-mono uppercase tracking-widest text-[#6D071A] border border-dashed border-[#6D071A]/40 px-2.5 py-1 rounded-xs rotate-3">
          Guest: {config.herName}
        </div>

        <div className="space-y-6 pt-2">
          {/* Date Row */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FDE2E4]/60 border border-[#E5989B]/30 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-[#6D071A]" />
            </div>
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-[#B5838D] block">
                When
              </span>
              <span className="font-serif text-lg sm:text-xl font-medium text-[#1A1A1A]">
                {datePlan.formattedDate || 'Upcoming special day'}
              </span>
            </div>
          </div>

          {/* Time Row */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FDE2E4]/60 border border-[#E5989B]/30 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-[#6D071A]" />
            </div>
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-[#B5838D] block">
                Time
              </span>
              <span className="font-serif text-lg sm:text-xl font-medium text-[#1A1A1A]">
                {datePlan.time || '7:00 PM'}
              </span>
            </div>
          </div>

          {/* Location Row */}
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#FDE2E4]/60 border border-[#E5989B]/30 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5 text-[#6D071A]" />
            </div>
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-[#B5838D] block">
                Destination
              </span>
              <span className="font-serif text-lg sm:text-xl font-medium text-[#1A1A1A]">
                {locationDisplay}
              </span>
            </div>
          </div>
        </div>

        {/* Romantic note */}
        <div className="mt-8 pt-5 border-t border-[#1A1A1A]/10 text-center">
          <p className="font-serif italic text-base sm:text-lg text-[#6D071A]">
            &ldquo;Looks like we have a date. ❤️&rdquo;
          </p>
        </div>
      </motion.div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
        <motion.button
          id="confirm-date-btn"
          onClick={handleConfirm}
          variants={buttonPress}
          whileHover="hover"
          whileTap="tap"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 sm:px-12 py-4 sm:py-5 rounded-full bg-[#6D071A] text-white font-medium text-base sm:text-lg shadow-xl shadow-[#6D071A]/20 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        >
          <span>Confirm Our Date</span>
          <Heart className="w-4 h-4 fill-white" />
        </motion.button>

        <button
          id="change-something-btn"
          onClick={onChangeSomething}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-[#1A1A1A]/70 border border-[#1A1A1A]/15 hover:bg-black/5 font-medium text-sm transition-all cursor-pointer shadow-xs"
        >
          <Edit3 className="w-4 h-4 text-[#B5838D]" />
          <span>Change Something</span>
        </button>
      </div>
    </motion.section>
  );
};
