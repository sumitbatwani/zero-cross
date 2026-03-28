'use client';

import { useEffect, useRef, useState } from 'react';

export const FLASH_SECONDS = 60;

export function useTimer({
  enabled,
  started,
  gameStatus,
  onTimeout,
}: {
  enabled: boolean;
  started: boolean;
  gameStatus: string;
  onTimeout: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState(FLASH_SECONDS);
  const onTimeoutRef = useRef(onTimeout);
  onTimeoutRef.current = onTimeout;

  // Reset when game restarts (started flips false → true)
  useEffect(() => {
    if (!started) setTimeLeft(FLASH_SECONDS);
  }, [started]);

  // Total-game countdown — runs once per game, no per-turn reset
  useEffect(() => {
    if (!enabled || !started || gameStatus !== 'playing') return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeoutRef.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [enabled, started, gameStatus]);

  return { timeLeft, seconds: FLASH_SECONDS };
}
