import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthTokens } from '@shared/types/auth';

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiresIn: number | null;
  isLoggedIn: boolean;
  setTokens: (tokens: AuthTokens) => void;
  clearAuth: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      accessTokenExpiresIn: null,
      isLoggedIn: false,
      setTokens: ({ accessToken, refreshToken, accessTokenExpiresIn }) =>
        set({
          accessToken,
          refreshToken,
          accessTokenExpiresIn,
          isLoggedIn: true,
        }),
      clearAuth: () =>
        set({
          accessToken: null,
          refreshToken: null,
          accessTokenExpiresIn: null,
          isLoggedIn: false,
        }),
    }),
    {
      name: 'mozip-auth',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        accessTokenExpiresIn: state.accessTokenExpiresIn,
        isLoggedIn: state.isLoggedIn,
      }),
    }
  )
);
