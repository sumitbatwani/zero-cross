'use client';

import { getLevelProgress } from '@/lib/xp';
import styles from './XPBar.module.css';

interface XPBarProps {
  xp: number;
  streak: number;
}

export function XPBar({ xp, streak }: XPBarProps) {
  const { level, progress, xpInLevel, xpForLevel } = getLevelProgress(xp);
  const isMaxLevel = level.maxXP === Infinity;

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <span className={styles.level}>{level.name}</span>
        <span className={styles.xpText}>
          {isMaxLevel ? `${xp} XP` : `${xpInLevel} / ${xpForLevel} XP`}
        </span>
        {streak >= 2 && (
          <span className={styles.streak}>🔥 {streak} streak</span>
        )}
      </div>

      <div className={styles.track}>
        <div
          className={styles.fill}
          style={{ width: `${Math.min(progress * 100, 100)}%` }}
        />
      </div>
    </div>
  );
}
