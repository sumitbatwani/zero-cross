'use client';

import { THEMES, type ThemeId } from '@/lib/themes';
import styles from './ThemeSelector.module.css';

interface ThemeSelectorProps {
  activeTheme: ThemeId;
  onSelect: (id: ThemeId) => void;
}

export function ThemeSelector({ activeTheme, onSelect }: ThemeSelectorProps) {
  return (
    <div className={styles.container}>
      {THEMES.map((theme) => (
        <button
          key={theme.id}
          className={`${styles.swatch} ${activeTheme === theme.id ? styles.active : ''}`}
          onClick={() => onSelect(theme.id)}
          aria-label={`${theme.name} theme`}
          aria-pressed={activeTheme === theme.id}
          title={theme.name}
        >
          <span className={styles.preview} style={{ background: theme.previewBg }}>
            <span className={styles.dot} style={{ background: theme.previewX }} />
            <span className={styles.dot} style={{ background: theme.previewO }} />
            <span className={styles.dot} style={{ background: theme.previewAccent }} />
          </span>
          <span className={styles.name}>{theme.name}</span>
        </button>
      ))}
    </div>
  );
}
