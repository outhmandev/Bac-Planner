import React from 'react';
import { 
  BarChart3, 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  Flame, 
  Award,
  TrendingUp,
  BookOpen
} from 'lucide-react';
import { usePlanner } from '../../../context/PlannerContext';
import { computeAnalytics } from '../../../services/statisticsEngine';
import { ProgressBar } from '../../common/ProgressBar';

export const StatisticsView: React.FC = () => {
  const { state } = usePlanner();

  const analytics = computeAnalytics(state);
  const { bacReadiness, subjectDistribution, weeklyActivity } = analytics;

  return (
    <div className="view-container statistics-view">
      {/* Top Hero Banner */}
      <div className="stats-hero-card">
        <div className="stats-hero-left">
          <div className="stats-hero-badge">
            <BarChart3 size={15} />
            <span>Actionable Analytics Engine</span>
          </div>
          <h2 className="stats-hero-title">Where Your Time & Effort Go</h2>
          <p className="stats-hero-subtitle">
            Transparent, calculated metrics derived from your actual Bac study hours, German flashcards, software tasks, and habit consistency.
          </p>
        </div>

        <div className="stats-overview-counters">
          <div className="counter-box">
            <span className="counter-label">Total Focus Time</span>
            <span className="counter-value">
              {Math.round(analytics.totalFocusMinutes / 60)} hrs
            </span>
            <span className="counter-sub">{analytics.totalFocusMinutes} mins recorded</span>
          </div>

          <div className="counter-box">
            <span className="counter-label">Completed Tasks</span>
            <span className="counter-value">{analytics.totalTasksCompleted}</span>
            <span className="counter-sub">Across all projects</span>
          </div>

          <div className="counter-box">
            <span className="counter-label">Habit Consistency</span>
            <span className="counter-value">{analytics.activeHabitStreakAvg} days</span>
            <span className="counter-sub">Average streak</span>
          </div>
        </div>
      </div>

      <div className="stats-grid-2col">
        {/* BAC 2027 READINESS GAUGE */}
        <div className="card bac-readiness-card">
          <div className="card-header-row">
            <div>
              <div className="readiness-title-group">
                <GraduationCap size={18} className="text-rose" />
                <h3 className="card-heading">Bac 2027 Readiness Index</h3>
              </div>
              <span className="card-subheading">Weighted composite of syllabus mastery, exam grades & weaknesses</span>
            </div>
            <div className="readiness-score-pill">
              <span className="score-number">{bacReadiness.overallReadiness}%</span>
              <span className="score-label">Readiness</span>
            </div>
          </div>

          <ProgressBar value={bacReadiness.overallReadiness} height={10} />

          <div className="readiness-factors-grid">
            <div className="factor-box">
              <span className="factor-label">Weighted Bac Average</span>
              <span className="factor-val font-mono">{bacReadiness.averageWeightedGrade} / 20</span>
              <span className="factor-desc">Target: &gt;= 17.5 Mention Très Bien</span>
            </div>

            <div className="factor-box">
              <span className="factor-label">Syllabus Chapters Mastered</span>
              <span className="factor-val font-mono">
                {bacReadiness.chaptersCompleted} / {bacReadiness.totalChapters}
              </span>
              <span className="factor-desc">Across all {state.subjects.length} National subjects</span>
            </div>

            <div className="factor-box">
              <span className="factor-label">Weaknesses Resolved</span>
              <span className="factor-val font-mono">
                {bacReadiness.weaknessesResolved} / {bacReadiness.weaknessesResolved + bacReadiness.weaknessesOpen}
              </span>
              <span className="factor-desc">{bacReadiness.weaknessesOpen} active action plans</span>
            </div>
          </div>
        </div>

        {/* SUBJECT STUDY HOURS BREAKDOWN */}
        <div className="card subject-study-card">
          <div className="card-header-row">
            <div>
              <h3 className="card-heading">Study Distribution by Subject</h3>
              <span className="card-subheading">Hours logged via pomodoro and revision slots</span>
            </div>
            <Clock size={18} className="text-muted" />
          </div>

          <div className="subjects-bars-list">
            {subjectDistribution.map(item => (
              <div key={item.subjectId} className="subject-bar-row">
                <div className="subject-bar-header">
                  <span className="subject-bar-name">{item.name}</span>
                  <span className="subject-bar-hours font-mono">
                    {item.hours} hrs ({item.percentage}%)
                  </span>
                </div>
                <div className="progress-track" style={{ height: '7px' }}>
                  <div 
                    className="progress-fill"
                    style={{ 
                      width: `${item.percentage}%`,
                      backgroundColor: item.colorVar
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* WEEKLY ACTIVITY TREND */}
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <div className="card-header-row">
          <div>
            <h3 className="card-heading">Weekly Focus & Completion Velocity</h3>
            <span className="card-subheading">Activity rhythm over the past 7 days</span>
          </div>
          <TrendingUp size={18} className="text-muted" />
        </div>

        <div className="weekly-activity-grid">
          {weeklyActivity.map(day => (
            <div key={day.day} className="day-velocity-col">
              <div className="day-bar-container">
                <div 
                  className="day-bar-fill" 
                  style={{ height: `${Math.min(100, day.focusHours * 22)}%` }}
                  title={`${day.day}: ${day.focusHours}h focus, ${day.tasksCompleted} tasks done`}
                />
              </div>
              <span className="day-label">{day.day}</span>
              <span className="day-hours font-mono">{day.focusHours}h</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
