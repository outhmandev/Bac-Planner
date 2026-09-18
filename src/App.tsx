import React, { useState } from 'react';
import { PlannerProvider, usePlanner } from './context/PlannerContext';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { MobileNav } from './components/layout/MobileNav';
import { CommandPalette } from './components/common/CommandPalette';
import { QuickAddModal } from './components/common/QuickAddModal';
import { Toast } from './components/common/Toast';
import { Modal } from './components/common/Modal';
import { AuthGate } from './components/auth/AuthGate';

// Views
import { TodayView } from './components/views/TodayView/TodayView';
import { SchoolView } from './components/views/SchoolView/SchoolView';
import { ProjectsView } from './components/views/ProjectsView/ProjectsView';
import { GermanView } from './components/views/GermanView/GermanView';
import { GoalsView } from './components/views/GoalsView/GoalsView';
import { HabitsView } from './components/views/HabitsView/HabitsView';
import { CalendarView } from './components/views/CalendarView/CalendarView';
import { FocusView } from './components/views/FocusView/FocusView';
import { NotesView } from './components/views/NotesView/NotesView';
import { StatisticsView } from './components/views/StatisticsView/StatisticsView';

import { 
  Target, 
  Flame, 
  CalendarDays, 
  Timer, 
  StickyNote, 
  BarChart3, 
  Download, 
  RotateCcw,
  CheckSquare,
  GraduationCap,
  Languages,
  FolderGit2
} from 'lucide-react';
import { ViewType } from './types/common';

const MainContent: React.FC = () => {
  const { isAuthenticated, activeView, setActiveView, toastMessage, exportData, resetData } = usePlanner();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <>
        <AuthGate />
        <Toast message={toastMessage} />
      </>
    );
  }

  const renderCurrentView = () => {
    switch (activeView) {
      case 'today':
        return <TodayView />;
      case 'school':
        return <SchoolView />;
      case 'projects':
        return <ProjectsView />;
      case 'german':
        return <GermanView />;
      case 'goals':
        return <GoalsView />;
      case 'habits':
        return <HabitsView />;
      case 'calendar':
        return <CalendarView />;
      case 'focus':
        return <FocusView />;
      case 'notes':
        return <NotesView />;
      case 'statistics':
        return <StatisticsView />;
      default:
        return <TodayView />;
    }
  };

  const handleMobileSelect = (view: ViewType) => {
    setActiveView(view);
    setMobileMenuOpen(false);
  };

  return (
    <div className="app-layout">
      {/* Sidebar for Desktop & Tablet */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="app-main-area">
        <Topbar onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        <main className="app-content-scrollable">
          {renderCurrentView()}
        </main>

        {/* Bottom Navigation for Mobile Devices */}
        <MobileNav onOpenMoreMenu={() => setMobileMenuOpen(true)} />
      </div>

      {/* Global Command Palette (⌘K) */}
      <CommandPalette />

      {/* Global Universal Quick Add Modal (Q) */}
      <QuickAddModal />

      {/* Toast Notification Banner */}
      <Toast message={toastMessage} />

      {/* Mobile Drawer Navigation Modal */}
      <Modal
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        title="Command Navigation"
        subtitle="All planner areas & utilities"
        maxWidth="400px"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { id: 'today' as ViewType, label: 'Today Command Center', icon: CheckSquare },
            { id: 'school' as ViewType, label: 'Bac 2027 Curriculum & Grades', icon: GraduationCap },
            { id: 'german' as ViewType, label: 'German & Ausbildung Hub', icon: Languages },
            { id: 'projects' as ViewType, label: 'Software & Dev Projects', icon: FolderGit2 },
            { id: 'goals' as ViewType, label: 'Life Objectives & Milestones', icon: Target },
            { id: 'habits' as ViewType, label: 'Habits & Routine Consistency', icon: Flame },
            { id: 'calendar' as ViewType, label: 'Unified Schedule & Calendar', icon: CalendarDays },
            { id: 'focus' as ViewType, label: 'Pomodoro Focus Chamber', icon: Timer },
            { id: 'notes' as ViewType, label: 'Notes & Brainstorming Ideas', icon: StickyNote },
            { id: 'statistics' as ViewType, label: 'Analytics & Bac Readiness', icon: BarChart3 },
          ].map(item => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                className={`btn ${isActive ? 'btn-secondary' : 'btn-outline'}`}
                style={{ justifyContent: 'flex-start', padding: '0.65rem 0.85rem' }}
                onClick={() => handleMobileSelect(item.id)}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', marginTop: '0.5rem', display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={exportData}>
              <Download size={14} />
              <span>Backup</span>
            </button>
            <button className="btn btn-danger btn-sm" style={{ flex: 1 }} onClick={resetData}>
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export function App() {
  return (
    <PlannerProvider>
      <MainContent />
    </PlannerProvider>
  );
}

export default App;
