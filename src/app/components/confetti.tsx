"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

export function useConfetti() {
  const fire = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      spread: 90,
    };

    const fireConfetti = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    };

    // Left side
    fireConfetti(0.25, {
      angle: 60,
      spread: 55,
      startVelocity: 65,
    });

    // Right side
    fireConfetti(0.25, {
      angle: 120,
      spread: 55,
      startVelocity: 65,
    });

    // Center burst
    fireConfetti(0.4, {
      spread: 100,
      startVelocity: 90,
      decay: 0.91,
      scalar: 0.8,
    });

    // Additional bursts
    setTimeout(() => {
      fireConfetti(0.1, {
        spread: 120,
        startVelocity: 45,
        decay: 0.92,
        scalar: 1.2,
      });
    }, 300);

    setTimeout(() => {
      fireConfetti(0.2, {
        spread: 150,
        startVelocity: 30,
      });
    }, 500);
  };

  return fire;
}

export function ConfettiTrigger({ trigger }: { trigger: boolean }) {
  const fireConfetti = useConfetti();

  useEffect(() => {
    if (trigger) {
      fireConfetti();
    }
  }, [trigger, fireConfetti]);

  return null;
}