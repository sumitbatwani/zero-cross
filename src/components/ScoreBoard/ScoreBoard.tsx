'use client';

import { useRef, useState } from 'react';
import type { GameMode, Scores } from '@/game/types';
import styles from './ScoreBoard.module.css';

interface ScoreBoardProps {
  scores: Scores;
  mode: GameMode;
  names: { X: string; O: string };
  onSetMode: (mode: GameMode) => void;
  onSetName: (player: 'X' | 'O', name: string) => void;
  hideToggle?: boolean;
}

interface ScoreCardProps {
  player: 'X' | 'O';
  name: string;
  score: number;
  editable: boolean;
  onSave: (name: string) => void;
}

function ScoreCard({ player, name, score, editable, onSave }: ScoreCardProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);
  const inputRef = useRef<HTMLInputElement>(null);

  const startEdit = () => {
    if (!editable) return;
    setDraft(name);
    setEditing(true);
    setTimeout(() => inputRef.current?.select(), 0);
  };

  const commit = () => {
    setEditing(false);
    onSave(draft);
  };

  return (
    <div className={`${styles.score} ${styles[player.toLowerCase() as 'x' | 'o']}`}>
      {editing ? (
        <input
          ref={inputRef}
          className={styles.nameInput}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') setEditing(false); }}
          maxLength={12}
          autoFocus
        />
      ) : (
        <button
          className={`${styles.name} ${editable ? styles.editable : ''}`}
          onClick={startEdit}
          title={editable ? 'Click to rename' : undefined}
        >
          {name}
        </button>
      )}
      <span className={styles.value}>{score}</span>
    </div>
  );
}

export function ScoreBoard({ scores, mode, names, onSetMode, onSetName, hideToggle = false }: ScoreBoardProps) {
  const isComputer = mode === 'pvc';

  return (
    <div className={styles.container}>
      <div className={styles.scores}>
        <ScoreCard
          player="X"
          name={names.X}
          score={scores.X}
          editable
          onSave={(n) => onSetName('X', n)}
        />
        <div className={styles.draws}>
          <span className={styles.drawsLabel}>Draws</span>
          <span className={styles.drawsValue}>{scores.draws}</span>
        </div>
        <ScoreCard
          player="O"
          name={isComputer ? 'Computer' : names.O}
          score={scores.O}
          editable={!isComputer}
          onSave={(n) => onSetName('O', n)}
        />
      </div>

      {!hideToggle && (
        <div className={styles.modeToggle}>
          <button
            className={`${styles.modeBtn} ${mode === 'pvp' ? styles.active : ''}`}
            onClick={() => onSetMode('pvp')}
          >
            2 Players
          </button>
          <button
            className={`${styles.modeBtn} ${mode === 'pvc' ? styles.active : ''}`}
            onClick={() => onSetMode('pvc')}
          >
            vs Computer
          </button>
        </div>
      )}
    </div>
  );
}
