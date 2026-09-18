import React from 'react';
import { Search, Plus, Timer, Sparkles, Menu, LogOut } from 'lucide-react';
import { usePlanner } from '../../context/PlannerContext';

interface TopbarProps {
  onOpenMobileMenu?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onOpenMobileMenu }) => {
  const { 
    currentUser,
    logout,
    activeView, 
    setActiveView, 
    setCommandPaletteOpen, 
    openQuickAdd, 
    state 
  } = usePlanner();

  // Format today's date nicely
  const today = new Date();
  const dateFormatted = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  const getTitle = () => {
    switch (activeView) {
      case 'today': return 'Command Center';
      case 'school': return 'Bac 2027 Curriculum & Grades';
      case 'german': return 'German A1→B2 & Ausbildung Hub';
      case 'projects': return 'Software & Dev Projects';
      case 'goals': return 'Life Objectives & Milestones';
      case 'habits': return 'Habit Consistency & Routines';
      case 'calendar': return 'Unified Timeline & Calendar';
      case 'focus': return 'Pomodoro & Deep Work Chamber';
      case 'notes': return 'Notes, Ideas & Brainstorming';
      case 'statistics': return 'Actionable Analytics & Insights';
      default: return 'Blush Planner';
    }
  };

  // Recent focus minutes today
  const recentFocusSession = state.focusSessions[0];

  return (
    <header className="app-topbar">
      <div className="topbar-left">
        <button 
          className="btn-icon mobile-menu-trigger" 
          onClick={onOpenMobileMenu}
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="topbar-date-group">
          <span className="topbar-date-tag">
            <span className="live-dot" />
            {dateFormatted}
          </span>
          <h1 className="topbar-view-title">{getTitle()}</h1>
        </div>
      </div>

      <div className="topbar-right">
        {/* Spotlight Trigger */}
        <button 
          className="topbar-search-btn"
          onClick={() => setCommandPaletteOpen(true)}
        >
          <Search size={15} />
          <span className="search-placeholder">Quick search commands, subjects, notes...</span>
          <kbd className="search-kbd">⌘K</kbd>
        </button>

        {/* Quick Focus Launcher */}
        <button 
          className="btn btn-secondary btn-sm topbar-focus-btn"
          onClick={() => setActiveView('focus')}
          title="Open Focus Session"
        >
          <Timer size={15} className="timer-icon-spin" />
          <span>Focus Mode</span>
        </button>

        {/* Universal Quick Add */}
        <button 
          className="btn btn-primary btn-sm topbar-add-btn"
          onClick={() => openQuickAdd()}
        >
          <Plus size={16} />
          <span>New</span>
        </button>

        {/* Current User Pill & Sign Out */}
        {currentUser && (
          <div className="topbar-user-badge" title={`Signed in as ${currentUser.email}`}>
            <div 
              className="topbar-avatar" 
              style={{ backgroundColor: currentUser.avatarColor || 'var(--primary)' }}
            >
              {currentUser.name.charAt(0).toUpperCase()}
            </div>
            <span className="topbar-user-name">{currentUser.name}</span>
            <button 
              className="btn-icon topbar-logout-btn" 
              onClick={logout} 
              title="Sign Out"
            >
              <LogOut size={15} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
