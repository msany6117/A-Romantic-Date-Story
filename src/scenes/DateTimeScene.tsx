import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { SiteConfig, DatePlan } from '../types';
import { pageTransition, slideUp, buttonPress } from '../animations/variants';
import { audioManager } from '../utils/audio';

interface DateTimeSceneProps {
  config: SiteConfig;
  datePlan: DatePlan;
  onUpdatePlan: (partial: Partial<DatePlan>) => void;
  onNext: () => void;
}

export const DateTimeScene: React.FC<DateTimeSceneProps> = ({
  config,
  datePlan,
  onUpdatePlan,
  onNext,
}) => {
  const today = new Date();
  const [viewDate, setViewDate] = useState<Date>(() => {
    return datePlan.date ? new Date(datePlan.date) : new Date();
  });
  const [customTimeInput, setCustomTimeInput] = useState(false);

  const selectedDateObj = datePlan.date ? new Date(datePlan.date) : null;

  // Month navigation
  const prevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Calendar math
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handleSelectDate = (dayNumber: number) => {
    const chosen = new Date(year, month, dayNumber, 12, 0, 0);
    // Format YYYY-MM-DD
    const isoString = chosen.toISOString().split('T')[0];
    const formatted = chosen.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    onUpdatePlan({
      date: isoString,
      formattedDate: formatted,
    });
    audioManager.playChime(659.25);
  };

  const handleSelectTime = (timeStr: string) => {
    onUpdatePlan({ time: timeStr });
    audioManager.playChime(587.33);
  };

  const isDateSelected = (day: number) => {
    if (!selectedDateObj) return false;
    return (
      selectedDateObj.getFullYear() === year &&
      selectedDateObj.getMonth() === month &&
      selectedDateObj.getDate() === day
    );
  };

  const isDateInPast = (day: number) => {
    const checkDate = new Date(year, month, day, 23, 59, 59);
    return checkDate < today;
  };

  const canContinue = !!datePlan.date && !!datePlan.time;

  return (
    <motion.section
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 py-20 text-center max-w-2xl mx-auto"
    >
      {/* Heading */}
      <motion.div variants={slideUp} className="mb-8">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FDE2E4]/60 text-[#6D071A] text-xs font-semibold tracking-wider uppercase mb-2 border border-[#E5989B]/30">
          <CalendarIcon className="w-3.5 h-3.5 text-[#6D071A]" />
          Chapter Three: The Schedule
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] font-normal tracking-tight">
          {config.planning.title}
        </h2>
        <p className="text-sm sm:text-base text-[#1A1A1A]/60 mt-1">
          {config.planning.subtitle}
        </p>
      </motion.div>

      {/* Date Picker Card */}
      <div className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/5 border border-[#1A1A1A]/10 mb-8 text-left">
        <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#1A1A1A]/10">
          <h3 className="font-serif text-lg font-medium text-[#1A1A1A] flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 text-[#6D071A]" />
            {monthNames[month]} {year}
          </h3>
          <div className="flex items-center gap-1">
            <button
              onClick={prevMonth}
              className="p-1.5 rounded-lg hover:bg-black/5 text-[#1A1A1A] cursor-pointer transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextMonth}
              className="p-1.5 rounded-lg hover:bg-black/5 text-[#1A1A1A] cursor-pointer transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Days Header */}
        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {dayNames.map((d) => (
            <span key={d} className="text-xs font-semibold text-[#B5838D] py-1 font-mono">
              {d}
            </span>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1.5 text-center">
          {/* Leading empty spaces */}
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="h-9" />
          ))}

          {/* Actual days */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const past = isDateInPast(dayNum);
            const selected = isDateSelected(dayNum);

            return (
              <button
                key={dayNum}
                disabled={past}
                onClick={() => handleSelectDate(dayNum)}
                className={`h-9 w-9 sm:h-10 sm:w-10 mx-auto rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center relative cursor-pointer ${
                  past
                    ? 'text-gray-300 cursor-not-allowed'
                    : selected
                    ? 'bg-[#6D071A] text-white font-semibold shadow-md shadow-[#6D071A]/25 scale-105'
                    : 'text-[#1A1A1A] hover:bg-[#FDE2E4]/60 hover:text-[#6D071A]'
                }`}
              >
                {dayNum}
                {selected && (
                  <span className="absolute -bottom-1 w-1 h-1 bg-white rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Date Summary pill */}
        {datePlan.formattedDate && (
          <div className="mt-5 p-2.5 rounded-xl bg-[#FDE2E4]/40 border border-[#E5989B]/30 text-center text-xs font-medium text-[#6D071A]">
            Selected: <span className="font-semibold">{datePlan.formattedDate}</span>
          </div>
        )}
      </div>

      {/* Time Picker Card */}
      <div className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl shadow-black/5 border border-[#1A1A1A]/10 mb-8 text-left">
        <h3 className="font-serif text-lg font-medium text-[#1A1A1A] mb-1 flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#6D071A]" />
          {config.planning.timePrompt}
        </h3>
        <p className="text-xs text-[#1A1A1A]/50 mb-4 font-mono">
          Select what hour works best for you
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-4">
          {config.planning.availableTimes.map((t) => {
            const isSelected = datePlan.time === t;
            return (
              <button
                key={t}
                onClick={() => handleSelectTime(t)}
                className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 border text-center cursor-pointer ${
                  isSelected
                    ? 'bg-[#6D071A] text-white border-[#6D071A] shadow-md shadow-[#6D071A]/20 scale-102'
                    : 'bg-white text-[#1A1A1A]/80 border-[#1A1A1A]/10 hover:bg-black/5'
                }`}
              >
                {t}
              </button>
            );
          })}

          {/* Custom time button / input */}
          <button
            onClick={() => setCustomTimeInput(true)}
            className={`py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 border text-center cursor-pointer ${
              customTimeInput || (!config.planning.availableTimes.includes(datePlan.time) && datePlan.time)
                ? 'bg-[#6D071A] text-white border-[#6D071A]'
                : 'bg-white text-[#1A1A1A]/80 border-[#1A1A1A]/10 hover:bg-black/5'
            }`}
          >
            Custom Time...
          </button>
        </div>

        {customTimeInput && (
          <div className="mt-3 flex gap-2">
            <input
              type="text"
              placeholder="e.g. 7:30 PM"
              value={datePlan.time}
              onChange={(e) => onUpdatePlan({ time: e.target.value })}
              className="px-3 py-2 rounded-xl border border-[#1A1A1A]/15 bg-white text-xs text-[#1A1A1A] flex-1 focus:outline-hidden focus:ring-1 focus:ring-[#6D071A]"
            />
          </div>
        )}
      </div>

      {/* Continue Button */}
      <motion.button
        id="confirm-datetime-btn"
        disabled={!canContinue}
        onClick={() => {
          audioManager.playChime(783.99);
          onNext();
        }}
        variants={buttonPress}
        whileHover={canContinue ? 'hover' : undefined}
        whileTap={canContinue ? 'tap' : undefined}
        className={`inline-flex items-center justify-center gap-2 px-10 sm:px-12 py-4 sm:py-5 rounded-full font-medium text-base sm:text-lg transition-all ${
          canContinue
            ? 'bg-[#6D071A] text-white shadow-xl shadow-[#6D071A]/20 hover:scale-105 active:scale-95 cursor-pointer'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
        }`}
      >
        <span>Next: Where should we go?</span>
        <Heart className="w-4 h-4 fill-current" />
      </motion.button>
    </motion.section>
  );
};
