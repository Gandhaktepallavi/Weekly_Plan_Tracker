export type Category = 'Client' | 'TechDebt' | 'RnD' | 'Client Focused' | 'Tech Debt' | 'R&D';

export interface BacklogItem {
  id: string;
  title: string;
  description?: string;
  category: Category;
  estimatedHours: number;
  isAssigned: boolean;
  status?: string;
}

export interface WeeklyPlan {
  id: string;
  weekStart: string;
  weekEnd: string;
  isFrozen: boolean;
  clientPercent?: number;
  techDebtPercent?: number;
  rndPercent?: number;
  selectedMemberIds?: string[];
}

// Helper functions to convert between frontend and backend category values
export function toBackendCategory(category: string): string {
  switch (category) {
    case 'Client Focused':
      return 'Client';
    case 'Tech Debt':
      return 'TechDebt';
    case 'R&D':
      return 'RnD';
    default:
      return category;
  }
}

export function toFrontendCategory(category: string): string {
  switch (category) {
    case 'Client':
      return 'Client Focused';
    case 'TechDebt':
      return 'Tech Debt';
    case 'RnD':
      return 'R&D';
    default:
      return category;
  }
}

