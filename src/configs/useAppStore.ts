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
  systemTheme: 'light' | 'dark';
  updateTheme: (colorScheme: 'light' | 'dark' | null) => void;
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
    storage.remove('authToken');
    set({
      isAuthenticated: false,
      token: null,
    });
  },
}));

// Theme Store
export const useThemeStore = create<ThemeState>(set => ({
  systemTheme: Appearance.getColorScheme() || 'light',
  isDarkMode: Appearance.getColorScheme() === 'dark',

  updateTheme: colorScheme => {
    set({
      systemTheme: colorScheme || 'light',
      isDarkMode: colorScheme === 'dark',
    });
  },
}));
