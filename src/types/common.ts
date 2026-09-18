export type Priority = 'p1' | 'p2' | 'p3'; // P1: Urgent/High, P2: Medium, P3: Low
export type Status = 'todo' | 'in_progress' | 'review' | 'done';

export interface BaseItem {
  id: string;
  createdAt: string; // ISO String
  updatedAt: string;
}

export interface Task extends BaseItem {
  title: string;
  description?: string;
  priority: Priority;
  status: Status;
  dueDate?: string; // YYYY-MM-DD
  dueTime?: string; // HH:mm
  completedAt?: string;
  estimatedMinutes?: number;
  actualMinutes?: number;
  tags: string[];
  subtasks: { id: string; title: string; completed: boolean }[];
  
  // Cross-entity relations
  subjectId?: string;    // Links to School Subject (e.g., Math, Physics)
  chapterId?: string;    // Links to Subject Chapter
  projectId?: string;    // Links to Software Project
  goalId?: string;       // Links to Long-term Goal
  milestoneId?: string;  // Links to Project or Goal Milestone
}

export type ViewType = 
  | 'today'
  | 'school'
  | 'projects'
  | 'german'
  | 'goals'
  | 'habits'
  | 'calendar'
  | 'focus'
  | 'notes'
  | 'statistics';
