'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  DAILY_WIN_GOAL,
  LS_DAY_STREAK,
  LS_DAILY,
  readDayStreak,
  readDaily,
  today,
  yesterday,
} from '@/lib/daily';

interface DailyState {
  winsToday: number;
  goalComplete: boolean;
  dayStreak: number;
}

const DEFAULT: DailyState = { winsToday: 0, goalComplete: false, dayStreak: 0 };

export function useDaily() {
  const [state, setState] = useState<DailyState>(DEFAULT);

  useEffect(() => {
    const daily = readDaily();
    const streak = readDayStreak();
    setState({
      winsToday: daily.winsToday,
      goalComplete: daily.winsToday >= DAILY_WIN_GOAL,
      dayStreak: streak.dayStreak,
    });
  }, []);

  const recordGame = useCallback((result: 'win' | 'draw' | 'loss') => {
    const t = today();

    // Update day streak (once per day)
    setState((prev) => {
      const streakData = readDayStreak();
      let newDayStreak = prev.dayStreak;

      if (streakData.lastDate !== t) {
        if (streakData.lastDate === yesterday()) {
          newDayStreak = streakData.dayStreak + 1;
        } else {
          newDayStreak = 1;
        }
        const updated = { lastDate: t, dayStreak: newDayStreak };
        localStorage.setItem(LS_DAY_STREAK, JSON.stringify(updated));
      }

      // Update daily wins
      const daily = readDaily();
      const newWins = result === 'win' ? daily.winsToday + 1 : daily.winsToday;
      const updated = { date: t, winsToday: newWins };
      localStorage.setItem(LS_DAILY, JSON.stringify(updated));

      return {
        winsToday: newWins,
        goalComplete: newWins >= DAILY_WIN_GOAL,
        dayStreak: newDayStreak,
      };
    });
  }, []);

  return { ...state, recordGame };
}
