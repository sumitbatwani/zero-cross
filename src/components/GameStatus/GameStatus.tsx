'use client';

import type { GameMode, GameStatus as GameStatusType, Player } from '@/game/types';
import styles from './GameStatus.module.css';

interface GameStatusProps {
  status: GameStatusType;
  currentPlayer: Player;
  winner: Player | null;
  mode: GameMode;
  names: { X: string; O: string };
  onReset: () => void;
}

export function GameStatus({ status, currentPlayer, winner, mode, names, onReset }: GameStatusProps) {
  const nameOf = (p: Player) => mode === 'pvc' && p === 'O' ? 'Computer' : names[p];

  let message = '';
  if (status === 'won') {
    message = `${nameOf(winner!)} wins!`;
  } else if (status === 'draw') {
    message = "It's a draw!";
  } else {
    const isAITurn = mode === 'pvc' && currentPlayer === 'O';
    message = isAITurn ? 'Computer is thinking...' : `${nameOf(currentPlayer)}'s turn`;
  }

  return (
    <div className={styles.container}>
      <p className={`${styles.message} ${status !== 'playing' ? styles.highlight : ''}`}>
        {message}
      </p>
      {status !== 'playing' && (
        <button className={styles.resetBtn} onClick={onReset}>
          Play Again
        </button>
      )}
    </div>
  );
}
