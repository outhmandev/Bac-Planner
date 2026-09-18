import type { PlannerState } from './storage';
import type { AnalyticsSummary, SubjectStudyStat, WeeklyActivityStat, BacReadinessStat } from '../types/statistics';

export function computeAnalytics(state: PlannerState): AnalyticsSummary {
  // 1. Total Focus Minutes
  const totalFocusMinutes = state.focusSessions.reduce((acc, sess) => acc + sess.durationMinutes, 0);

  // 2. Tasks completed
  const totalTasksCompleted = state.tasks.filter(t => t.status === 'done').length;

  // 3. Habit consistency
  const activeHabitStreakAvg = state.habits.length > 0 
    ? Math.round(state.habits.reduce((acc, h) => acc + h.currentStreak, 0) / state.habits.length)
    : 0;

  // 4. Bac 2027 Readiness
  const allChapters = state.subjects.flatMap(s => s.chapters);
  const totalChapters = allChapters.length;
  const chaptersCompleted = allChapters.filter(c => c.completed).length;

  const allExamsWithGrades = state.exams.filter(e => typeof e.actualGrade === 'number');
  let weightedGradeSum = 0;
  let totalCoefficient = 0;

  allExamsWithGrades.forEach(e => {
    weightedGradeSum += (e.actualGrade || 0) * e.coefficient;
    totalCoefficient += e.coefficient;
  });

  const averageWeightedGrade = totalCoefficient > 0 
    ? Number((weightedGradeSum / totalCoefficient).toFixed(2)) 
    : 0;

  const totalWeaknesses = state.weaknesses.length;
  const weaknessesResolved = state.weaknesses.filter(w => w.resolved).length;
  const weaknessesOpen = totalWeaknesses - weaknessesResolved;

  // Real readiness calculation based purely on user's actual progress:
  const syllabusFactor = totalChapters > 0 ? (chaptersCompleted / totalChapters) * 100 : 0;
  const gradeFactor = (averageWeightedGrade / 20) * 100;
  const weaknessFactor = totalWeaknesses > 0 ? (weaknessesResolved / totalWeaknesses) * 100 : 0;

  let overallReadiness = 0;
  if (totalChapters > 0 || allExamsWithGrades.length > 0) {
    overallReadiness = Math.min(100, Math.round(syllabusFactor * 0.5 + gradeFactor * 0.35 + weaknessFactor * 0.15));
  }

  const bacReadiness: BacReadinessStat = {
    overallReadiness,
    averageWeightedGrade,
    chaptersCompleted,
    totalChapters,
    weaknessesOpen,
    weaknessesResolved
  };

  // 5. Subject Study Distribution (strictly computed from hours studied)
  const totalSubjectHours = state.subjects.reduce((acc, s) => acc + s.hoursStudied, 0);
  const subjectDistribution: SubjectStudyStat[] = state.subjects.map(s => ({
    subjectId: s.id,
    name: s.name,
    hours: s.hoursStudied,
    colorVar: s.colorVar,
    percentage: totalSubjectHours > 0 ? Math.round((s.hoursStudied / totalSubjectHours) * 100) : 0
  }));

  // 6. Weekly Activity (computed from real focus sessions and completed tasks over the last 7 days)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const today = new Date();
  const currentDayIdx = (today.getDay() + 6) % 7; // Monday = 0

  const weeklyActivity: WeeklyActivityStat[] = days.map((day, idx) => {
    // Calculate date for this day of current week
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() - (currentDayIdx - idx));
    const dateStr = targetDate.toISOString().split('T')[0];

    // Real focus minutes on this date
    const dayFocusMinutes = state.focusSessions
      .filter(s => s.completedAt && s.completedAt.startsWith(dateStr))
      .reduce((acc, s) => acc + s.durationMinutes, 0);

    // Real tasks completed on this date
    const dayTasksCompleted = state.tasks
      .filter(t => t.completedAt && t.completedAt.startsWith(dateStr))
      .length;

    return {
      day,
      focusHours: Number((dayFocusMinutes / 60).toFixed(1)),
      tasksCompleted: dayTasksCompleted
    };
  });

  return {
    totalFocusMinutes,
    totalTasksCompleted,
    activeHabitStreakAvg,
    bacReadiness,
    subjectDistribution,
    weeklyActivity
  };
}
