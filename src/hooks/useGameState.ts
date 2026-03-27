'use client';

import { useEffect, useReducer } from 'react';
import { getBestMove } from '@/game/logic';
import { INITIAL_STATE, gameReducer } from '@/game/reducer';
import type { GameMode } from '@/game/types';

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  // AI move: trigger when it's O's turn in pvc mode
  useEffect(() => {
    if (state.mode !== 'pvc') return;
    if (state.currentPlayer !== 'O') return;
    if (state.status !== 'playing') return;

    const timer = setTimeout(() => {
      const index = getBestMove(state.board);
      if (index !== -1) dispatch({ type: 'MAKE_MOVE', index });
    }, 400); // small delay so it feels like "thinking"

    return () => clearTimeout(timer);
  }, [state.mode, state.currentPlayer, state.status, state.board]);

  return {
    state,
    makeMove: (index: number) => dispatch({ type: 'MAKE_MOVE', index }),
    resetGame: () => dispatch({ type: 'RESET_GAME' }),
    setMode: (mode: GameMode) => dispatch({ type: 'SET_MODE', mode }),
  };
}
