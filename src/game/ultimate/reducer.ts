import { checkWinner, isBoardFull } from '../logic';
import type { Board, Player } from '../types';
import { checkMetaWinner, getNextActiveBoard, isMetaComplete } from './logic';
import type { UltimateAction, UltimateState } from './types';

const EMPTY_BOARD = (): Board => [null, null, null, null, null, null, null, null, null];

export const INITIAL_ULTIMATE_STATE: UltimateState = {
  boards: Array.from({ length: 9 }, EMPTY_BOARD),
  localWinners: Array(9).fill(null),
  activeBoard: null, // first move: any board
  currentPlayer: 'X',
  status: 'playing',
  winner: null,
  winLine: null,
  scores: { X: 0, O: 0, draws: 0 },
};

export function ultimateReducer(state: UltimateState, action: UltimateAction): UltimateState {
  switch (action.type) {
    case 'MAKE_MOVE': {
      const { boardIndex, cellIndex } = action;

      if (state.status !== 'playing') return state;
      if (state.activeBoard !== null && state.activeBoard !== boardIndex) return state;
      if (state.localWinners[boardIndex] !== null) return state;
      if (state.boards[boardIndex][cellIndex] !== null) return state;

      // Apply move
      const newBoards = state.boards.map((b, i) =>
        i === boardIndex
          ? (b.map((c, j) => (j === cellIndex ? state.currentPlayer : c)) as Board)
          : b
      );

      // Check local board outcome
      const localResult = checkWinner(newBoards[boardIndex]);
      const localFull = isBoardFull(newBoards[boardIndex]);
      const newLocalWinners = [...state.localWinners] as (Player | 'draw' | null)[];
      if (localResult) {
        newLocalWinners[boardIndex] = localResult.winner;
      } else if (localFull) {
        newLocalWinners[boardIndex] = 'draw';
      }

      // Check meta win
      const metaResult = checkMetaWinner(newLocalWinners);
      if (metaResult) {
        return {
          ...state,
          boards: newBoards,
          localWinners: newLocalWinners,
          activeBoard: null,
          status: 'won',
          winner: metaResult.winner,
          winLine: metaResult.line,
          scores: {
            ...state.scores,
            [metaResult.winner]: state.scores[metaResult.winner] + 1,
          },
        };
      }

      if (isMetaComplete(newLocalWinners)) {
        return {
          ...state,
          boards: newBoards,
          localWinners: newLocalWinners,
          activeBoard: null,
          status: 'draw',
          scores: { ...state.scores, draws: state.scores.draws + 1 },
        };
      }

      return {
        ...state,
        boards: newBoards,
        localWinners: newLocalWinners,
        activeBoard: getNextActiveBoard(newLocalWinners, cellIndex),
        currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
      };
    }

    case 'TIMEOUT': {
      if (state.status !== 'playing') return state;
      const allCells = state.boards.flat();
      const xCount = allCells.filter((c) => c === 'X').length;
      const oCount = allCells.filter((c) => c === 'O').length;
      if (xCount === oCount) {
        return { ...state, status: 'draw', scores: { ...state.scores, draws: state.scores.draws + 1 } };
      }
      const winner: Player = xCount > oCount ? 'X' : 'O';
      return {
        ...state,
        status: 'won',
        winner,
        winLine: null,
        scores: { ...state.scores, [winner]: state.scores[winner] + 1 },
      };
    }

    case 'RESET_GAME':
      return { ...INITIAL_ULTIMATE_STATE, scores: state.scores };

    default:
      return state;
  }
}
