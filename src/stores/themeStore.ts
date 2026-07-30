import { create } from 'zustand';

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
  setDarkMode: (isDark: boolean) => void;
}

export const useThemeStore = create<ThemeState>((set) => {
  const initialDark = localStorage.getItem('portfolio_theme') === 'dark';

  // Set initial class on html element
  if (initialDark) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return {
    isDarkMode: initialDark,
    toggleTheme: () =>
      set((state) => {
        const nextMode = !state.isDarkMode;
        localStorage.setItem('portfolio_theme', nextMode ? 'dark' : 'light');
        if (nextMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { isDarkMode: nextMode };
      }),
    setDarkMode: (isDark: boolean) => {
      localStorage.setItem('portfolio_theme', isDark ? 'dark' : 'light');
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      set({ isDarkMode: isDark });
    },
  };
});
