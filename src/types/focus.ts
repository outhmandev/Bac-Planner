import { BaseItem } from './common';

export type FocusMode = 'pomodoro' | 'deep_study' | 'custom';

export interface FocusSession extends BaseItem {
  durationMinutes: number;
  mode: FocusMode;
  subjectId?: string; // Links to SchoolSubject
  projectId?: string; // Links to SoftwareProject
  taskId?: string;    // Links to specific task
  notes?: string;
  completedAt: string; // ISO String
}
