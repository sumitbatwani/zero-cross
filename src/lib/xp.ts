export interface Level {
  name: string;
  minXP: number;
  maxXP: number; // exclusive, Infinity for last level
}

export const LEVELS: Level[] = [
  { name: 'Beginner', minXP: 0,    maxXP: 100  },
  { name: 'Amateur',  minXP: 100,  maxXP: 300  },
  { name: 'Pro',      minXP: 300,  maxXP: 600  },
  { name: 'Expert',   minXP: 600,  maxXP: 1000 },
  { name: 'Master',   minXP: 1000, maxXP: 1500 },
  { name: 'Legend',   minXP: 1500, maxXP: Infinity },
];

export const XP_WIN   = 10;
export const XP_DRAW  = 3;
export const XP_STREAK_BONUS = 5; // extra XP per streak level, capped at 4 streak

export interface XPState {
  xp: number;
  streak: number; // consecutive wins
}

export const LS_XP = 'zc-xp';

export function getLevel(xp: number): Level {
  return [...LEVELS].reverse().find((l) => xp >= l.minXP) ?? LEVELS[0];
}

export function getLevelProgress(xp: number): { level: Level; progress: number; xpInLevel: number; xpForLevel: number } {
  const level = getLevel(xp);
  if (level.maxXP === Infinity) {
    return { level, progress: 1, xpInLevel: xp - level.minXP, xpForLevel: 0 };
  }
  const xpInLevel = xp - level.minXP;
  const xpForLevel = level.maxXP - level.minXP;
  return { level, progress: xpInLevel / xpForLevel, xpInLevel, xpForLevel };
}

export function calcXPGain(result: 'win' | 'draw' | 'loss', streak: number): number {
  if (result === 'loss') return 0;
  if (result === 'draw') return XP_DRAW;
  const streakBonus = Math.min(streak, 4) * XP_STREAK_BONUS;
  return XP_WIN + streakBonus;
}
