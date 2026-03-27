'use client';

import { Board } from '@/components/Board/Board';
import { GameStatus } from '@/components/GameStatus/GameStatus';
import { ScoreBoard } from '@/components/ScoreBoard/ScoreBoard';
import { useGameState } from '@/hooks/useGameState';
import styles from './page.module.css';

export default function Home() {
  const { state, makeMove, resetGame, setMode } = useGameState();

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Zero Cross</h1>

      <ScoreBoard scores={state.scores} mode={state.mode} onSetMode={setMode} />

      <Board
        board={state.board}
        winLine={state.winLine}
        status={state.status}
        onCellClick={makeMove}
      />

      <GameStatus
        status={state.status}
        currentPlayer={state.currentPlayer}
        winner={state.winner}
        mode={state.mode}
        onReset={resetGame}
      />
    </main>
  );
}
