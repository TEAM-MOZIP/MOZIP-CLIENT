import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthTokens } from '@shared/types/auth';

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  accessTokenExpiresIn: number | null;
  setTokens: (tokens: AuthTokens) => void;
  clearAuth: () => void;
};

export const selectIsLoggedIn = (state: AuthState) => !!state.accessToken;

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      accessTokenExpiresIn: null,
      setTokens: ({ accessToken, refreshToken, accessTokenExpiresIn }) =>
        set({
          accessToken,
          refreshToken,
          accessTokenExpiresIn,
        }),
      clearAuth: () =>
        set({
          accessToken: null,
          refreshToken: null,
          accessTokenExpiresIn: null,
        }),
    }),
    {
      name: 'mozip-auth',
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        accessTokenExpiresIn: state.accessTokenExpiresIn,
      }),
    }
  )
);
