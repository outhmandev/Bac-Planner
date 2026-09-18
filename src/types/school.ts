import { BaseItem } from './common';

export interface Lesson {
  id: string;
  title: string;
  completed: boolean;
  notes?: string;
  nationalWeight?: string; // e.g. "3.0 - 4.5 pts"
  keyFormula?: string;     // Essential theorem or formula tested on Moroccan National Exam
  examTip?: string;        // Official Cadre de Référence advice or pitfall to avoid
  alloschoolUrl?: string;  // Direct official reference link
}

export interface Chapter {
  id: string;
  subjectId: string;
  title: string;
  term: 1 | 2;
  order: number;
  completed: boolean;
  lessons: Lesson[];
  exercisesTarget: number;
  exercisesCompleted: number;
  revisionStatus: 'not_started' | 'reading' | 'exercises' | 'mastered';
  nationalExamWeight?: string;
  officialReference?: string;
}

export interface NationalExamPaper {
  id: string;
  year: number;
  session: 'normale' | 'rattrapage';
  subjectId: string;
  subjectName: string;
  stream: string;
  durationHours: number;
  coefficient: number;
  topicsCovered: string[];
  pdfUrl: string;
  solutionUrl: string;
  completed: boolean;
  score?: number; // /20
  notes?: string;
}

export interface Exam extends BaseItem {
  subjectId: string;
  title: string; // e.g., "Contrôle 1 - Analyse & Suites", "Examen Blanc National"
  date: string;  // YYYY-MM-DD
  time?: string; // HH:mm
  coefficient: number;
  targetGrade: number; // out of 20
  actualGrade?: number; // out of 20
  type: 'devoir_surveille' | 'examen_blanc' | 'national' | 'quiz';
  notes?: string;
}

export interface Weakness extends BaseItem {
  subjectId: string;
  chapterId?: string;
  topic: string;
  description: string;
  severity: 'critical' | 'moderate' | 'minor';
  actionPlan: string;
  resolved: boolean;
  resolvedAt?: string;
}

export interface SchoolSubject {
  id: string;
  name: string; // e.g. "Mathématiques", "Physique-Chimie", "SVT", "Philosophie (الفلسفة)", "English"
  code: 'math' | 'physics' | 'svt' | 'philosophy' | 'english' | 'custom';
  coefficient: number;
  colorVar: string;
  bgVar: string;
  targetBacGrade: number; // out of 20
  hoursStudied: number;
  chapters: Chapter[];
}

