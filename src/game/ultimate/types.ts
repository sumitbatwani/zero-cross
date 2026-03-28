import type { Board, GameStatus, Player, Scores } from '../types';

export interface UltimateState {
  boards: Board[];                          // 9 local boards
  localWinners: (Player | 'draw' | null)[]; // winner of each local board
  activeBoard: number | null;               // null = any available board
  currentPlayer: Player;
  status: GameStatus;
  winner: Player | null;
  winLine: number[] | null;                 // winning local board indices
  scores: Scores;
}

export type UltimateAction =
  | { type: 'MAKE_MOVE'; boardIndex: number; cellIndex: number }
  | { type: 'RESET_GAME' }
  | { type: 'TIMEOUT' };
