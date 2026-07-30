import { create } from 'zustand';
import i18n from '../i18n';

interface LanguageState {
  language: 'en' | 'vi';
  setLanguage: (lang: 'en' | 'vi') => void;
  toggleLanguage: () => void;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  language: 'en',
  setLanguage: (lang) => {
    i18n.changeLanguage(lang);
    set({ language: lang });
  },
  toggleLanguage: () => {
    const nextLang = get().language === 'en' ? 'vi' : 'en';
    get().setLanguage(nextLang);
  },
}));
