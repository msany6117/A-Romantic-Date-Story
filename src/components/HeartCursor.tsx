import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export const HeartCursor: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    let idCounter = 0;
    let lastMoveTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      // Throttle to every 55ms so it's super smooth and performant
      if (now - lastMoveTime < 55) return;
      lastMoveTime = now;

      const newParticle: Particle = {
        id: idCounter++,
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 8 + 8, // 8px - 16px
        opacity: 0.75,
      };

      setParticles((prev) => [...prev.slice(-15), newParticle]);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Clean up dead particles interval
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            y: p.y - 1.5,
            opacity: p.opacity - 0.08,
            size: p.size * 0.96,
          }))
          .filter((p) => p.opacity > 0.05)
      );
    }, 40);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(interval);
    };
  }, []);

  if (isTouchDevice || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            opacity: p.opacity,
            width: `${p.size}px`,
            height: `${p.size}px`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="#DE7C7C" className="w-full h-full drop-shadow-xs">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      ))}
    </div>
  );
};
