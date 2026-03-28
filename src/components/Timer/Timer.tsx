'use client';

import styles from './Timer.module.css';

interface TimerProps {
  timeLeft: number;
  seconds: number;
}

function fmt(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export function Timer({ timeLeft, seconds }: TimerProps) {
  const pct = timeLeft / seconds;
  const urgent = timeLeft <= 10;
  const warning = timeLeft <= 20;

  return (
    <div className={`${styles.timer} ${urgent ? styles.urgent : warning ? styles.warning : ''}`}>
      <svg className={styles.ring} viewBox="0 0 36 36">
        <circle className={styles.track} cx="18" cy="18" r="15.9" />
        <circle
          className={styles.fill}
          cx="18" cy="18" r="15.9"
          strokeDasharray={`${pct * 100} 100`}
        />
      </svg>
      <span className={styles.number}>{fmt(timeLeft)}</span>
    </div>
  );
}
