import { AxiosError } from 'axios';
import type { ApiErrorBody } from '@shared/types/auth';

const DEFAULT_ERROR_MESSAGE =
  '지금은 설명을 가져올 수 없어요. 잠시 후 다시 시도해 주세요.';

const UNAVAILABLE_MESSAGE =
  '지금은 용어 설명을 만들 수 없어요. 잠시 후 다시 시도해 주세요.';

const LOGIN_REQUIRED_MESSAGE = '로그인하면 용어 설명을 볼 수 있어요.';

export const getTermExplanationErrorMessage = (error: unknown): string => {
  if (!(error instanceof AxiosError)) return DEFAULT_ERROR_MESSAGE;

  if (error.response?.status === 401) return LOGIN_REQUIRED_MESSAGE;

  const body = error.response?.data as ApiErrorBody | undefined;
  if (body?.code === 'TERM_EXPLANATION_UNAVAILABLE') return UNAVAILABLE_MESSAGE;

  return body?.message || DEFAULT_ERROR_MESSAGE;
};
