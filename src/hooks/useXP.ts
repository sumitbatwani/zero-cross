'use client';

import { useCallback, useEffect, useState } from 'react';
import { LS_XP, calcXPGain, type XPState } from '@/lib/xp';

const DEFAULT: XPState = { xp: 0, streak: 0 };

function readXP(): XPState {
  try {
    const raw = localStorage.getItem(LS_XP);
    if (!raw) return DEFAULT;
    const parsed = JSON.parse(raw) as Partial<XPState>;
    return {
      xp: typeof parsed.xp === 'number' ? parsed.xp : 0,
      streak: typeof parsed.streak === 'number' ? parsed.streak : 0,
    };
  } catch {
    return DEFAULT;
  }
}

export function useXP() {
  const [state, setState] = useState<XPState>(DEFAULT);

  useEffect(() => {
    setState(readXP());
  }, []);

  const awardXP = useCallback((result: 'win' | 'draw' | 'loss') => {
    setState((prev) => {
      const newStreak = result === 'win' ? prev.streak + 1 : 0;
      const gained = calcXPGain(result, prev.streak);
      const next: XPState = { xp: prev.xp + gained, streak: newStreak };
      localStorage.setItem(LS_XP, JSON.stringify(next));
      return next;
    });
  }, []);

  return { xp: state.xp, streak: state.streak, awardXP };
}
