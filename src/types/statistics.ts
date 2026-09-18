export interface SubjectStudyStat {
  subjectId: string;
  name: string;
  hours: number;
  colorVar: string;
  percentage: number;
}

export interface WeeklyActivityStat {
  day: string; // 'Mon', 'Tue', etc.
  focusHours: number;
  tasksCompleted: number;
}

export interface BacReadinessStat {
  overallReadiness: number; // 0 - 100%
  averageWeightedGrade: number; // out of 20
  chaptersCompleted: number;
  totalChapters: number;
  weaknessesOpen: number;
  weaknessesResolved: number;
}

export interface AnalyticsSummary {
  totalFocusMinutes: number;
  totalTasksCompleted: number;
  activeHabitStreakAvg: number;
  bacReadiness: BacReadinessStat;
  subjectDistribution: SubjectStudyStat[];
  weeklyActivity: WeeklyActivityStat[];
}
