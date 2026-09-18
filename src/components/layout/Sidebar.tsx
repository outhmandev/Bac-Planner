import React, { useRef } from 'react';
import { 
  CalendarDays, 
  CheckSquare, 
  GraduationCap, 
  FolderGit2, 
  Languages, 
  Target, 
  Flame, 
  Timer, 
  StickyNote, 
  BarChart3, 
  Download, 
  Upload, 
  RotateCcw,
  Sparkles,
  Search,
  Plus,
  LogOut
} from 'lucide-react';
import { usePlanner } from '../../context/PlannerContext';
import { ViewType } from '../../types/common';

interface NavItem {
  id: ViewType;
  label: string;
  sublabel?: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string | number;
}

export const Sidebar: React.FC = () => {
  const { 
    currentUser,
    logout,
    activeView, 
    setActiveView, 
    state, 
    setCommandPaletteOpen, 
    openQuickAdd,
    exportData, 
    importData, 
    resetData 
  } = usePlanner();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Dynamic badges computed from actual state
  const pendingTasksCount = state.tasks.filter(t => t.status !== 'done').length;
  const activeProjectsCount = state.projects.filter(p => p.status === 'in_progress').length;
  const upcomingExamsCount = state.exams.filter(e => !e.actualGrade).length;

  const navItems: NavItem[] = [
    { 
      id: 'today', 
      label: 'Today', 
      sublabel: 'Command Center',
      icon: CheckSquare,
      badge: pendingTasksCount > 0 ? pendingTasksCount : undefined
    },
    { 
      id: 'school', 
      label: 'Bac 2027', 
      sublabel: 'Curriculum & Grades',
      icon: GraduationCap,
      badge: upcomingExamsCount > 0 ? `${upcomingExamsCount} exams` : undefined
    },
    { 
      id: 'german', 
      label: 'German & Ausbildung', 
      sublabel: 'A1 → B2 Journey',
      icon: Languages,
      badge: 'B1'
    },
    { 
      id: 'projects', 
      label: 'Dev Projects', 
      sublabel: 'Code & Software',
      icon: FolderGit2,
      badge: activeProjectsCount > 0 ? activeProjectsCount : undefined
    },
    { 
      id: 'goals', 
      label: 'Life Goals', 
      sublabel: 'Milestones',
      icon: Target 
    },
    { 
      id: 'habits', 
      label: 'Habits', 
      sublabel: 'Routines & Streaks',
      icon: Flame 
    },
    { 
      id: 'calendar', 
      label: 'Calendar', 
      sublabel: 'Unified Schedule',
      icon: CalendarDays 
    },
    { 
      id: 'focus', 
      label: 'Focus Timer', 
      sublabel: 'Deep Work & Pomodoro',
      icon: Timer 
    },
    { 
      id: 'notes', 
      label: 'Notes & Ideas', 
      sublabel: 'Quick Capture',
      icon: StickyNote 
    },
    { 
      id: 'statistics', 
      label: 'Analytics', 
      sublabel: 'Effort & Readiness',
      icon: BarChart3 
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (content) {
        importData(content);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <aside className="app-sidebar">
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="brand-logo-wrap">
          <div className="brand-monogram">B</div>
          <div className="brand-text">
            <h2 className="brand-title">Blush Planner</h2>
            <span className="brand-badge">Bac 2027 Command</span>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="sidebar-quick-actions">
        <button 
          className="btn btn-primary btn-quick-add"
          onClick={() => openQuickAdd()}
          title="Shortcut: Press 'Q' anywhere"
        >
          <Plus size={16} />
          <span>Quick Add</span>
          <kbd className="kbd-shortcut">Q</kbd>
        </button>

        <button 
          className="btn btn-outline btn-search-trigger"
          onClick={() => setCommandPaletteOpen(true)}
          title="Shortcut: Cmd+K or Ctrl+K"
        >
          <Search size={15} />
          <span>Spotlight Search</span>
          <kbd className="kbd-shortcut">⌘K</kbd>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        <div className="nav-section-title">COMMAND AREAS</div>
        <ul className="nav-list">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <li key={item.id}>
                <button
                  className={`nav-link ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveView(item.id)}
                >
                  <div className="nav-icon-wrap">
                    <Icon size={18} />
                  </div>
                  <div className="nav-label-wrap">
                    <span className="nav-main-label">{item.label}</span>
                    {item.sublabel && <span className="nav-sub-label">{item.sublabel}</span>}
                  </div>
                  {item.badge && (
                    <span className={`nav-badge ${isActive ? 'nav-badge-active' : ''}`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Card */}
      {currentUser && (
        <div className="sidebar-user-card">
          <div 
            className="sidebar-user-avatar" 
            style={{ backgroundColor: currentUser.avatarColor || 'var(--primary)' }}
          >
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">{currentUser.name}</span>
            <span className="sidebar-user-email">{currentUser.email}</span>
          </div>
          <button 
            className="btn-icon sidebar-logout-btn" 
            onClick={logout} 
            title="Sign Out"
          >
            <LogOut size={15} />
          </button>
        </div>
      )}

      {/* Footer Backup & Data Tools */}
      <div className="sidebar-footer">
        <div className="nav-section-title">DATA & STORAGE</div>
        <div className="footer-actions-row">
          <button 
            className="footer-btn" 
            onClick={exportData}
            title="Download JSON backup"
          >
            <Download size={14} />
            <span>Backup</span>
          </button>
          
          <button 
            className="footer-btn" 
            onClick={() => fileInputRef.current?.click()}
            title="Restore from JSON backup"
          >
            <Upload size={14} />
            <span>Restore</span>
          </button>

          <button 
            className="footer-btn footer-btn-subtle" 
            onClick={resetData}
            title="Reset to starter kit"
          >
            <RotateCcw size={14} />
            <span>Reset</span>
          </button>

          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".json" 
            style={{ display: 'none' }} 
          />
        </div>

        <div className="sidebar-status-pill">
          <Sparkles size={13} className="sparkle-icon" />
          <span>Local persistent sync active</span>
        </div>
      </div>
    </aside>
  );
};
