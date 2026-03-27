'use client';

import { useState } from 'react';
import { Board } from '@/components/Board/Board';
import { GameStatus } from '@/components/GameStatus/GameStatus';
import { type GameMode, ModeSelector } from '@/components/ModeSelector/ModeSelector';
import { ScoreBoard } from '@/components/ScoreBoard/ScoreBoard';
import { ThemeSelector } from '@/components/ThemeSelector/ThemeSelector';
import { UltimateBoard } from '@/components/UltimateBoard/UltimateBoard';
import { useGameState } from '@/hooks/useGameState';
import { usePlayerNames } from '@/hooks/usePlayerNames';
import { useTheme } from '@/hooks/useTheme';
import { useUltimateGame } from '@/hooks/useUltimateGame';
import styles from './page.module.css';

export default function Home() {
  const [gameMode, setGameMode] = useState<GameMode>('classic');
  const classic = useGameState();
  const ultimate = useUltimateGame();
  const { activeTheme, setTheme } = useTheme();
  const { names, setName } = usePlayerNames();

  const handleModeChange = (mode: GameMode) => {
    setGameMode(mode);
    classic.resetGame();
    ultimate.resetGame();
  };

  const isUltimate = gameMode === 'ultimate';
  const status = isUltimate ? ultimate.state.status : classic.state.status;
  const currentPlayer = isUltimate ? ultimate.state.currentPlayer : classic.state.currentPlayer;
  const winner = isUltimate ? ultimate.state.winner : classic.state.winner;
  const scores = isUltimate ? ultimate.state.scores : classic.state.scores;
  const resetGame = isUltimate ? ultimate.resetGame : classic.resetGame;

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Zero Cross</h1>

      <ThemeSelector activeTheme={activeTheme} onSelect={setTheme} />

      <ModeSelector mode={gameMode} onChange={handleModeChange} />

      <ScoreBoard
        scores={scores}
        mode={classic.state.mode}
        names={names}
        onSetMode={(m) => classic.setMode(m)}
        onSetName={setName}
        hideToggle={isUltimate}
      />

      {isUltimate ? (
        <UltimateBoard state={ultimate.state} onCellClick={ultimate.makeMove} />
      ) : (
        <Board
          board={classic.state.board}
          winLine={classic.state.winLine}
          status={classic.state.status}
          onCellClick={classic.makeMove}
        />
      )}

      <GameStatus
        status={status}
        currentPlayer={currentPlayer}
        winner={winner}
        mode={isUltimate ? 'pvp' : classic.state.mode}
        names={names}
        onReset={resetGame}
      />
    </main>
  );
}
