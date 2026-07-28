export type AuthFieldValidation =
  | 'email'
  | 'nickname'
  | 'password'
  | 'passwordMatch';

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const NICKNAME_REGEX =
  /^[가-힣a-zA-Z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]{2,20}$/;
export const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?`~]).{8,}$/;

export const NICKNAME_HELPER_MESSAGE = '한글, 영문, 숫자, 특수문자 2-20자';
export const PASSWORD_HELPER_MESSAGE = '영문, 숫자, 특수문자 조합 8자리 이상';

export const isValidEmail = (value: string) => EMAIL_REGEX.test(value);
export const isValidNickname = (value: string) => NICKNAME_REGEX.test(value);
export const isValidPassword = (value: string) => PASSWORD_REGEX.test(value);

export const getAuthFieldValidationError = (
  validate: AuthFieldValidation | undefined,
  value: string,
  compareValue?: string
): string | undefined => {
  if (!validate || !value) return undefined;

  if (validate === 'email' && !isValidEmail(value)) {
    return '올바른 이메일 형식을 입력해주세요';
  }

  if (validate === 'nickname' && !isValidNickname(value)) {
    return NICKNAME_HELPER_MESSAGE;
  }

  if (validate === 'password' && !isValidPassword(value)) {
    return PASSWORD_HELPER_MESSAGE;
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

export const getNicknameSubmitError = (
  nickname: string
): string | undefined => {
  const trimmed = nickname.trim();
  if (!trimmed) return '닉네임을 입력해주세요';
  if (!isValidNickname(trimmed)) return NICKNAME_HELPER_MESSAGE;
  return undefined;
};

export const getPasswordSubmitError = (
  password: string
): string | undefined => {
  if (!password) return '비밀번호를 입력해주세요';
  if (!isValidPassword(password)) return PASSWORD_HELPER_MESSAGE;
  return undefined;
};

export const getPasswordConfirmSubmitError = (
  password: string,
  confirmPassword: string
): string | undefined => {
  if (!confirmPassword) return '비밀번호 확인을 입력해주세요';
  if (password !== confirmPassword) return '비밀번호가 일치하지 않습니다';
  return undefined;
};
