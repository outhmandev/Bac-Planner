import React, { useState } from 'react';
import { 
  CalendarDays, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Filter,
  GraduationCap,
  Clock,
  CheckSquare
} from 'lucide-react';
import { usePlanner } from '../../../context/PlannerContext';
import { CalendarEvent, EventCategory } from '../../../types/calendar';

export const CalendarView: React.FC = () => {
  const { state, addCalendarEvent, openQuickAdd } = usePlanner();

  const [currentDate, setCurrentDate] = useState(() => new Date());
  const [filterExams, setFilterExams] = useState(true);
  const [filterTasks, setFilterTasks] = useState(true);
  const [filterDeadlines, setFilterDeadlines] = useState(true);

  // Month navigation
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Compute days for the month grid
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday
  // Adjust to Monday first (0 is Monday, 6 is Sunday)
  const startDay = (firstDayOfMonth + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Combine events and tasks with due dates into a unified view
  const combinedItems: { id: string; title: string; date: string; time?: string; category: EventCategory; colorVar?: string }[] = [];

  // 1. Calendar Events
  state.events.forEach(evt => {
    if (
      (evt.category === 'exam' && filterExams) ||
      (evt.category === 'deadline' && filterDeadlines) ||
      ((evt.category === 'appointment' || evt.category === 'study_session') && filterTasks)
    ) {
      combinedItems.push({
        id: evt.id,
        title: evt.title,
        date: evt.startDate,
        time: evt.startTime,
        category: evt.category,
        colorVar: evt.colorVar
      });
    }
  });

  // 2. Tasks with due dates
  if (filterTasks) {
    state.tasks.forEach(t => {
      if (t.dueDate) {
        combinedItems.push({
          id: `task-${t.id}`,
          title: t.title,
          date: t.dueDate,
          time: t.dueTime,
          category: 'task',
          colorVar: t.priority === 'p1' ? 'var(--priority-p1)' : 'var(--subj-math)'
        });
      }
    });
  }

  // Helper to format date string YYYY-MM-DD
  const formatCellDate = (dayNum: number) => {
    const m = String(month + 1).padStart(2, '0');
    const d = String(dayNum).padStart(2, '0');
    return `${year}-${m}-${d}`;
  };

  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div className="view-container calendar-view">
      {/* Calendar Header Bar */}
      <div className="calendar-header-card">
        <div className="calendar-nav-controls">
          <h2 className="calendar-month-title">{monthName}</h2>
          <div className="calendar-nav-btns">
            <button className="btn btn-outline btn-sm" onClick={handlePrevMonth}>
              <ChevronLeft size={16} />
            </button>
            <button className="btn btn-secondary btn-sm" onClick={handleToday}>
              Today
            </button>
            <button className="btn btn-outline btn-sm" onClick={handleNextMonth}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Filters and Add button */}
        <div className="calendar-filters-row">
          <label className="filter-checkbox-label">
            <input 
              type="checkbox" 
              checked={filterExams} 
              onChange={e => setFilterExams(e.target.checked)} 
            />
            <span>Bac Exams</span>
          </label>
          <label className="filter-checkbox-label">
            <input 
              type="checkbox" 
              checked={filterTasks} 
              onChange={e => setFilterTasks(e.target.checked)} 
            />
            <span>Tasks & Study</span>
          </label>
          <label className="filter-checkbox-label">
            <input 
              type="checkbox" 
              checked={filterDeadlines} 
              onChange={e => setFilterDeadlines(e.target.checked)} 
            />
            <span>Deadlines</span>
          </label>

          <button 
            className="btn btn-primary btn-sm"
            onClick={() => openQuickAdd({ type: 'task' })}
          >
            <Plus size={14} />
            <span>Add Event / Task</span>
          </button>
        </div>
      </div>

      {/* Month Calendar Grid */}
      <div className="card calendar-grid-card">
        <div className="calendar-weekdays-header">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
            <div key={day} className="weekday-col-header">{day}</div>
          ))}
        </div>

        <div className="calendar-days-grid">
          {/* Empty padding slots before first day */}
          {Array.from({ length: startDay }).map((_, idx) => (
            <div key={`empty-${idx}`} className="calendar-day-cell empty-cell" />
          ))}

          {/* Actual days */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const dateStr = formatCellDate(dayNum);
            const isToday = dateStr === todayStr;
            const dayItems = combinedItems.filter(item => item.date === dateStr);

            return (
              <div 
                key={dateStr} 
                className={`calendar-day-cell ${isToday ? 'cell-today' : ''}`}
                onClick={() => openQuickAdd({ type: 'task' })}
              >
                <div className="cell-top-row">
                  <span className={`day-number ${isToday ? 'today-badge' : ''}`}>{dayNum}</span>
                  {dayItems.length > 0 && (
                    <span className="day-items-count">{dayItems.length}</span>
                  )}
                </div>

                <div className="cell-events-stack">
                  {dayItems.slice(0, 3).map(item => (
                    <div 
                      key={item.id} 
                      className={`event-pill-item category-${item.category}`}
                      style={{ borderLeftColor: item.colorVar }}
                      title={`${item.title} ${item.time ? '(' + item.time + ')' : ''}`}
                    >
                      {item.time && <span className="event-time-prefix">{item.time}</span>}
                      <span className="event-title-truncate">{item.title}</span>
                    </div>
                  ))}
                  {dayItems.length > 3 && (
                    <span className="more-events-text">+{dayItems.length - 3} more</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
