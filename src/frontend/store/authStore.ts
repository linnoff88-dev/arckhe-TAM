import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../types';
import { authApi } from '../services/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  setUser: (user: User, token: string) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ loading: true, error: null });

        try {
          const response = await authApi.login(email, password);

          if (response.success && response.data) {
            set({
              user: response.data.user,
              token: response.data.token,
              isAuthenticated: true,
              loading: false,
              error: null
            });
            return true;
          } else {
            set({
              error: response.error || 'Erro ao fazer login',
              loading: false
            });
            return false;
          }
        } catch (error) {
          set({
            error: 'Erro ao fazer login',
            loading: false
          });
          return false;
        }
      },

      logout: async () => {
        set({ loading: true });

        try {
          await authApi.logout();
        } catch (error) {
          // Ignorar erros no logout
        }

        set({
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false
        });
      },

      setUser: (user: User, token: string) => {
        set({
          user,
          token,
          isAuthenticated: true
        });
      },

      clearError: () => set({ error: null })
    }),
    {
      name: 'auth-storage'
    }
  )
);
