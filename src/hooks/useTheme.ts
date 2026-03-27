'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  LS_ACTIVE,
  LS_UNLOCKED,
  VALID_THEME_IDS,
  type ThemeId,
} from '@/lib/themes';

function readUnlocked(): ThemeId[] {
  try {
    const raw = localStorage.getItem(LS_UNLOCKED);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown[];
    return parsed.filter((id): id is ThemeId =>
      VALID_THEME_IDS.includes(id as ThemeId)
    );
  } catch {
    return [];
  }
}

function readActive(): ThemeId {
  try {
    const raw = localStorage.getItem(LS_ACTIVE);
    if (raw && VALID_THEME_IDS.includes(raw as ThemeId)) return raw as ThemeId;
  } catch {
    // ignore
  }
  return 'default';
}

export function useTheme() {
  const [activeTheme, setActiveThemeState] = useState<ThemeId>('default');
  const [unlockedThemes, setUnlockedThemes] = useState<ThemeId[]>([]);

  // Load from localStorage on mount + handle ?purchase= callback
  useEffect(() => {
    const active = readActive();
    const unlocked = readUnlocked();

    // Check if returning from Stripe with a purchase
    const params = new URLSearchParams(window.location.search);
    const purchased = params.get('purchase') as ThemeId | null;
    let finalUnlocked = unlocked;

    if (purchased && VALID_THEME_IDS.includes(purchased) && purchased !== 'default') {
      if (!unlocked.includes(purchased)) {
        finalUnlocked = [...unlocked, purchased];
        localStorage.setItem(LS_UNLOCKED, JSON.stringify(finalUnlocked));
      }
      // Clean URL
      window.history.replaceState({}, '', window.location.pathname);
    }

    setUnlockedThemes(finalUnlocked);

    // Apply active theme (only if it's still unlocked)
    const safeActive =
      active === 'default' || finalUnlocked.includes(active) ? active : 'default';
    setActiveThemeState(safeActive);
    applyTheme(safeActive);
  }, []);

  const setTheme = useCallback(
    (id: ThemeId) => {
      if (id !== 'default' && !unlockedThemes.includes(id)) return;
      localStorage.setItem(LS_ACTIVE, id);
      setActiveThemeState(id);
      applyTheme(id);
    },
    [unlockedThemes]
  );

  const isUnlocked = useCallback(
    (id: ThemeId) => id === 'default' || unlockedThemes.includes(id),
    [unlockedThemes]
  );

  return { activeTheme, unlockedThemes, setTheme, isUnlocked };
}

function applyTheme(id: ThemeId) {
  if (id === 'default') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', id);
  }
}
