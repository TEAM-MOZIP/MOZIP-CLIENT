import { AxiosError } from 'axios';
import type { ApiErrorBody } from '@shared/types/auth';

const DEFAULT_ERROR_MESSAGE =
  '프로필 등록에 실패했어요. 잠시 후 다시 시도해주세요.';

export const getOnboardingErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    const body = error.response?.data as ApiErrorBody | undefined;
    if (body?.message) return body.message;
  }

  return DEFAULT_ERROR_MESSAGE;
};
