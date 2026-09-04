import confetti from 'canvas-confetti';

export function fireHeartConfetti() {
  const count = 60;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  // Romantic palette: rose, burgundy, gold, blush pink, coral
  const colors = ['#DE7C7C', '#6B2D46', '#F4A261', '#E76F51', '#F4ACB7', '#D8B4E2'];

  fire(0.25, {
    spread: 30,
    startVelocity: 55,
    colors,
  });
  fire(0.2, {
    spread: 60,
    colors,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors,
  });
}

export function fireGrandCelebration() {
  const duration = 2.5 * 1000;
  const end = Date.now() + duration;

  const colors = ['#DE7C7C', '#6B2D46', '#E29578', '#F5CAC3', '#FFB703', '#F4ACB7'];

  (function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.65 },
      colors,
      zIndex: 9999,
    });
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.65 },
      colors,
      zIndex: 9999,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}
