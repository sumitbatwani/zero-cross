'use client';

import { useEffect, useRef, useState } from 'react';
import { Board } from '@/components/Board/Board';
import { DailyChallenge } from '@/components/DailyChallenge/DailyChallenge';
import { type GameMode, ModeSelector } from '@/components/ModeSelector/ModeSelector';
import { ScoreBoard } from '@/components/ScoreBoard/ScoreBoard';
import { ThemeSelector } from '@/components/ThemeSelector/ThemeSelector';
import { UltimateBoard } from '@/components/UltimateBoard/UltimateBoard';
import { XPBar } from '@/components/XPBar/XPBar';
import { useGameState } from '@/hooks/useGameState';
import { useDaily } from '@/hooks/useDaily';
import { usePlayerNames } from '@/hooks/usePlayerNames';
import { useTheme } from '@/hooks/useTheme';
import { useUltimateGame } from '@/hooks/useUltimateGame';
import { useXP } from '@/hooks/useXP';
import { THEME_MAP } from '@/lib/themes';
import type { Player } from '@/game/types';
import styles from './page.module.css';

export default function Home() {
  const [gameMode, setGameMode] = useState<GameMode>('classic');
  const [themeOpen, setThemeOpen] = useState(false);

  const classic = useGameState();
  const ultimate = useUltimateGame();
  const { activeTheme, setTheme } = useTheme();
  const { names, setName } = usePlayerNames();
  const { xp, streak, awardXP } = useXP();
  const { winsToday, goalComplete, dayStreak, recordGame } = useDaily();
  const awardedRef = useRef(false);

  const isUltimate = gameMode === 'ultimate';
  const status = isUltimate ? ultimate.state.status : classic.state.status;
  const currentPlayer = isUltimate ? ultimate.state.currentPlayer : classic.state.currentPlayer;
  const winner = isUltimate ? ultimate.state.winner : classic.state.winner;
  const scores = isUltimate ? ultimate.state.scores : classic.state.scores;
  const resetGame = isUltimate ? ultimate.resetGame : classic.resetGame;
  const pvpMode = isUltimate ? 'pvp' : classic.state.mode;

  const nameOf = (p: Player) => pvpMode === 'pvc' && p === 'O' ? 'Computer' : names[p];

  const resultText = status === 'won'
    ? `${nameOf(winner!)} wins!`
    : "It's a draw!";

  const turnText = pvpMode === 'pvc' && currentPlayer === 'O'
    ? 'Computer is thinking...'
    : `${nameOf(currentPlayer)}'s turn`;

  useEffect(() => {
    if (status === 'playing') { awardedRef.current = false; return; }
    if (awardedRef.current) return;
    awardedRef.current = true;
    const result = status === 'won' ? 'win' : 'draw';
    awardXP(result);
    recordGame(result);
  }, [status, awardXP, recordGame]);

  const handleModeChange = (mode: GameMode) => {
    setGameMode(mode);
    classic.resetGame();
    ultimate.resetGame();
  };

  return (
    <div className={styles.page}>

      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.topRow}>
          <h1 className={styles.title}>Zero Cross</h1>

          {/* Theme popover */}
          <button
            className={styles.themeBtn}
            onClick={() => setThemeOpen((o) => !o)}
            aria-label="Change theme"
          >
            <span
              className={styles.themeDot}
              style={{ background: THEME_MAP[activeTheme].previewAccent }}
            />
          </button>
          {themeOpen && (
            <>
              <div className={styles.themeBackdrop} onClick={() => setThemeOpen(false)} />
              <div className={styles.themePopover}>
                <ThemeSelector
                  activeTheme={activeTheme}
                  onSelect={(id) => { setTheme(id); setThemeOpen(false); }}
                />
              </div>
            </>
          )}
        </div>

        <XPBar xp={xp} streak={streak} />

        <div className={styles.controlsRow}>
          <DailyChallenge winsToday={winsToday} goalComplete={goalComplete} dayStreak={dayStreak} />
          <ModeSelector mode={gameMode} onChange={handleModeChange} />
        </div>

        <ScoreBoard
          scores={scores}
          mode={classic.state.mode}
          names={names}
          onSetMode={(m) => classic.setMode(m)}
          onSetName={setName}
          hideToggle={isUltimate}
        />
      </header>

      {/* ── Board zone ── */}
      <div className={styles.boardZone}>
        <div className={styles.boardWrapper}>
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

          {status !== 'playing' && (
            <div className={styles.gameOverlay}>
              <p className={styles.resultText}>{resultText}</p>
              <button className={styles.playAgainBtn} onClick={resetGame}>
                Play Again
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ── Status bar ── */}
      <div className={styles.statusBar}>
        {status === 'playing' && (
          <span className={styles.turnText}>{turnText}</span>
        )}
      </div>

    </div>
  );
}
