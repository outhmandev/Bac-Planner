import { BaseItem, Priority, Status } from './common';

export interface ProjectMilestone {
  id: string;
  projectId: string;
  title: string;
  dueDate?: string;
  completed: boolean;
}

export interface ProjectBug extends BaseItem {
  projectId: string;
  title: string;
  severity: 'critical' | 'major' | 'minor';
  status: 'open' | 'in_progress' | 'resolved';
  fixNotes?: string;
}

export interface ProjectIdea extends BaseItem {
  projectId?: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
}

export interface SoftwareProject extends BaseItem {
  name: string;
  description: string;
  status: 'planning' | 'in_progress' | 'review' | 'completed' | 'archived';
  priority: Priority;
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
  startDate?: string;
  targetDate?: string;
  milestones: ProjectMilestone[];
  hoursSpent: number;
}
