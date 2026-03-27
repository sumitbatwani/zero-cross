'use client';

import { DAILY_WIN_GOAL } from '@/lib/daily';
import styles from './DailyChallenge.module.css';

interface DailyChallengeProps {
  winsToday: number;
  goalComplete: boolean;
  dayStreak: number;
}

export function DailyChallenge({ winsToday, goalComplete, dayStreak }: DailyChallengeProps) {
  const dots = Array.from({ length: DAILY_WIN_GOAL }, (_, i) => i < winsToday);

  return (
    <div className={styles.container}>
      <span className={styles.icon}>{goalComplete ? '✅' : '🎯'}</span>
      <div className={styles.dots}>
        {dots.map((filled, i) => (
          <span key={i} className={`${styles.dot} ${filled ? styles.filled : ''}`} />
        ))}
      </div>
      <span className={styles.count}>{Math.min(winsToday, DAILY_WIN_GOAL)}/{DAILY_WIN_GOAL}</span>

      {dayStreak >= 2 && (
        <span className={styles.streak}>📅 {dayStreak}d</span>
      )}
    </div>
  );
}
