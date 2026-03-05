export type Category = 'Client Focused' | 'Tech Debt' | 'R&D';

export interface BacklogItem {
  id: string;
  title: string;
  category: Category;
  estimatedHours: number;
  isAssigned: boolean;
}

export interface WeeklyPlan {
  id: string;
  weekStart: string;
  isFrozen: boolean;
}