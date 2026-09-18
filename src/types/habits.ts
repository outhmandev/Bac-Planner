import { BaseItem } from './common';

export type RoutineTime = 'morning' | 'deep_work' | 'evening' | 'anytime';

export interface Habit extends BaseItem {
  name: string;
  category: 'study' | 'german' | 'code' | 'health' | 'mindset';
  routineTime: RoutineTime;
  targetPerWeek: number; // e.g., 7 for daily
  currentStreak: number;
  longestStreak: number;
  colorVar?: string;
  completedDates: string[]; // YYYY-MM-DD
}
