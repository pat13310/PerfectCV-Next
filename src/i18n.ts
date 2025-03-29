// Configuration des langues pour next-intl
export const locales = ['en', 'fr'] as const;
export const defaultLocale = 'fr';

// Types utiles pour le typage
export type Locale = typeof locales[number];
