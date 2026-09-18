import React from 'react';
import { 
  Flame, 
  CheckCircle2, 
  Circle, 
  Plus, 
  Award, 
  Sun, 
  Zap, 
  Moon 
} from 'lucide-react';
import { usePlanner } from '../../../context/PlannerContext';
import { RoutineTime } from '../../../types/habits';

export const HabitsView: React.FC = () => {
  const { state, toggleHabitToday, toggleHabitForDate, openQuickAdd } = usePlanner();

  const todayStr = new Date().toISOString().split('T')[0];

  // Generate last 30 days array for the heat matrix
  const last30Days: string[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    last30Days.push(d.toISOString().split('T')[0]);
  }

  const routines: { id: RoutineTime; label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
    { id: 'morning', label: 'Morning Routines', icon: Sun },
    { id: 'deep_work', label: 'Deep Work & Study Routines', icon: Zap },
    { id: 'evening', label: 'Evening Review & Mindset', icon: Moon },
  ];

  return (
    <div className="view-container habits-view">
      {/* Top Hero */}
      <div className="habits-hero-card">
        <div className="habits-hero-left">
          <div className="habits-hero-badge">
            <Flame size={15} />
            <span>Consistency Engine</span>
          </div>
          <h2 className="habits-hero-title">Routines Build Champions</h2>
          <p className="habits-hero-subtitle">
            Consistent daily habits compound into top Bac grades, German fluency, and production-grade engineering mastery.
          </p>
        </div>

        <div className="habits-stats-row">
          <div className="habit-stat-box">
            <span className="stat-label">Total Routines</span>
            <span className="stat-value">{state.habits.length}</span>
            <span className="stat-sub">Active daily tracks</span>
          </div>

          <div className="habit-stat-box">
            <span className="stat-label">Best Streak</span>
            <span className="stat-value">
              {Math.max(...state.habits.map(h => h.longestStreak), 0)}
            </span>
            <span className="stat-sub">Consecutive days</span>
          </div>

          <div className="habit-stat-box">
            <span className="stat-label">Today's Check-in</span>
            <span className="stat-value">
              {state.habits.filter(h => h.completedDates.includes(todayStr)).length}/{state.habits.length}
            </span>
            <span className="stat-sub">Routines finished</span>
          </div>
        </div>
      </div>

      {/* Routine Sections */}
      <div className="routines-stack">
        {routines.map(routine => {
          const RoutineIcon = routine.icon;
          const habitsInRoutine = state.habits.filter(h => h.routineTime === routine.id);

          return (
            <div key={routine.id} className="card routine-group-card">
              <div className="routine-group-header">
                <div className="routine-title-wrap">
                  <RoutineIcon size={18} className="routine-icon" />
                  <h3 className="routine-group-title">{routine.label}</h3>
                  <span className="badge badge-gray">{habitsInRoutine.length} habits</span>
                </div>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => openQuickAdd({ type: 'habit' })}
                >
                  <Plus size={13} />
                  <span>Add Habit</span>
                </button>
              </div>

              <div className="habits-list">
                {habitsInRoutine.map(habit => {
                  const isDoneToday = habit.completedDates.includes(todayStr);

                  return (
                    <div key={habit.id} className="habit-row-item">
                      <div className="habit-left-info">
                        <button
                          className={`habit-big-check ${isDoneToday ? 'checked' : ''}`}
                          onClick={() => toggleHabitToday(habit.id)}
                          aria-label="Toggle habit"
                        >
                          {isDoneToday ? <CheckCircle2 size={24} /> : <Circle size={24} />}
                        </button>
                        <div className="habit-labels">
                          <span className={`habit-primary-name ${isDoneToday ? 'completed' : ''}`}>
                            {habit.name}
                          </span>
                          <div className="habit-streak-tags">
                            <span className="streak-pill current-streak">
                              <Flame size={12} fill="currentColor" />
                              {habit.currentStreak} day streak
                            </span>
                            <span className="streak-pill longest-streak">
                              <Award size={12} />
                              Record: {habit.longestStreak}d
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 30-Day Heat Matrix */}
                      <div className="habit-heatmap-col">
                        <span className="heatmap-caption">Last 30 Days</span>
                        <div className="heatmap-dots-grid">
                          {last30Days.map(dateStr => {
                            const isCompleted = habit.completedDates.includes(dateStr);
                            const isToday = dateStr === todayStr;
                            return (
                              <div
                                key={dateStr}
                                className={`heatmap-dot ${isCompleted ? 'active' : ''} ${isToday ? 'today-dot' : ''}`}
                                onClick={() => toggleHabitForDate(habit.id, dateStr)}
                                title={`${dateStr}: ${isCompleted ? 'Completed' : 'Missed'} (Click to toggle)`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
