import 'styled-components';

/**
 * Extend the DefaultTheme interface to define the shape of your theme object.
 * This allows you to access typed theme properties in your styled components.
 */
declare module 'styled-components' {
  export interface DefaultTheme {
    // Core theme properties
    body: string;
    text: string;

    // Form & UI properties
    formBg: string;
    cardBg: string;
    border: string;

    // Primary colors
    primary: string;
    primaryDark: string;

    // Secondary text & state colors
    textSecondary: string;
    error: string;
    statBg: string;
    progressBg: string;
  }
}

/**
 * Allow importing CSS files in TypeScript.
 */
declare module '*.css';
