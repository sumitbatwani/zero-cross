'use client';

import type { Cell as CellType } from '@/game/types';
import styles from './Cell.module.css';

interface CellProps {
  value: CellType;
  index: number;
  isWinCell: boolean;
  onClick: (index: number) => void;
  disabled: boolean;
}

export function Cell({ value, index, isWinCell, onClick, disabled }: CellProps) {
  return (
    <button
      className={`${styles.cell} ${value ? styles[value] : ''} ${isWinCell ? styles.win : ''}`}
      onClick={() => onClick(index)}
      disabled={disabled || value !== null}
      aria-label={value ? `Cell ${index + 1}: ${value}` : `Cell ${index + 1}: empty`}
    >
      {value && <span className={styles.mark}>{value}</span>}
    </button>
  );
}
