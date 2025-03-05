import {create} from 'zustand';
import {storage} from './mmkvStorage';
import {Appearance} from 'react-native';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  setAuthenticated: (token: string) => void;
  logout: () => void;
}

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
  systemTheme: 'light' | 'dark';
  initializeTheme: () => void;
}

// Authentication Store
export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: !!storage.get<string>('authToken'),
  token: storage.get<string>('authToken') || null,

  setAuthenticated: (token: string) => {
    storage.set('authToken', token);

    set({
      isAuthenticated: true,
      token: token,
    });
  },

  logout: () => {
    // Remove token from storage
    storage.remove('authToken');

    set({
      isAuthenticated: false,
      token: null,
    });
  },
}));

// Theme Store
export const useThemeStore = create<ThemeState>((set, get) => ({
  // Prioritize stored preference, fallback to system theme
  isDarkMode:
    storage.get<boolean>('isDarkMode') ??
    Appearance.getColorScheme() === 'dark',

  systemTheme: Appearance.getColorScheme() || 'light',

  initializeTheme: () => {
    const systemTheme = Appearance.getColorScheme() || 'light';
    set({
      systemTheme,
      isDarkMode: storage.get<boolean>('isDarkMode') ?? systemTheme === 'dark',
    });
  },

  toggleTheme: () => {
    set(state => {
      const newIsDarkMode = !state.isDarkMode;
      storage.set('isDarkMode', newIsDarkMode);
      return {
        isDarkMode: newIsDarkMode,
        systemTheme: Appearance.getColorScheme() || 'light',
      };
    });
  },
}));

// Optional: Add a listener for system theme changes
Appearance.addChangeListener(preferences => {
  const {systemTheme, initializeTheme} = useThemeStore.getState();
  if (systemTheme !== preferences.colorScheme) {
    initializeTheme();
  }
});
