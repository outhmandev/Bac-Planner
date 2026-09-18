import type { SchoolSubject, Exam, Weakness } from '../types/school';
import type { VocabCard, GrammarTopic, AusbildungMilestone, AusbildungApplication } from '../types/german';
import type { SoftwareProject } from '../types/projects';
import type { LifeGoal } from '../types/goals';
import type { Habit } from '../types/habits';
import type { Task } from '../types/common';
import type { CalendarEvent } from '../types/calendar';
import type { Note } from '../types/notes';
import type { FocusSession } from '../types/focus';
import {
  INITIAL_SUBJECTS,
  INITIAL_EXAMS,
  INITIAL_WEAKNESSES,
  INITIAL_GERMAN_VOCAB,
  INITIAL_GERMAN_GRAMMAR,
  INITIAL_AUSBILDUNG_MILESTONES,
  INITIAL_AUSBILDUNG_APPLICATIONS,
  INITIAL_SOFTWARE_PROJECTS,
  INITIAL_HABITS,
  INITIAL_GOALS,
  INITIAL_TASKS,
  INITIAL_CALENDAR_EVENTS,
  INITIAL_NOTES,
  INITIAL_FOCUS_SESSIONS,
  INITIAL_NATIONAL_PAPERS
} from './initialData';
import type { NationalExamPaper } from '../types/school';

const STORAGE_KEY = 'blush_planner_data_v5';

export interface PlannerState {
  version: number;
  lastSaved: string;
  subjects: SchoolSubject[];
  exams: Exam[];
  nationalPapers: NationalExamPaper[];
  weaknesses: Weakness[];
  germanVocab: VocabCard[];
  germanGrammar: GrammarTopic[];
  ausbildungMilestones: AusbildungMilestone[];
  ausbildungApplications: AusbildungApplication[];
  projects: SoftwareProject[];
  habits: Habit[];
  goals: LifeGoal[];
  tasks: Task[];
  events: CalendarEvent[];
  notes: Note[];
  focusSessions: FocusSession[];
}

export function getDefaultState(): PlannerState {
  return {
    version: 5,
    lastSaved: new Date().toISOString(),
    subjects: INITIAL_SUBJECTS,
    exams: INITIAL_EXAMS,
    nationalPapers: INITIAL_NATIONAL_PAPERS,
    weaknesses: INITIAL_WEAKNESSES,
    germanVocab: INITIAL_GERMAN_VOCAB,
    germanGrammar: INITIAL_GERMAN_GRAMMAR,
    ausbildungMilestones: INITIAL_AUSBILDUNG_MILESTONES,
    ausbildungApplications: INITIAL_AUSBILDUNG_APPLICATIONS,
    projects: INITIAL_SOFTWARE_PROJECTS,
    habits: INITIAL_HABITS,
    goals: INITIAL_GOALS,
    tasks: INITIAL_TASKS,
    events: INITIAL_CALENDAR_EVENTS,
    notes: INITIAL_NOTES,
    focusSessions: INITIAL_FOCUS_SESSIONS
  };
}

export const storageService = {
  getUserStorageKey(userId?: string): string {
    return userId ? `blush_user_data_${userId}` : STORAGE_KEY;
  },

  loadState(userId?: string): PlannerState {
    if (typeof window === 'undefined') return getDefaultState();
    const key = this.getUserStorageKey(userId);
    try {
      // Clear legacy global caches if present
      localStorage.removeItem('blush_planner_data_v1');
      localStorage.removeItem('blush_planner_data_v2');
      localStorage.removeItem('blush_planner_data_v3');
      localStorage.removeItem('blush_planner_data_v4');

      const raw = localStorage.getItem(key);
      if (!raw) {
        const fresh = getDefaultState();
        this.saveState(fresh, userId);
        return fresh;
      }
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.tasks)) {
        return getDefaultState();
      }

      // Ensure non-national subjects (like French or former dummy data) are stripped out
      const rawSubjects = Array.isArray(parsed.subjects)
        ? parsed.subjects.filter((s: SchoolSubject) => s.id !== 'subj-french' && (s.code as string) !== 'french')
        : INITIAL_SUBJECTS;

      // Check if user has the full 44 Moroccan chapters
      const totalChapters = rawSubjects.reduce((acc: number, s: SchoolSubject) => acc + (s.chapters?.length || 0), 0);
      const hasDetailedLessons = rawSubjects.some((s: SchoolSubject) => 
        s.chapters?.some((c: any) => c.lessons?.some((l: any) => l.keyFormula || l.nationalWeight))
      );

      // If user had previous fewer chapters or older version, upgrade subjects to official curriculum
      const sanitizedSubjects = (totalChapters < 40 || !hasDetailedLessons) ? INITIAL_SUBJECTS : rawSubjects;

      const sanitizedExams = Array.isArray(parsed.exams) && parsed.exams.length > 0
        ? parsed.exams.filter((e: Exam) => e.subjectId !== 'subj-french')
        : INITIAL_EXAMS;

      const sanitizedWeaknesses = Array.isArray(parsed.weaknesses) && parsed.weaknesses.length > 0
        ? parsed.weaknesses.filter((w: Weakness) => w.subjectId !== 'subj-french')
        : INITIAL_WEAKNESSES;

      const sanitizedNationalPapers = Array.isArray(parsed.nationalPapers) && parsed.nationalPapers.length > 0
        ? parsed.nationalPapers
        : INITIAL_NATIONAL_PAPERS;

      const sanitizedGermanVocab = Array.isArray(parsed.germanVocab) && parsed.germanVocab.length >= 20
        ? parsed.germanVocab
        : INITIAL_GERMAN_VOCAB;

      return {
        ...getDefaultState(),
        ...parsed,
        version: 5,
        subjects: sanitizedSubjects,
        exams: sanitizedExams,
        weaknesses: sanitizedWeaknesses,
        nationalPapers: sanitizedNationalPapers,
        germanVocab: sanitizedGermanVocab
      };
    } catch {
      return getDefaultState();
    }
  },

  saveState(state: PlannerState, userId?: string): void {
    if (typeof window === 'undefined') return;
    const key = this.getUserStorageKey(userId);
    try {
      const payload: PlannerState = {
        ...state,
        lastSaved: new Date().toISOString()
      };
      localStorage.setItem(key, JSON.stringify(payload));
    } catch (e) {
      console.error('Failed to save state to localStorage', e);
    }
  },

  exportBackup(state: PlannerState): void {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    const today = new Date().toISOString().split('T')[0];
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `blush-planner-backup-${today}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  },

  importBackup(jsonString: string, userId?: string): PlannerState {
    const parsed = JSON.parse(jsonString);
    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.tasks)) {
      throw new Error('Invalid Blush Planner backup file format.');
    }
    const state: PlannerState = {
      ...getDefaultState(),
      ...parsed,
      lastSaved: new Date().toISOString()
    };
    this.saveState(state, userId);
    return state;
  },

  resetToDefaults(userId?: string): PlannerState {
    const defaultState = getDefaultState();
    this.saveState(defaultState, userId);
    return defaultState;
  }
};
