export interface BacklogItem {
  id: string;
  title: string;
  description: string;
  category: 'Client' | 'TechDebt' | 'RnD';
  estimatedHours: number;
}

export interface WeeklyPlan {
  id: string;
  weekStart: Date;
  categoryPercentages: { [key: string]: number };  // Client: 50, TechDebt: 30, RnD: 20
  isFrozen: boolean;
}
