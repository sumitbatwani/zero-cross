'use client';

import { useReducer } from 'react';
import { INITIAL_ULTIMATE_STATE, ultimateReducer } from '@/game/ultimate/reducer';

export function useUltimateGame() {
  const [state, dispatch] = useReducer(ultimateReducer, INITIAL_ULTIMATE_STATE);

  return {
    state,
    makeMove: (boardIndex: number, cellIndex: number) =>
      dispatch({ type: 'MAKE_MOVE', boardIndex, cellIndex }),
    resetGame: () => dispatch({ type: 'RESET_GAME' }),
  };
}
