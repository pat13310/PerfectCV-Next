import { create } from 'zustand';

interface TemplateStore {
  currentTemplate: string;
  setCurrentTemplate: (template: string) => void;
}

export const useTemplateStore = create<TemplateStore>((set) => ({
  currentTemplate: 'minimal',
  setCurrentTemplate: (template) => set({ currentTemplate: template }),
}));
