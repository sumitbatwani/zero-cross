import { checkWinner } from '../logic';
import type { Board, Player } from '../types';

export function checkMetaWinner(
  localWinners: (Player | 'draw' | null)[]
): { winner: Player; line: number[] } | null {
  // Treat localWinners as a Board — only Player wins count, draws = null
  const metaBoard = localWinners.map((w) =>
    w === 'X' || w === 'O' ? w : null
  ) as Board;
  return checkWinner(metaBoard);
}

export function isMetaComplete(localWinners: (Player | 'draw' | null)[]): boolean {
  return localWinners.every((w) => w !== null);
}

// Determine next active board after playing in cellIndex
// If that board is already finished, return null (free choice)
export function getNextActiveBoard(
  localWinners: (Player | 'draw' | null)[],
  cellIndex: number
): number | null {
  return localWinners[cellIndex] === null ? cellIndex : null;
}
