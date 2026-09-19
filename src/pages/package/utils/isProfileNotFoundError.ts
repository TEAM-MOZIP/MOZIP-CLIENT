import { AxiosError } from 'axios';
import type { ApiErrorBody } from '@shared/types/auth';

export const isProfileNotFoundError = (error: unknown) =>
  error instanceof AxiosError &&
  error.response?.status === 404 &&
  (error.response?.data as ApiErrorBody | undefined)?.code ===
    'USER_PROFILE_NOT_FOUND';
