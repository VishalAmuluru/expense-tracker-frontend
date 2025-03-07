// src/themes.ts
import { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
  body: '#ffffff',
  text: '#1e293b',
  formBg: '#f8fafc',
  cardBg: '#ffffff',
  border: '#e2e8f0',
  primary: '#3b82f6',
  primaryDark: '#2563eb',
  textSecondary: '#64748b',
  error: '#dc2626',
  statBg: '#f1f5f9',
  progressBg: '#e2e8f0'
};

export const darkTheme: DefaultTheme = {
  body: '#0f172a',
  text: '#f8fafc',
  formBg: '#1e293b',
  cardBg: '#334155',
  border: '#475569',
  primary: '#60a5fa',
  primaryDark: '#3b82f6',
  textSecondary: '#94a3b8',
  error: '#f87171',
  statBg: '#1e293b',
  progressBg: '#475569'
};