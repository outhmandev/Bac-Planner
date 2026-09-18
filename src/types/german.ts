import { BaseItem } from './common';

export type GermanLevel = 'A1' | 'A2' | 'B1' | 'B2';

export interface VocabCard extends BaseItem {
  german: string;
  article: 'der' | 'die' | 'das' | 'none';
  plural?: string;
  translation: string;
  exampleSentence?: string;
  level: GermanLevel;
  category: 'daily' | 'ausbildung' | 'academic' | 'grammar' | 'tech';
  mastery: 'new' | 'learning' | 'review' | 'mastered';
  timesReviewed: number;
}

export interface GrammarTopic extends BaseItem {
  level: GermanLevel;
  title: string;
  ruleExplanation: string;
  exampleSentence: string;
  mastered: boolean;
}

export interface AusbildungMilestone extends BaseItem {
  title: string;
  description: string;
  category: 'language' | 'documents' | 'applications' | 'interview' | 'visa';
  targetDate?: string;
  completed: boolean;
  order: number;
  documentsNeeded?: string[];
}

export interface AusbildungApplication extends BaseItem {
  company: string;
  role: string; // e.g., "Fachinformatiker für Anwendungsentwicklung"
  location: string; // e.g., "München", "Berlin", "Frankfurt"
  appliedDate: string;
  status: 'researching' | 'applied' | 'interview_scheduled' | 'contract_offered' | 'rejected';
  contractType: string;
  portalUrl?: string;
  notes?: string;
}
