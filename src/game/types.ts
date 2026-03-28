export type Player = 'X' | 'O';
export type Cell = Player | null;
export type Board = [Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell, Cell];
export type GameMode = 'pvp' | 'pvc';
export type GameStatus = 'playing' | 'won' | 'draw';

export interface Scores {
  X: number;
  O: number;
  draws: number;
}

export interface GameState {
  board: Board;
  currentPlayer: Player;
  status: GameStatus;
  winner: Player | null;
  winLine: number[] | null;
  mode: GameMode;
  scores: Scores;
}

export type GameAction =
  | { type: 'MAKE_MOVE'; index: number }
  | { type: 'RESET_GAME' }
  | { type: 'SET_MODE'; mode: GameMode }
  | { type: 'TIMEOUT' };
