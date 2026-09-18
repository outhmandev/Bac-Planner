import { BaseItem, Priority } from './common';

export type GoalDomain = 'academic' | 'tech' | 'german' | 'personal' | 'fitness';

export interface GoalMilestone {
  id: string;
  goalId: string;
  title: string;
  targetDate?: string;
  completed: boolean;
}

export interface LifeGoal extends BaseItem {
  title: string;
  domain: GoalDomain;
  description: string;
  targetDate: string;
  priority: Priority;
  milestones: GoalMilestone[];
  completed: boolean;
}
