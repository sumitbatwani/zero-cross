import { describe, expect, it } from 'vitest';
import { checkWinner, getBestMove, isBoardFull } from './logic';
import type { Board } from './types';

describe('checkWinner', () => {
  it('detects row win', () => {
    const board: Board = ['X', 'X', 'X', null, null, null, null, null, null];
    expect(checkWinner(board)).toEqual({ winner: 'X', line: [0, 1, 2] });
  });

  it('detects column win', () => {
    const board: Board = ['O', null, null, 'O', null, null, 'O', null, null];
    expect(checkWinner(board)).toEqual({ winner: 'O', line: [0, 3, 6] });
  });

  it('detects diagonal win', () => {
    const board: Board = ['X', null, null, null, 'X', null, null, null, 'X'];
    expect(checkWinner(board)).toEqual({ winner: 'X', line: [0, 4, 8] });
  });

  it('returns null for no winner', () => {
    const board: Board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', null];
    expect(checkWinner(board)).toBeNull();
  });
});

describe('isBoardFull', () => {
  it('returns true when all cells filled', () => {
    const board: Board = ['X', 'O', 'X', 'O', 'X', 'O', 'O', 'X', 'O'];
    expect(isBoardFull(board)).toBe(true);
  });

  it('returns false when a cell is empty', () => {
    const board: Board = ['X', 'O', null, 'O', 'X', 'O', 'O', 'X', 'O'];
    expect(isBoardFull(board)).toBe(false);
  });
});

describe('getBestMove', () => {
  it('blocks opponent from winning', () => {
    // X is about to win at index 2 — O must block
    const board: Board = ['X', 'X', null, 'O', null, null, null, null, null];
    expect(getBestMove(board)).toBe(2);
  });

  it('takes the winning move when available', () => {
    // O at 2 and 6 — wins at index 4 (anti-diagonal: 2, 4, 6)
    const board: Board = ['X', 'X', 'O', 'X', null, null, 'O', null, null];
    expect(getBestMove(board)).toBe(4);
  });
});
