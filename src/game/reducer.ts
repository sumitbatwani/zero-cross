import { checkWinner, isBoardFull } from './logic';
import type { GameAction, GameState } from './types';

export const INITIAL_STATE: GameState = {
  board: [null, null, null, null, null, null, null, null, null],
  currentPlayer: 'X',
  status: 'playing',
  winner: null,
  winLine: null,
  mode: 'pvp',
  scores: { X: 0, O: 0, draws: 0 },
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'MAKE_MOVE': {
      if (state.status !== 'playing') return state;
      if (state.board[action.index] !== null) return state;

      const board = [...state.board] as GameState['board'];
      board[action.index] = state.currentPlayer;

      const result = checkWinner(board);
      if (result) {
        return {
          ...state,
          board,
          status: 'won',
          winner: result.winner,
          winLine: result.line,
          scores: {
            ...state.scores,
            [result.winner]: state.scores[result.winner] + 1,
          },
        };
      }

      if (isBoardFull(board)) {
        return {
          ...state,
          board,
          status: 'draw',
          scores: { ...state.scores, draws: state.scores.draws + 1 },
        };
      }

      return {
        ...state,
        board,
        currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
      };
    }

    case 'RESET_GAME':
      return {
        ...INITIAL_STATE,
        mode: state.mode,
        scores: state.scores,
      };

    case 'SET_MODE':
      return {
        ...INITIAL_STATE,
        mode: action.mode,
      };

    default:
      return state;
  }
}
