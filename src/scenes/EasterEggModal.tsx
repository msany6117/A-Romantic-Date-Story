import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SiteConfig } from '../types';
import { fireHeartConfetti } from '../utils/confetti';
import { audioManager } from '../utils/audio';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
}

export const EasterEggModal: React.FC<EasterEggModalProps> = ({
  isOpen,
  onClose,
  config,
}) => {
  const [agreed, setAgreed] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleAgree = () => {
    setAgreed(true);
    fireHeartConfetti();
    audioManager.playCelebrationChord();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 15 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-[#1A1A1A]/10 overflow-hidden flex flex-col max-h-[90vh] relative text-[#1A1A1A]"
      >
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#1A1A1A]/10 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FDE2E4]/60 flex items-center justify-center text-[#6D071A]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-medium text-[#1A1A1A]">
                {config.agreement.title}
              </h3>
              <p className="text-[11px] text-[#1A1A1A]/50 font-mono">
                {config.agreement.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#1A1A1A]/60 hover:bg-black/5 cursor-pointer"
            aria-label="Close agreement"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1 text-left">
          <div className="bg-[#FDFCFB] rounded-2xl p-4 border border-[#1A1A1A]/10 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-[#B5838D] border-b border-[#1A1A1A]/10 pb-2">
              <span>PARTIES: {config.myName} & {config.herName}</span>
              <span className="text-[#6D071A] font-semibold">CONFIDENTIAL ❤️</span>
            </div>

            <ol className="space-y-2.5 text-xs sm:text-sm text-[#1A1A1A]/80 list-decimal list-inside font-normal">
              {config.agreement.terms.map((term, idx) => (
                <li key={idx} className="leading-relaxed pl-1">
                  <span>{term}</span>
                </li>
              ))}
            </ol>
          </div>

          <AnimatePresence>
            {agreed && (
              <motion.div
                initial={{ scale: 0.8, rotate: -6, opacity: 0 }}
                animate={{ scale: 1, rotate: -2, opacity: 1 }}
                className="p-4 rounded-2xl bg-[#FDE2E4]/50 border border-dashed border-[#6D071A]/40 text-center"
              >
                <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold text-[#6D071A] uppercase font-mono">
                  <CheckCircle2 className="w-4 h-4 text-[#6D071A]" />
                  OFFICIALLY RATIFIED & STAMPED WITH LOVE
                </div>
                <p className="text-xs text-[#6D071A] mt-1 font-serif italic">
                  Signed by {config.herName} on {new Date().toLocaleDateString()}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-6 border-t border-[#1A1A1A]/10 bg-[#FDFCFB] flex items-center justify-between">
          <span className="text-[11px] text-[#1A1A1A]/50 italic">
            *100% legally binding in our universe
          </span>

          {!agreed ? (
            <button
              onClick={handleAgree}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#6D071A] text-white text-xs sm:text-sm font-medium shadow-md shadow-[#6D071A]/20 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            >
              <Heart className="w-3.5 h-3.5 fill-white" />
              <span>{config.agreement.confirmText}</span>
            </button>
          ) : (
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-full bg-white text-[#1A1A1A] border border-[#1A1A1A]/15 text-xs font-medium hover:bg-black/5 cursor-pointer"
            >
              Close Agreement
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};
