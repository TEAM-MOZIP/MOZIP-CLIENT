export type AuthFieldValidation = 'email' | 'passwordMatch';

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValidEmail = (value: string) => EMAIL_REGEX.test(value);

export const getAuthFieldValidationError = (
  validate: AuthFieldValidation | undefined,
  value: string,
  compareValue?: string
): string | undefined => {
  if (!validate || !value) return undefined;

  if (validate === 'email' && !isValidEmail(value)) {
    return '올바른 이메일 형식을 입력해주세요';
  }

  if (
    validate === 'passwordMatch' &&
    compareValue !== undefined &&
    value !== compareValue
  ) {
    return '비밀번호가 일치하지 않습니다';
  }

  return undefined;
};

export const getEmailSubmitError = (email: string): string | undefined => {
  const trimmed = email.trim();
  if (!trimmed) return '이메일을 입력해주세요';
  if (!isValidEmail(trimmed)) return '올바른 이메일 형식을 입력해주세요';
  return undefined;
};

export const getPasswordSubmitError = (
  password: string
): string | undefined => {
  if (!password) return '비밀번호를 입력해주세요';
  return undefined;
};
