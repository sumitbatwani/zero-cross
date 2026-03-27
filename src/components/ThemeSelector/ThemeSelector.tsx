'use client';

import { THEMES, type Theme, type ThemeId } from '@/lib/themes';
import styles from './ThemeSelector.module.css';

interface ThemeSelectorProps {
  activeTheme: ThemeId;
  isUnlocked: (id: ThemeId) => boolean;
  onSelect: (theme: Theme) => void;
}

export function ThemeSelector({ activeTheme, isUnlocked, onSelect }: ThemeSelectorProps) {
  return (
    <div className={styles.container}>
      {THEMES.map((theme) => {
        const unlocked = isUnlocked(theme.id);
        const active = activeTheme === theme.id;

        return (
          <button
            key={theme.id}
            className={`${styles.swatch} ${active ? styles.active : ''} ${!unlocked ? styles.locked : ''}`}
            onClick={() => onSelect(theme)}
            aria-label={`${theme.name} theme${unlocked ? '' : ' (locked)'}`}
            aria-pressed={active}
            title={theme.name}
          >
            <span
              className={styles.preview}
              style={{ background: theme.previewBg }}
            >
              <span className={styles.dot} style={{ background: theme.previewX }} />
              <span className={styles.dot} style={{ background: theme.previewO }} />
              <span className={styles.dot} style={{ background: theme.previewAccent }} />
            </span>
            <span className={styles.name}>{theme.name}</span>
            {!unlocked && <span className={styles.lockIcon} aria-hidden>🔒</span>}
          </button>
        );
      })}
    </div>
  );
}
