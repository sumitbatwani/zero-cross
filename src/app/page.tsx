'use client';

import { useState } from 'react';
import { Board } from '@/components/Board/Board';
import { GameStatus } from '@/components/GameStatus/GameStatus';
import { PurchaseModal } from '@/components/PurchaseModal/PurchaseModal';
import { ScoreBoard } from '@/components/ScoreBoard/ScoreBoard';
import { ThemeSelector } from '@/components/ThemeSelector/ThemeSelector';
import { useGameState } from '@/hooks/useGameState';
import { useTheme } from '@/hooks/useTheme';
import type { Theme } from '@/lib/themes';
import styles from './page.module.css';

export default function Home() {
  const { state, makeMove, resetGame, setMode } = useGameState();
  const { activeTheme, setTheme, isUnlocked } = useTheme();
  const [modalTheme, setModalTheme] = useState<Theme | null>(null);

  const handleThemeSelect = (theme: Theme) => {
    if (isUnlocked(theme.id)) {
      setTheme(theme.id);
    } else {
      setModalTheme(theme);
    }
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Zero Cross</h1>

      <ThemeSelector
        activeTheme={activeTheme}
        isUnlocked={isUnlocked}
        onSelect={handleThemeSelect}
      />

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

      <PurchaseModal theme={modalTheme} onClose={() => setModalTheme(null)} />
    </main>
  );
}
