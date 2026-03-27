'use client';

import { useCallback, useEffect, useState } from 'react';
import { LS_ACTIVE, VALID_THEME_IDS, type ThemeId } from '@/lib/themes';

function readActive(): ThemeId {
  try {
    const raw = localStorage.getItem(LS_ACTIVE);
    if (raw && VALID_THEME_IDS.includes(raw as ThemeId)) return raw as ThemeId;
  } catch {
    // ignore
  }
  return 'default';
}

function applyTheme(id: ThemeId) {
  if (id === 'default') {
    document.documentElement.removeAttribute('data-theme');
  } else {
    document.documentElement.setAttribute('data-theme', id);
  }
}

export function useTheme() {
  const [activeTheme, setActiveThemeState] = useState<ThemeId>(() =>
    typeof window === 'undefined' ? 'default' : readActive()
  );

  // Sync DOM on mount — anti-flash script covers the initial paint,
  // this ensures the DOM matches after hydration
  useEffect(() => {
    applyTheme(activeTheme);
  }, [activeTheme]);

  const setTheme = useCallback((id: ThemeId) => {
    localStorage.setItem(LS_ACTIVE, id);
    setActiveThemeState(id);
    applyTheme(id);
  }, []);

  return { activeTheme, setTheme };
}
