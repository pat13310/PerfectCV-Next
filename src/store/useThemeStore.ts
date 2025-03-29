import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { themes, type Theme } from '@/lib/themes';

interface CustomColors {
  primary?: string;
  secondary?: string;
  accent?: string;
  background?: string;
  text?: string;
  headings?: string;
}

interface ThemeState {
  currentTheme: Theme;
  customThemes: Theme[];
  customColors?: CustomColors;
  setCurrentTheme: (theme: Theme) => void;
  updateCurrentTheme: (updates: Partial<Theme>) => void;
  saveCustomTheme: (theme: Theme) => void;
  deleteCustomTheme: (themeId: string) => void;
  setCustomColors: (colors: CustomColors) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      currentTheme: themes['modern-blue'], // Changer pour un thème existant
      customThemes: [],
      customColors: {},
      setCurrentTheme: (theme) => set({ currentTheme: theme }),
      updateCurrentTheme: (updates) =>
        set((state) => ({
          currentTheme: { ...state.currentTheme, ...updates },
        })),
      saveCustomTheme: (theme) =>
        set((state) => ({
          customThemes: [...state.customThemes, theme],
        })),
      deleteCustomTheme: (themeId) =>
        set((state) => ({
          customThemes: state.customThemes.filter((t) => t.id !== themeId),
        })),
      setCustomColors: (colors) => set((state) => ({ 
        customColors: { 
          ...state.currentTheme.colors,
          ...colors 
        } 
      })),
    }),
    {
      name: 'theme-storage',
    }
  )
);
