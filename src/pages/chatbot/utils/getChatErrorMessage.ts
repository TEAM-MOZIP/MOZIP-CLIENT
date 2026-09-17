import { AxiosError } from 'axios';
import type { ApiErrorBody } from '@shared/types/auth';

const DEFAULT_ERROR_MESSAGE =
  '메시지 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.';

const CHAT_UNAVAILABLE_MESSAGE =
  '지금은 챗봇 응답을 생성할 수 없습니다. 잠시 후 다시 시도해 주세요.';

export const getChatErrorMessage = (error: unknown) => {
  if (!(error instanceof AxiosError)) {
    return DEFAULT_ERROR_MESSAGE;
  }

  const data = error.response?.data as ApiErrorBody | undefined;

  if (typeof data?.message === 'string' && data.message.trim()) {
    return data.message;
  }

  if (error.response?.status === 503) {
    return CHAT_UNAVAILABLE_MESSAGE;
  }

  return DEFAULT_ERROR_MESSAGE;
};
