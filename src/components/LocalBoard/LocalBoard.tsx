'use client';

import type { Board, Player } from '@/game/types';
import styles from './LocalBoard.module.css';

interface LocalBoardProps {
  board: Board;
  boardIndex: number;
  winner: Player | 'draw' | null;
  isActive: boolean;
  isWinBoard: boolean;
  gameOver: boolean;
  onCellClick: (boardIndex: number, cellIndex: number) => void;
}

export function LocalBoard({
  board,
  boardIndex,
  winner,
  isActive,
  isWinBoard,
  gameOver,
  onCellClick,
}: LocalBoardProps) {
  const disabled = !isActive || winner !== null || gameOver;

  return (
    <div
      className={`
        ${styles.board}
        ${isActive ? styles.active : ''}
        ${isWinBoard ? styles.winBoard : ''}
        ${winner ? styles.finished : ''}
      `}
    >
      {board.map((cell, i) => (
        <button
          key={i}
          className={`${styles.cell} ${cell ? styles[cell] : ''}`}
          onClick={() => onCellClick(boardIndex, i)}
          disabled={disabled || cell !== null}
          aria-label={`Board ${boardIndex + 1}, cell ${i + 1}`}
        >
          {cell && <span className={styles.mark}>{cell}</span>}
        </button>
      ))}

      {winner && winner !== 'draw' && (
        <div className={`${styles.winOverlay} ${styles[winner]}`}>
          {winner}
        </div>
      )}
      {winner === 'draw' && (
        <div className={styles.winOverlay}>–</div>
      )}
    </div>
  );
}
