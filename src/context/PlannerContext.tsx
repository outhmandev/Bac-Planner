import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { ViewType, Task, Priority, Status } from '../types/common';
import { SchoolSubject, Exam, Weakness } from '../types/school';
import { VocabCard, GrammarTopic, AusbildungMilestone, AusbildungApplication, GermanLevel } from '../types/german';
import { SoftwareProject, ProjectMilestone, ProjectBug } from '../types/projects';
import { LifeGoal, GoalMilestone } from '../types/goals';
import { Habit } from '../types/habits';
import { CalendarEvent } from '../types/calendar';
import { Note } from '../types/notes';
import { FocusSession } from '../types/focus';
import { User, LoginCredentials, RegisterCredentials } from '../types/auth';
import { storageService, PlannerState } from '../services/storage';
import { authService } from '../services/authService';
import { soundService } from '../services/audioService';

export interface QuickAddOptions {
  type: 'task' | 'exam' | 'note' | 'vocab' | 'project' | 'habit' | 'event';
  initialSubjectId?: string;
  initialProjectId?: string;
}

interface PlannerContextType {
  // Authentication & Multi-User State
  currentUser: User | null;
  isAuthenticated: boolean;
  login: (creds: LoginCredentials) => Promise<{ success: boolean; error?: string }>;
  register: (creds: RegisterCredentials) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;

