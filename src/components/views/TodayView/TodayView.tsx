import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Calendar, 
  AlertCircle, 
  Plus, 
  Play, 
  Flame, 
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { usePlanner } from '../../../context/PlannerContext';
import { PriorityBadge } from '../../common/Badge';

export const TodayView: React.FC = () => {
  const { 
    state, 
    toggleTaskComplete, 
    toggleSubtask, 
    toggleHabitToday, 
    openQuickAdd, 
    setActiveView
  } = usePlanner();

  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);
  const todayStr = new Date().toISOString().split('T')[0];

  // 1. Overdue tasks
  const overdueTasks = state.tasks.filter(t => 
    t.status !== 'done' && t.dueDate && t.dueDate < todayStr
  );

  // 2. Today's tasks
  const todayTasks = state.tasks.filter(t => 
    t.dueDate === todayStr || (!t.dueDate && t.priority === 'p1' && t.status !== 'done')
  );

  // 3. Completed today
  const completedTodayCount = state.tasks.filter(t => 
    t.status === 'done' && t.completedAt && t.completedAt.startsWith(todayStr)
  ).length;

  // 4. Today's habits
  const habitsDoneToday = state.habits.filter(h => h.completedDates.includes(todayStr)).length;
  const habitPercentage = state.habits.length > 0 
    ? Math.round((habitsDoneToday / state.habits.length) * 100) 
    : 0;

  // 5. Today's actual focus minutes
  const todayFocusMinutes = state.focusSessions
    .filter(s => s.completedAt && s.completedAt.startsWith(todayStr))
    .reduce((acc, s) => acc + s.durationMinutes, 0);

  // 6. Upcoming exams & deadlines in next 14 days
  const upcomingEvents = state.events
    .filter(e => e.startDate >= todayStr)
    .sort((a, b) => a.startDate.localeCompare(b.startDate))
    .slice(0, 4);

  // 7. Today's schedule slots (events and timed tasks)
  const todayEvents = state.events
    .filter(e => e.startDate === todayStr)
    .map(e => ({
      id: e.id,
      title: e.title,
      desc: e.description || '',
      time: e.startTime ? `${e.startTime}${e.endTime ? ' - ' + e.endTime : ''}` : 'All Day'
    }));

  const todayTimedTasks = state.tasks
    .filter(t => t.dueDate === todayStr && t.dueTime)
    .map(t => ({
      id: t.id,
      title: t.title,
      desc: t.description || '',
      time: t.dueTime!
    }));

  const todayTimelineItems = [...todayEvents, ...todayTimedTasks];

  return (
    <div className="view-container today-view">
      {/* Intention & Greeting Banner */}
      <div className="today-hero-card">
        <div className="today-hero-content">
          <div className="today-hero-badge">
            <Sparkles size={14} />
            <span>Bac 2027 & German Command</span>
          </div>
          <h2 className="today-hero-title">Stay focused on what moves the needle today.</h2>
          <p className="today-hero-subtitle">
            Prioritize your Bac 2027 preparation, maintain your German daily habit consistency, and advance your engineering projects.
          </p>
        </div>

        <div className="today-quick-stats-grid">
          <div className="quick-stat-box">
            <span className="stat-label">Tasks Today</span>
            <span className="stat-value">{todayTasks.length}</span>
            <span className="stat-sub">{completedTodayCount} completed</span>
          </div>

          <div className="quick-stat-box">
            <span className="stat-label">Habit Streak</span>
            <span className="stat-value">{habitPercentage}%</span>
            <span className="stat-sub">{habitsDoneToday} of {state.habits.length} routines</span>
          </div>

          <div className="quick-stat-box">
            <span className="stat-label">Overdue</span>
            <span className={`stat-value ${overdueTasks.length > 0 ? 'text-danger' : ''}`}>
              {overdueTasks.length}
            </span>
            <span className="stat-sub">{overdueTasks.length > 0 ? 'Needs attention' : 'All clear'}</span>
          </div>

          <div className="quick-stat-box">
            <span className="stat-label">Active Focus</span>
            <span className="stat-value">{todayFocusMinutes}m</span>
            <span className="stat-sub">Logged today</span>
          </div>
        </div>
      </div>

      {/* OVERDUE ALERT SECTION (Only renders if there are overdue items) */}
      {overdueTasks.length > 0 && (
        <div className="overdue-card">
          <div className="overdue-header">
            <AlertCircle size={18} className="overdue-icon" />
            <span className="overdue-title">Overdue Items ({overdueTasks.length})</span>
          </div>
          <div className="task-list">
            {overdueTasks.map(task => (
              <div key={task.id} className="task-row overdue-row">
                <button 
                  className="task-check-btn" 
                  onClick={() => toggleTaskComplete(task.id)}
                >
                  <Circle size={18} />
                </button>
                <div className="task-body">
                  <span className="task-title">{task.title}</span>
                  <span className="task-meta-due text-danger">Due {task.dueDate}</span>
                </div>
                <PriorityBadge priority={task.priority} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MAIN TWO-COLUMN WORKSPACE */}
      <div className="today-grid-layout">
        {/* LEFT COLUMN: PRIORITIES & SCHEDULE */}
        <div className="today-main-col">
          {/* TODAY'S PRIORITIES */}
          <div className="card">
            <div className="card-header-row">
              <div>
                <h3 className="card-heading">Today's Focus & Priorities</h3>
                <span className="card-subheading">Ranked tasks for maximum Bac & coding impact</span>
              </div>
              <button 
                className="btn btn-secondary btn-sm"
                onClick={() => openQuickAdd({ type: 'task' })}
              >
                <Plus size={14} />
                <span>Add Task</span>
              </button>
            </div>

            <div className="task-list">
              {todayTasks.length === 0 ? (
                <div className="empty-state-simple">
                  <CheckCircle2 size={24} className="text-muted" />
                  <p>No tasks scheduled for today. Press <strong>Q</strong> or click <strong>Add Task</strong> to set today's priority.</p>
                </div>
              ) : (
                todayTasks.map(task => {
                  const isDone = task.status === 'done';
                  const isExpanded = expandedTaskId === task.id;
                  const subject = state.subjects.find(s => s.id === task.subjectId);
                  const project = state.projects.find(p => p.id === task.projectId);

                  return (
                    <div key={task.id} className={`task-card-item ${isDone ? 'task-done' : ''}`}>
                      <div className="task-main-row">
                        <button 
                          className={`task-check-btn ${isDone ? 'checked' : ''}`}
                          onClick={() => toggleTaskComplete(task.id)}
                          aria-label="Toggle task completion"
                        >
                          {isDone ? <CheckCircle2 size={20} className="check-done-icon" /> : <Circle size={20} />}
                        </button>

                        <div className="task-info" onClick={() => setExpandedTaskId(isExpanded ? null : task.id)}>
                          <span className="task-name">{task.title}</span>

                          <div className="task-meta-tags">
                            {subject && (
                              <span 
                                className="tag-pill tag-subject"
                                style={{ backgroundColor: subject.bgVar, color: subject.colorVar }}
                              >
                                {subject.name}
                              </span>
                            )}
                            {project && (
                              <span className="tag-pill tag-project">
                                {project.name}
                              </span>
                            )}
                            {task.dueTime && (
                              <span className="tag-pill tag-time">
                                <Clock size={11} />
                                {task.dueTime}
                              </span>
                            )}
                            {task.subtasks.length > 0 && (
                              <span className="tag-pill tag-subtask-count">
                                {task.subtasks.filter(s => s.completed).length}/{task.subtasks.length} subtasks
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="task-right-actions">
                          <PriorityBadge priority={task.priority} />
                          {task.subtasks.length > 0 && (
                            <button 
                              className="btn-icon btn-subtle btn-sm"
                              onClick={() => setExpandedTaskId(isExpanded ? null : task.id)}
                            >
                              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Subtasks Accordion */}
                      {isExpanded && task.subtasks.length > 0 && (
                        <div className="task-subtasks-drawer">
                          {task.subtasks.map(sub => (
                            <div key={sub.id} className="subtask-row">
                              <button
                                className={`subtask-check ${sub.completed ? 'checked' : ''}`}
                                onClick={() => toggleSubtask(task.id, sub.id)}
                              >
                                {sub.completed ? <CheckCircle2 size={14} /> : <Circle size={14} />}
                              </button>
                              <span className={`subtask-title ${sub.completed ? 'completed' : ''}`}>
                                {sub.title}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* TIMELINE / TODAY'S SESSIONS */}
          <div className="card" style={{ marginTop: '1.25rem' }}>
            <div className="card-header-row">
              <div>
                <h3 className="card-heading">Today's Schedule & Study Slots</h3>
                <span className="card-subheading">Time-blocked study sessions, exams, and appointments</span>
              </div>
              <button 
                className="btn btn-subtle btn-sm"
                onClick={() => setActiveView('calendar')}
              >
                <span>Full Calendar</span>
                <ArrowUpRight size={14} />
              </button>
            </div>

            <div className="timeline-list">
              {todayTimelineItems.length === 0 ? (
                <div className="empty-state-simple">
                  <Clock size={22} className="text-muted" />
                  <p>No scheduled events or study blocks for today. Add an event or timed task to block your calendar.</p>
                </div>
              ) : (
                todayTimelineItems.map(item => (
                  <div key={item.id} className="timeline-slot">
                    <span className="time-badge">{item.time}</span>
                    <div className="timeline-content">
                      <span className="timeline-title">{item.title}</span>
                      {item.desc && <span className="timeline-desc">{item.desc}</span>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: HABITS & UPCOMING DEADLINES */}
        <div className="today-side-col">
          {/* HABIT ROUTINES CARD */}
          <div className="card">
            <div className="card-header-row">
              <div>
                <h3 className="card-heading">Daily Habits</h3>
                <span className="card-subheading">{habitsDoneToday} of {state.habits.length} routines completed</span>
              </div>
              <span className="habit-fire-badge">
                <Flame size={14} />
                <span>Streaks</span>
              </span>
            </div>

            <div className="habit-checklist">
              {state.habits.length === 0 ? (
                <div className="empty-state-simple">
                  <Flame size={20} className="text-muted" />
                  <p>No habits tracked yet. Click below to add morning, deep work, or evening routines.</p>
                  <button 
                    className="btn btn-secondary btn-sm"
                    style={{ marginTop: '0.5rem' }}
                    onClick={() => openQuickAdd({ type: 'habit' })}
                  >
                    <Plus size={13} />
                    <span>Create Habit</span>
                  </button>
                </div>
              ) : (
                state.habits.map(habit => {
                  const isChecked = habit.completedDates.includes(todayStr);
                  return (
                    <div key={habit.id} className="habit-check-row">
                      <button
                        className={`habit-toggle-btn ${isChecked ? 'completed' : ''}`}
                        onClick={() => toggleHabitToday(habit.id)}
                      >
                        {isChecked ? <CheckCircle2 size={18} /> : <Circle size={18} />}
                      </button>
                      <div className="habit-info">
                        <span className={`habit-name ${isChecked ? 'completed' : ''}`}>
                          {habit.name}
                        </span>
                        <span className="habit-sublabel">
                          {habit.routineTime.toUpperCase()} • {habit.currentStreak} day streak
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* QUICK POMODORO LAUNCHER */}
          <div className="card focus-quick-card" style={{ marginTop: '1.25rem' }}>
            <div className="focus-quick-content">
              <span className="focus-quick-tag">POMODORO CHAMBER</span>
              <h4 className="focus-quick-title">Ready for Deep Study?</h4>
              <p className="focus-quick-desc">
                Launch a focused session linked to your Bac subjects or software projects.
              </p>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => setActiveView('focus')}
              >
                <Play size={14} fill="currentColor" />
                <span>Start Focus Session</span>
              </button>
            </div>
          </div>

          {/* UPCOMING BAC EXAMS & DEADLINES */}
          <div className="card" style={{ marginTop: '1.25rem' }}>
            <div className="card-header-row">
              <div>
                <h3 className="card-heading">Next 14 Days</h3>
                <span className="card-subheading">Upcoming Bac exams & project milestones</span>
              </div>
              <Calendar size={16} className="text-muted" />
            </div>

            <div className="upcoming-events-list">
              {upcomingEvents.length === 0 ? (
                <div className="empty-state-simple">
                  <Calendar size={20} className="text-muted" />
                  <p>No upcoming exams or deadlines in the next 14 days.</p>
                </div>
              ) : (
                upcomingEvents.map(evt => (
                  <div key={evt.id} className="upcoming-item">
                    <div className="upcoming-date-box">
                      <span className="upcoming-month">
                        {new Date(evt.startDate).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className="upcoming-day">
                        {new Date(evt.startDate).getDate()}
                      </span>
                    </div>
                    <div className="upcoming-details">
                      <span className="upcoming-title">{evt.title}</span>
                      <span className="upcoming-category">
                        {evt.category === 'exam' ? '🎓 Bac Examination' : '📌 Milestone'}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
