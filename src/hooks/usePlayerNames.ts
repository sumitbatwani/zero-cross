'use client';

import { useCallback, useEffect, useState } from 'react';

const LS_KEY = 'zc-player-names';
const DEFAULTS = { X: 'Player 1', O: 'Player 2' };

function readNames(): { X: string; O: string } {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw);
    return {
      X: parsed.X?.trim() || DEFAULTS.X,
      O: parsed.O?.trim() || DEFAULTS.O,
    };
  } catch {
    return DEFAULTS;
  }
}

export function usePlayerNames() {
  const [names, setNamesState] = useState<{ X: string; O: string }>(DEFAULTS);

  useEffect(() => {
    setNamesState(readNames());
  }, []);

  const setName = useCallback((player: 'X' | 'O', name: string) => {
    const trimmed = name.trim() || DEFAULTS[player];
    setNamesState((prev) => {
      const next = { ...prev, [player]: trimmed };
      localStorage.setItem(LS_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { names, setName };
}