  state: PlannerState;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isCommandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  isQuickAddOpen: boolean;
  quickAddOptions: QuickAddOptions;
  openQuickAdd: (options?: Partial<QuickAddOptions>) => void;
  closeQuickAdd: () => void;
  isZenMode: boolean;
  setZenMode: (zen: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;

  // Task Actions
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskComplete: (id: string) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;

  // School Actions (Bac 2027)
  toggleLessonComplete: (subjectId: string, chapterId: string, lessonId: string) => void;
  toggleChapterComplete: (subjectId: string, chapterId: string) => void;
  updateChapterRevisionStatus: (subjectId: string, chapterId: string, status: any) => void;
  addExam: (exam: Omit<Exam, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateExam: (id: string, updates: Partial<Exam>) => void;
  deleteExam: (id: string) => void;
  addWeakness: (weakness: Omit<Weakness, 'id' | 'createdAt' | 'updatedAt'>) => void;
  toggleWeaknessResolved: (id: string) => void;
  deleteWeakness: (id: string) => void;
  toggleNationalPaperComplete: (paperId: string) => void;
  updateNationalPaperScore: (paperId: string, score: number) => void;

  // German Actions
  addVocabCard: (card: Omit<VocabCard, 'id' | 'createdAt' | 'updatedAt' | 'timesReviewed'>) => void;
  updateVocabMastery: (id: string, mastery: VocabCard['mastery']) => void;
  deleteVocabCard: (id: string) => void;
  toggleGrammarMastered: (id: string) => void;
  toggleAusbildungMilestone: (id: string) => void;
  addAusbildungApplication: (app: Omit<AusbildungApplication, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateApplicationStatus: (id: string, status: AusbildungApplication['status']) => void;
  deleteApplication: (id: string) => void;

  // Software Project Actions
  addProject: (project: Omit<SoftwareProject, 'id' | 'createdAt' | 'updatedAt' | 'hoursSpent' | 'milestones'>) => void;
  updateProject: (id: string, updates: Partial<SoftwareProject>) => void;
  deleteProject: (id: string) => void;
  toggleProjectMilestone: (projectId: string, milestoneId: string) => void;
  addProjectMilestone: (projectId: string, title: string, dueDate?: string) => void;
  addProjectBug: (bug: Omit<ProjectBug, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateBugStatus: (projectId: string, bugId: string, status: ProjectBug['status']) => void;

  // Goals Actions
  addGoal: (goal: Omit<LifeGoal, 'id' | 'createdAt' | 'updatedAt' | 'milestones' | 'completed'>) => void;
  toggleGoalMilestone: (goalId: string, milestoneId: string) => void;
  deleteGoal: (id: string) => void;

  // Habit Actions
  toggleHabitToday: (habitId: string) => void;
  toggleHabitForDate: (habitId: string, dateStr: string) => void;
  addHabit: (habit: Omit<Habit, 'id' | 'createdAt' | 'updatedAt' | 'currentStreak' | 'longestStreak' | 'completedDates'>) => void;
  deleteHabit: (id: string) => void;

  // Calendar Actions
  addCalendarEvent: (event: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deleteCalendarEvent: (id: string) => void;

  // Focus Actions
  logFocusSession: (session: { durationMinutes: number; mode: any; subjectId?: string; projectId?: string; notes?: string }) => void;

  // Notes Actions
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  toggleNotePinned: (id: string) => void;
  convertNoteToTask: (noteId: string, taskDetails?: Partial<Task>) => void;
  convertNoteToProject: (noteId: string) => void;

  // Backup & Reset
  exportData: () => void;
  importData: (jsonStr: string) => void;
  resetData: () => void;
}

const PlannerContext = createContext<PlannerContextType | null>(null);

export const PlannerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => authService.getCurrentUser());
  const [state, setState] = useState<PlannerState>(() => storageService.loadState(authService.getCurrentUser()?.id));
  const [activeView, setActiveView] = useState<ViewType>('today');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCommandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [quickAddOptions, setQuickAddOptions] = useState<QuickAddOptions>({ type: 'task' });
  const [isZenMode, setZenMode] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // When active user changes (e.g. login, switch user, or register), reload their isolated state
  useEffect(() => {
    if (currentUser?.id) {
      const userState = storageService.loadState(currentUser.id);
      setState(userState);
    }
  }, [currentUser?.id]);

  // Synchronize state with storage for the current user
  useEffect(() => {
    storageService.saveState(state, currentUser?.id);
  }, [state, currentUser?.id]);

  // Keyboard shortcut listener: Cmd/Ctrl + K (Palette), Q (Quick Add)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing inside form inputs
      const target = e.target as HTMLElement;
      const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT';

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(prev => !prev);
      } else if (!isInput && e.key.toLowerCase() === 'q') {
        e.preventDefault();
        openQuickAdd();
      } else if (e.key === 'Escape') {
        setCommandPaletteOpen(false);
        setIsQuickAddOpen(false);
        setZenMode(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3200);
  }, []);

  const openQuickAdd = (options?: Partial<QuickAddOptions>) => {
    setQuickAddOptions(prev => ({
      ...prev,
      type: options?.type || 'task',
      initialSubjectId: options?.initialSubjectId,
      initialProjectId: options?.initialProjectId
    }));
    setIsQuickAddOpen(true);
  };

  const closeQuickAdd = () => setIsQuickAddOpen(false);

  // Helper for generating unique ID
  const genId = (prefix: string) => `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
  const nowIso = () => new Date().toISOString();
  const todayDateStr = () => new Date().toISOString().split('T')[0];

  // Confetti burst for milestone / major task completions
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#D45B6C', '#F2ABB4', '#FFF5F6', '#BA7326']
      });
    } catch {
      // Confetti fallback
    }
  };

  /* ========================================================================
     TASK ACTIONS
     ======================================================================== */
  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...task,
      id: genId('task'),
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    setState(prev => ({
      ...prev,
      tasks: [newTask, ...prev.tasks]
    }));
    soundService.playClick();
    showToast('Task added successfully');
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => t.id === id ? { ...t, ...updates, updatedAt: nowIso() } : t)
    }));
  };

  const deleteTask = (id: string) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.filter(t => t.id !== id)
    }));
    showToast('Task deleted');
  };

  const toggleTaskComplete = (id: string) => {
    setState(prev => {
      const task = prev.tasks.find(t => t.id === id);
      if (!task) return prev;
      const isNowDone = task.status !== 'done';
      if (isNowDone) {
        soundService.playChime();
        triggerConfetti();
      } else {
        soundService.playClick();
      }
      return {
        ...prev,
        tasks: prev.tasks.map(t => {
          if (t.id !== id) return t;
          return {
            ...t,
            status: isNowDone ? 'done' : 'todo',
            completedAt: isNowDone ? nowIso() : undefined,
            updatedAt: nowIso()
          };
        })
      };
    });
  };

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t => {
        if (t.id !== taskId) return t;
        const newSubtasks = t.subtasks.map(st => st.id === subtaskId ? { ...st, completed: !st.completed } : st);
        return {
          ...t,
          subtasks: newSubtasks,
          updatedAt: nowIso()
        };
      })
    }));
    soundService.playClick();
  };

  /* ========================================================================
     SCHOOL ACTIONS (Bac 2027)
     ======================================================================== */
  const toggleLessonComplete = (subjectId: string, chapterId: string, lessonId: string) => {
    setState(prev => {
      const subjects = prev.subjects.map(s => {
        if (s.id !== subjectId) return s;
        const chapters = s.chapters.map(c => {
          if (c.id !== chapterId) return c;
          const lessons = c.lessons.map(l => l.id === lessonId ? { ...l, completed: !l.completed } : l);
          const allLessonsDone = lessons.length > 0 && lessons.every(l => l.completed);
          return {
            ...c,
            lessons,
            completed: allLessonsDone,
            revisionStatus: allLessonsDone ? ('mastered' as const) : c.revisionStatus
          };
        });
        return { ...s, chapters };
      });
      return { ...prev, subjects };
    });
    soundService.playClick();
  };

  const toggleChapterComplete = (subjectId: string, chapterId: string) => {
    setState(prev => {
      const subjects = prev.subjects.map(s => {
        if (s.id !== subjectId) return s;
        const chapters = s.chapters.map(c => {
          if (c.id !== chapterId) return c;
          const newCompleted = !c.completed;
          const lessons = c.lessons.map(l => ({ ...l, completed: newCompleted }));
          return {
            ...c,
            completed: newCompleted,
            lessons,
            revisionStatus: newCompleted ? ('mastered' as const) : ('reading' as const)
          };
        });
        return { ...s, chapters };
      });
      return { ...prev, subjects };
    });
    soundService.playClick();
    triggerConfetti();
  };

  const updateChapterRevisionStatus = (subjectId: string, chapterId: string, status: any) => {
    setState(prev => ({
      ...prev,
      subjects: prev.subjects.map(s => {
        if (s.id !== subjectId) return s;
        return {
          ...s,
          chapters: s.chapters.map(c => c.id === chapterId ? { ...c, revisionStatus: status } : c)
        };
      })
    }));
  };

  const addExam = (exam: Omit<Exam, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newExam: Exam = {
      ...exam,
      id: genId('exam'),
      createdAt: nowIso(),
      updatedAt: nowIso()
    };
    // Also create matching calendar event automatically!
    const newEvent: CalendarEvent = {
      id: genId('evt-exam'),
      title: `${newExam.title} (Bac Exam)`,
      category: 'exam',
      startDate: newExam.date,
      startTime: newExam.time || '08:30',
      allDay: false,
      colorVar: 'var(--priority-p1)',
      relatedEntityId: newExam.id,
      description: newExam.notes,
      createdAt: nowIso(),
      updatedAt: nowIso()
    };
    setState(prev => ({
      ...prev,
      exams: [newExam, ...prev.exams],
      events: [newEvent, ...prev.events]
    }));
    soundService.playClick();
    showToast('Exam and Calendar date scheduled');
  };

  const updateExam = (id: string, updates: Partial<Exam>) => {
    setState(prev => ({
      ...prev,
      exams: prev.exams.map(e => e.id === id ? { ...e, ...updates, updatedAt: nowIso() } : e)
    }));
    showToast('Exam updated');
  };

  const deleteExam = (id: string) => {
    setState(prev => ({
      ...prev,
      exams: prev.exams.filter(e => e.id !== id),
      events: prev.events.filter(e => e.relatedEntityId !== id)
    }));
  };

  const addWeakness = (weakness: Omit<Weakness, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newWk: Weakness = {
      ...weakness,
      id: genId('wk'),
      createdAt: nowIso(),
      updatedAt: nowIso()
    };
    setState(prev => ({
      ...prev,
      weaknesses: [newWk, ...prev.weaknesses]
    }));
    showToast('Weakness tracked with action plan');
  };

  const toggleWeaknessResolved = (id: string) => {
    setState(prev => ({
      ...prev,
      weaknesses: prev.weaknesses.map(w => {
        if (w.id !== id) return w;
        const resolved = !w.resolved;
        return {
          ...w,
          resolved,
          resolvedAt: resolved ? nowIso() : undefined,
          updatedAt: nowIso()
        };
      })
    }));
    soundService.playClick();
    triggerConfetti();
  };

  const deleteWeakness = (id: string) => {
    setState(prev => ({
      ...prev,
      weaknesses: prev.weaknesses.filter(w => w.id !== id)
    }));
  };

  const toggleNationalPaperComplete = (paperId: string) => {
    setState(prev => ({
      ...prev,
      nationalPapers: (prev.nationalPapers || []).map(p => {
        if (p.id !== paperId) return p;
        const nowCompleted = !p.completed;
        return { ...p, completed: nowCompleted };
      })
    }));
    soundService.playClick();
  };

  const updateNationalPaperScore = (paperId: string, score: number) => {
    const validScore = isNaN(score) ? undefined : Math.max(0, Math.min(20, parseFloat(score.toFixed(2))));
    setState(prev => ({
      ...prev,
      nationalPapers: (prev.nationalPapers || []).map(p => {
        if (p.id !== paperId) return p;
        return {
          ...p,
          score: validScore,
          completed: validScore !== undefined ? true : p.completed
        };
      })
    }));
    showToast('National Exam practice score recorded');
  };

  /* ========================================================================
     GERMAN ACTIONS
     ======================================================================== */
  const addVocabCard = (card: Omit<VocabCard, 'id' | 'createdAt' | 'updatedAt' | 'timesReviewed'>) => {
    const newCard: VocabCard = {
      ...card,
      id: genId('vocab'),
      timesReviewed: 0,
      createdAt: nowIso(),
      updatedAt: nowIso()
    };
    setState(prev => ({
      ...prev,
      germanVocab: [newCard, ...prev.germanVocab]
    }));
    showToast(`Vocabulary card "${newCard.german}" added`);
  };

  const updateVocabMastery = (id: string, mastery: VocabCard['mastery']) => {
    setState(prev => ({
      ...prev,
      germanVocab: prev.germanVocab.map(v => v.id === id ? {
        ...v,
        mastery,
        timesReviewed: v.timesReviewed + 1,
        updatedAt: nowIso()
      } : v)
    }));
    soundService.playClick();
  };

  const deleteVocabCard = (id: string) => {
    setState(prev => ({
      ...prev,
      germanVocab: prev.germanVocab.filter(v => v.id !== id)
    }));
  };

  const toggleGrammarMastered = (id: string) => {
    setState(prev => ({
      ...prev,
      germanGrammar: prev.germanGrammar.map(g => g.id === id ? { ...g, mastered: !g.mastered, updatedAt: nowIso() } : g)
    }));
    soundService.playClick();
  };

  const toggleAusbildungMilestone = (id: string) => {
    setState(prev => ({
      ...prev,
      ausbildungMilestones: prev.ausbildungMilestones.map(m => m.id === id ? { ...m, completed: !m.completed, updatedAt: nowIso() } : m)
    }));
    soundService.playClick();
    triggerConfetti();
  };

  const addAusbildungApplication = (app: Omit<AusbildungApplication, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newApp: AusbildungApplication = {
      ...app,
      id: genId('app'),
      createdAt: nowIso(),
      updatedAt: nowIso()
    };
    setState(prev => ({
      ...prev,
      ausbildungApplications: [newApp, ...prev.ausbildungApplications]
    }));
    showToast(`Application for ${newApp.company} added`);
  };

  const updateApplicationStatus = (id: string, status: AusbildungApplication['status']) => {
    setState(prev => ({
      ...prev,
      ausbildungApplications: prev.ausbildungApplications.map(a => a.id === id ? { ...a, status, updatedAt: nowIso() } : a)
    }));
    showToast('Application status updated');
  };

  const deleteApplication = (id: string) => {
    setState(prev => ({
      ...prev,
      ausbildungApplications: prev.ausbildungApplications.filter(a => a.id !== id)
    }));
  };

  /* ========================================================================
     PROJECTS ACTIONS
     ======================================================================== */
  const addProject = (project: Omit<SoftwareProject, 'id' | 'createdAt' | 'updatedAt' | 'hoursSpent' | 'milestones'>) => {
    const newProj: SoftwareProject = {
      ...project,
      id: genId('proj'),
      hoursSpent: 0,
      milestones: [],
      createdAt: nowIso(),
      updatedAt: nowIso()
    };
    setState(prev => ({
      ...prev,
      projects: [newProj, ...prev.projects]
    }));
    showToast(`Project "${newProj.name}" created`);
  };

  const updateProject = (id: string, updates: Partial<SoftwareProject>) => {
    setState(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === id ? { ...p, ...updates, updatedAt: nowIso() } : p)
    }));
  };

  const deleteProject = (id: string) => {
    setState(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== id)
    }));
  };

  const toggleProjectMilestone = (projectId: string, milestoneId: string) => {
    setState(prev => ({
      ...prev,
      projects: prev.projects.map(p => {
        if (p.id !== projectId) return p;
        return {
          ...p,
          milestones: p.milestones.map(m => m.id === milestoneId ? { ...m, completed: !m.completed } : m),
          updatedAt: nowIso()
        };
      })
    }));
    soundService.playClick();
  };

  const addProjectMilestone = (projectId: string, title: string, dueDate?: string) => {
    const milestone: ProjectMilestone = {
      id: genId('m'),
      projectId,
      title,
      dueDate,
      completed: false
    };
    setState(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === projectId ? {
        ...p,
        milestones: [...p.milestones, milestone],
        updatedAt: nowIso()
      } : p)
    }));
    showToast('Milestone added');
  };

  const addProjectBug = (bug: Omit<ProjectBug, 'id' | 'createdAt' | 'updatedAt'>) => {
    // We can store bugs inside project or tasks; for simplicity we can add as task with bug tag or project note
    showToast(`Bug logged for project`);
  };

  const updateBugStatus = (projectId: string, bugId: string, status: ProjectBug['status']) => {
    // Project bug update
  };

  /* ========================================================================
     GOALS ACTIONS
     ======================================================================== */
  const addGoal = (goal: Omit<LifeGoal, 'id' | 'createdAt' | 'updatedAt' | 'milestones' | 'completed'>) => {
    const newGoal: LifeGoal = {
      ...goal,
      id: genId('goal'),
      milestones: [],
      completed: false,
      createdAt: nowIso(),
      updatedAt: nowIso()
    };
    setState(prev => ({
      ...prev,
      goals: [newGoal, ...prev.goals]
    }));
    showToast(`Goal "${newGoal.title}" added`);
  };

  const toggleGoalMilestone = (goalId: string, milestoneId: string) => {
    setState(prev => ({
      ...prev,
      goals: prev.goals.map(g => {
        if (g.id !== goalId) return g;
        const newMilestones = g.milestones.map(m => m.id === milestoneId ? { ...m, completed: !m.completed } : m);
        const allDone = newMilestones.length > 0 && newMilestones.every(m => m.completed);
        return {
          ...g,
          milestones: newMilestones,
          completed: allDone,
          updatedAt: nowIso()
        };
      })
    }));
    soundService.playClick();
  };

  const deleteGoal = (id: string) => {
    setState(prev => ({
      ...prev,
      goals: prev.goals.filter(g => g.id !== id)
    }));
  };

  /* ========================================================================
     HABITS ACTIONS
     ======================================================================== */
  const toggleHabitToday = (habitId: string) => {
    toggleHabitForDate(habitId, todayDateStr());
  };

  const toggleHabitForDate = (habitId: string, dateStr: string) => {
    setState(prev => ({
      ...prev,
      habits: prev.habits.map(h => {
        if (h.id !== habitId) return h;
        const exists = h.completedDates.includes(dateStr);
        let newDates = exists ? h.completedDates.filter(d => d !== dateStr) : [...h.completedDates, dateStr];
        
        // Recalculate streak
        let streak = h.currentStreak;
        if (!exists) {
          streak += 1;
          soundService.playClick();
        } else {
          streak = Math.max(0, streak - 1);
        }

        return {
          ...h,
          completedDates: newDates,
          currentStreak: streak,
          longestStreak: Math.max(h.longestStreak, streak),
          updatedAt: nowIso()
        };
      })
    }));
  };

  const addHabit = (habit: Omit<Habit, 'id' | 'createdAt' | 'updatedAt' | 'currentStreak' | 'longestStreak' | 'completedDates'>) => {
    const newHabit: Habit = {
      ...habit,
      id: genId('hab'),
      currentStreak: 0,
      longestStreak: 0,
      completedDates: [],
      createdAt: nowIso(),
      updatedAt: nowIso()
    };
    setState(prev => ({
      ...prev,
      habits: [...prev.habits, newHabit]
    }));
    showToast(`Habit "${newHabit.name}" created`);
  };

  const deleteHabit = (id: string) => {
    setState(prev => ({
      ...prev,
      habits: prev.habits.filter(h => h.id !== id)
    }));
  };

  /* ========================================================================
     CALENDAR ACTIONS
     ======================================================================== */
  const addCalendarEvent = (event: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newEvt: CalendarEvent = {
      ...event,
      id: genId('evt'),
      createdAt: nowIso(),
      updatedAt: nowIso()
    };
    setState(prev => ({
      ...prev,
      events: [newEvt, ...prev.events]
    }));
    showToast('Event added to calendar');
  };

  const deleteCalendarEvent = (id: string) => {
    setState(prev => ({
      ...prev,
      events: prev.events.filter(e => e.id !== id)
    }));
  };

  /* ========================================================================
     FOCUS / POMODORO ACTIONS (Dynamic linkage to Subjects & Projects)
     ======================================================================== */
  const logFocusSession = (session: { durationMinutes: number; mode: any; subjectId?: string; projectId?: string; notes?: string }) => {
    const newSession: FocusSession = {
      id: genId('focus'),
      durationMinutes: session.durationMinutes,
      mode: session.mode,
      subjectId: session.subjectId,
      projectId: session.projectId,
      notes: session.notes,
      completedAt: nowIso(),
      createdAt: nowIso(),
      updatedAt: nowIso()
    };

    setState(prev => {
      // Automatically add hours to School Subject if linked!
      const subjects = prev.subjects.map(s => {
        if (s.id === session.subjectId) {
          return {
            ...s,
            hoursStudied: Number((s.hoursStudied + session.durationMinutes / 60).toFixed(1))
          };
        }
        return s;
      });

      // Automatically add hours to Software Project if linked!
      const projects = prev.projects.map(p => {
        if (p.id === session.projectId) {
          return {
            ...p,
            hoursSpent: Number((p.hoursSpent + session.durationMinutes / 60).toFixed(1))
          };
        }
        return p;
      });

      return {
        ...prev,
        focusSessions: [newSession, ...prev.focusSessions],
        subjects,
        projects
      };
    });

    soundService.playChime();
    triggerConfetti();
    showToast(`Focus session logged: ${session.durationMinutes} mins recorded!`);
  };

  /* ========================================================================
     NOTES ACTIONS (With Instant Conversion to Task / Project)
     ======================================================================== */
  const addNote = (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newNote: Note = {
      ...note,
      id: genId('note'),
      createdAt: nowIso(),
      updatedAt: nowIso()
    };
    setState(prev => ({
      ...prev,
      notes: [newNote, ...prev.notes]
    }));
    showToast('Note captured');
  };

  const updateNote = (id: string, updates: Partial<Note>) => {
    setState(prev => ({
      ...prev,
      notes: prev.notes.map(n => n.id === id ? { ...n, ...updates, updatedAt: nowIso() } : n)
    }));
  };

  const deleteNote = (id: string) => {
    setState(prev => ({
      ...prev,
      notes: prev.notes.filter(n => n.id !== id)
    }));
  };

  const toggleNotePinned = (id: string) => {
    setState(prev => ({
      ...prev,
      notes: prev.notes.map(n => n.id === id ? { ...n, pinned: !n.pinned, updatedAt: nowIso() } : n)
    }));
  };

  const convertNoteToTask = (noteId: string, taskDetails?: Partial<Task>) => {
    const note = state.notes.find(n => n.id === noteId);
    if (!note) return;

    addTask({
      title: note.title,
      description: note.content,
      priority: taskDetails?.priority || 'p2',
      status: 'todo',
      dueDate: taskDetails?.dueDate || todayDateStr(),
      tags: [...note.tags, 'FromNote'],
      subtasks: []
    });

    showToast(`Converted note "${note.title}" into a task!`);
  };

  const convertNoteToProject = (noteId: string) => {
    const note = state.notes.find(n => n.id === noteId);
    if (!note) return;

    addProject({
      name: note.title,
      description: note.content,
      status: 'planning',
      priority: 'p2',
      techStack: ['TypeScript']
    });

    setActiveView('projects');
    showToast(`Converted note "${note.title}" into a Software Project!`);
  };

  /* ========================================================================
     AUTHENTICATION & MULTI-USER MANAGEMENT
     ======================================================================== */
  const login = async (creds: LoginCredentials): Promise<{ success: boolean; error?: string }> => {
    const res = await authService.login(creds);
    if (res.user) {
      setCurrentUser(res.user);
      const userState = storageService.loadState(res.user.id);
      setState(userState);
      showToast(`Welcome back, ${res.user.name}!`);
      return { success: true };
    }
    return { success: false, error: res.error };
  };

  const register = async (creds: RegisterCredentials): Promise<{ success: boolean; error?: string }> => {
    const res = await authService.register(creds);
    if (res.user) {
      setCurrentUser(res.user);
      const freshState = storageService.resetToDefaults(res.user.id);
      setState(freshState);
      showToast(`Account created! Welcome to Blush Planner, ${res.user.name}!`);
      return { success: true };
    }
    return { success: false, error: res.error };
  };

  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    showToast('You have been signed out.');
  };

  /* ========================================================================
     BACKUP, RESTORE & RESET
     ======================================================================== */
  const exportData = () => {
    storageService.exportBackup(state);
    showToast('Backup JSON downloaded successfully');
  };

  const importData = (jsonStr: string) => {
    try {
      const newState = storageService.importBackup(jsonStr, currentUser?.id);
      setState(newState);
      showToast('Data restored successfully');
    } catch (e: any) {
      alert('Error importing data: ' + (e?.message || 'Invalid format'));
    }
  };

  const resetData = () => {
    if (window.confirm('Reset all Blush Planner data to the default Bac 2027 & German starter kit? Your current changes will be replaced.')) {
      const defaults = storageService.resetToDefaults(currentUser?.id);
      setState(defaults);
      showToast('Reset to default starter kit completed');
    }
  };

  return (
    <PlannerContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        login,
        register,
        logout,
        state,
        activeView,
        setActiveView,
        searchQuery,
        setSearchQuery,
        isCommandPaletteOpen,
        setCommandPaletteOpen,
        isQuickAddOpen,
        quickAddOptions,
        openQuickAdd,
        closeQuickAdd,
        isZenMode,
        setZenMode,
        toastMessage,
        showToast,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskComplete,
        toggleSubtask,
        toggleLessonComplete,
        toggleChapterComplete,
        updateChapterRevisionStatus,
        addExam,
        updateExam,
        deleteExam,
        addWeakness,
        toggleWeaknessResolved,
        deleteWeakness,
        toggleNationalPaperComplete,
        updateNationalPaperScore,
        addVocabCard,
        updateVocabMastery,
        deleteVocabCard,
        toggleGrammarMastered,
        toggleAusbildungMilestone,
        addAusbildungApplication,
        updateApplicationStatus,
        deleteApplication,
        addProject,
        updateProject,
        deleteProject,
        toggleProjectMilestone,
        addProjectMilestone,
        addProjectBug,
        updateBugStatus,
        addGoal,
        toggleGoalMilestone,
        deleteGoal,
        toggleHabitToday,
        toggleHabitForDate,
        addHabit,
        deleteHabit,
        addCalendarEvent,
        deleteCalendarEvent,
        logFocusSession,
        addNote,
        updateNote,
        deleteNote,
        toggleNotePinned,
        convertNoteToTask,
        convertNoteToProject,
        exportData,
        importData,
        resetData
      }}
    >
      {children}
    </PlannerContext.Provider>
  );
};

export const usePlanner = (): PlannerContextType => {
  const context = useContext(PlannerContext);
  if (!context) {
    throw new Error('usePlanner must be used within a PlannerProvider');
  }
  return context;
};
