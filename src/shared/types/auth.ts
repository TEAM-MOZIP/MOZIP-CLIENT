export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresIn: number;
};

export type KakaoLoginRequest = {
  code: string;
};

export type KakaoLoginResponse = AuthTokens & {
  isNewUser: boolean;
};

export type RefreshTokenRequest = {
  refreshToken: string;
};

export type RefreshTokenResponse = AuthTokens & {
  isNewUser: boolean;
};

export type ApiErrorBody = {
  code: string;
  message: string;
  timestamp: string;
  fieldErrors: { field: string; reason: string }[] | null;
};
