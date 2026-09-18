import { BaseItem } from './common';

export type EventCategory = 'exam' | 'deadline' | 'appointment' | 'study_session' | 'milestone' | 'task';

export interface CalendarEvent extends BaseItem {
  title: string;
  category: EventCategory;
  startDate: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD
  startTime?: string; // HH:mm
  endTime?: string;   // HH:mm
  allDay: boolean;
  colorVar?: string;
  description?: string;
  relatedEntityId?: string; // Links to Exam, Project, Task, etc.
}
