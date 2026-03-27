'use client';

import styles from './ModeSelector.module.css';

export type GameMode = 'classic' | 'ultimate';

interface ModeSelectorProps {
  mode: GameMode;
  onChange: (mode: GameMode) => void;
}

export function ModeSelector({ mode, onChange }: ModeSelectorProps) {
  return (
    <div className={styles.container}>
      <button
        className={`${styles.btn} ${mode === 'classic' ? styles.active : ''}`}
        onClick={() => onChange('classic')}
      >
        Classic
      </button>
      <button
        className={`${styles.btn} ${mode === 'ultimate' ? styles.active : ''}`}
        onClick={() => onChange('ultimate')}
      >
        Ultimate
        <span className={styles.badge}>NEW</span>
      </button>
    </div>
  );
}
