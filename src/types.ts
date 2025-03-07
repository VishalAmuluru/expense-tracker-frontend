// src/types.ts
export interface ChartData {
    category: string;
    spent: number;
    limit: number;
  }
  
  export interface Budget {
    id: number;
    category: string;
    limit: number;
    month: string;
  }
  
  export interface Expense {
    id: number;
    title: string;
    amount: number;
    category: string;
    date: string;
    [key: string]: unknown; // Index signature for dynamic access
  }
  
  export interface FilterParams {
    category: string;
    dateRange: string;
  }