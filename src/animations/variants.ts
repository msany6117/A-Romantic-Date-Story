import { Variants } from 'motion/react';

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 18,
    scale: 0.98,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1], // cinematic cubic-bezier
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    y: -14,
    scale: 0.98,
    filter: 'blur(4px)',
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1, 
    transition: { duration: 0.45, ease: 'easeOut' } 
  },
  exit: { 
    opacity: 0, 
    transition: { duration: 0.25, ease: 'easeIn' } 
  },
};

export const fadeOut: Variants = {
  initial: { opacity: 1 },
  animate: { opacity: 0, transition: { duration: 0.3 } },
};

export const slideUp: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.1, 0.25, 1] 
    } 
  },
  exit: { 
    opacity: 0, 
    y: -12, 
    transition: { duration: 0.25 } 
  },
};

export const slideDown: Variants = {
  initial: { opacity: 0, y: -24 },
  animate: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.45, ease: 'easeOut' } 
  },
  exit: { opacity: 0, y: 12, transition: { duration: 0.25 } },
};

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.88 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      type: 'spring', 
      damping: 22, 
      stiffness: 260 
    } 
  },
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.2 } },
};

export const scaleOut: Variants = {
  initial: { opacity: 1, scale: 1 },
  animate: { opacity: 0, scale: 0.8, transition: { duration: 0.25 } },
};

export const heartPop: Variants = {
  initial: { scale: 0.7, opacity: 0 },
  animate: {
    scale: [0.7, 1.25, 0.95, 1.05, 1],
    opacity: 1,
    transition: {
      duration: 0.7,
      times: [0, 0.35, 0.6, 0.8, 1],
      ease: 'easeOut',
    },
  },
};

export const buttonPress = {
  hover: { scale: 1.03, y: -1 },
  tap: { scale: 0.96, y: 1 },
};

export const cardHover = {
  rest: { 
    scale: 1, 
    y: 0,
    boxShadow: '0 10px 25px -5px rgba(107, 45, 70, 0.05)',
  },
  hover: { 
    scale: 1.025, 
    y: -4,
    boxShadow: '0 20px 30px -10px rgba(107, 45, 70, 0.12)',
    transition: { duration: 0.25, ease: 'easeOut' }
  },
};

export const imageReveal: Variants = {
  initial: { opacity: 0, scale: 1.08, filter: 'blur(8px)' },
  animate: { 
    opacity: 1, 
    scale: 1, 
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } 
  },
};

export const calendarSelect: Variants = {
  rest: { scale: 1 },
  selected: { 
    scale: [1, 1.15, 1], 
    transition: { duration: 0.3, ease: 'easeInOut' } 
  },
};

export const successAnimation: Variants = {
  initial: { scale: 0, rotate: -25, opacity: 0 },
  animate: { 
    scale: 1, 
    rotate: 0, 
    opacity: 1,
    transition: { 
      type: 'spring', 
      damping: 14, 
      stiffness: 200 
    } 
  },
};

export const floatingParticle = {
  animate: (i: number) => ({
    y: [0, -18 - (i % 5) * 4, 0],
    x: [0, (i % 2 === 0 ? 8 : -8), 0],
    rotate: [0, (i % 2 === 0 ? 6 : -6), 0],
    transition: {
      duration: 4 + (i % 3),
      repeat: Infinity,
      repeatType: 'reverse' as const,
      ease: 'easeInOut',
      delay: (i % 4) * 0.4,
    },
  }),
};
