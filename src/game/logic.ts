import type { Board, Player } from './types';

const WIN_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function checkWinner(board: Board): { winner: Player; line: number[] } | null {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line };
    }
  }
  return null;
}

export function isBoardFull(board: Board): boolean {
  return board.every((cell) => cell !== null);
}

function minimax(board: Board, isMaximizing: boolean, depth: number): number {
  const result = checkWinner(board);
  if (result) return result.winner === 'O' ? 10 - depth : depth - 10;
  if (isBoardFull(board)) return 0;

  const scores: number[] = [];
  for (let i = 0; i < 9; i++) {
    if (board[i] !== null) continue;
    const next = [...board] as Board;
    next[i] = isMaximizing ? 'O' : 'X';
    scores.push(minimax(next, !isMaximizing, depth + 1));
  }
  return isMaximizing ? Math.max(...scores) : Math.min(...scores);
}

export function getBestMove(board: Board): number {
  let bestScore = -Infinity;
  let bestIndex = -1;

  for (let i = 0; i < 9; i++) {
    if (board[i] !== null) continue;
    const next = [...board] as Board;
    next[i] = 'O';
    const score = minimax(next, false, 0);
    if (score > bestScore) {
      bestScore = score;
      bestIndex = i;
    }
  }
  return bestIndex;
}
