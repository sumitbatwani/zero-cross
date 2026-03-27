export const DAILY_WIN_GOAL = 3;
export const LS_DAILY = 'zc-daily';
export const LS_DAY_STREAK = 'zc-day-streak';

export interface DailyData {
  date: string;      // YYYY-MM-DD
  winsToday: number;
}

export interface DayStreakData {
  lastDate: string;  // YYYY-MM-DD
  dayStreak: number;
}

export function today(): string {
  return new Date().toISOString().slice(0, 10);
}

export function yesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export function readDaily(): DailyData {
  try {
    const raw = localStorage.getItem(LS_DAILY);
    if (!raw) return { date: today(), winsToday: 0 };
    const parsed = JSON.parse(raw) as DailyData;
    // Reset if it's a new day
    if (parsed.date !== today()) return { date: today(), winsToday: 0 };
    return parsed;
  } catch {
    return { date: today(), winsToday: 0 };
  }
}

export function readDayStreak(): DayStreakData {
  try {
    const raw = localStorage.getItem(LS_DAY_STREAK);
    if (!raw) return { lastDate: '', dayStreak: 0 };
    return JSON.parse(raw) as DayStreakData;
  } catch {
    return { lastDate: '', dayStreak: 0 };
  }
}
