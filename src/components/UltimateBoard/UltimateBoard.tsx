'use client';

import { LocalBoard } from '@/components/LocalBoard/LocalBoard';
import type { UltimateState } from '@/game/ultimate/types';
import styles from './UltimateBoard.module.css';

interface UltimateBoardProps {
  state: UltimateState;
  onCellClick: (boardIndex: number, cellIndex: number) => void;
}

export function UltimateBoard({ state, onCellClick }: UltimateBoardProps) {
  const { boards, localWinners, activeBoard, winLine, status } = state;
  const gameOver = status !== 'playing';

  return (
    <div className={styles.metaBoard}>
      {boards.map((board, i) => {
        const isActive = gameOver
          ? false
          : activeBoard === null
          ? localWinners[i] === null
          : activeBoard === i;

        return (
          <LocalBoard
            key={i}
            board={board}
            boardIndex={i}
            winner={localWinners[i]}
            isActive={isActive}
            isWinBoard={winLine?.includes(i) ?? false}
            gameOver={gameOver}
            onCellClick={onCellClick}
          />
        );
      })}
    </div>
  );
}
