'use client';

import type { GameMode, Scores } from '@/game/types';
import styles from './ScoreBoard.module.css';

interface ScoreBoardProps {
  scores: Scores;
  mode: GameMode;
  onSetMode: (mode: GameMode) => void;
}

export function ScoreBoard({ scores, mode, onSetMode }: ScoreBoardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.scores}>
        <div className={`${styles.score} ${styles.x}`}>
          <span className={styles.label}>X</span>
          <span className={styles.value}>{scores.X}</span>
        </div>
        <div className={styles.score}>
          <span className={styles.label}>Draws</span>
          <span className={styles.value}>{scores.draws}</span>
        </div>
        <div className={`${styles.score} ${styles.o}`}>
          <span className={styles.label}>O</span>
          <span className={styles.value}>{scores.O}</span>
        </div>
      </div>

      <div className={styles.modeToggle}>
        <button
          className={`${styles.modeBtn} ${mode === 'pvp' ? styles.active : ''}`}
          onClick={() => onSetMode('pvp')}
        >
          2 Players
        </button>
        <button
          className={`${styles.modeBtn} ${mode === 'pvc' ? styles.active : ''}`}
          onClick={() => onSetMode('pvc')}
        >
          vs Computer
        </button>
      </div>
    </div>
  );
}
