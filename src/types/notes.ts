import { BaseItem } from './common';

export interface Note extends BaseItem {
  title: string;
  content: string;
  tags: string[];
  pinned: boolean;
  category: 'idea' | 'school' | 'german' | 'tech' | 'general';
}
