'use client';

import { Cell } from '@/components/Cell/Cell';
import type { Board as BoardType, GameStatus } from '@/game/types';
import styles from './Board.module.css';

interface BoardProps {
  board: BoardType;
  winLine: number[] | null;
  status: GameStatus;
  onCellClick: (index: number) => void;
}

export function Board({ board, winLine, status, onCellClick }: BoardProps) {
  const isDisabled = status !== 'playing';

  return (
    <div className={`${styles.board} ${status !== 'playing' ? styles.finished : ''}`}>
      {board.map((cell, i) => (
        <Cell
          key={i}
          index={i}
          value={cell}
          isWinCell={winLine?.includes(i) ?? false}
          onClick={onCellClick}
          disabled={isDisabled}
        />
      ))}
    </div>
  );
}
