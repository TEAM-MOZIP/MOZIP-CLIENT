import type {
  KakaoLoginRequest,
  RefreshTokenRequest,
  TokenResponse,
} from '@shared/apis/generated/Api';

export type { KakaoLoginRequest, RefreshTokenRequest, TokenResponse };

export type AuthTokens = Required<
  Pick<TokenResponse, 'accessToken' | 'refreshToken' | 'accessTokenExpiresIn'>
>;

export type KakaoLoginResponse = Required<TokenResponse>;
export type RefreshTokenResponse = Required<TokenResponse>;
export type LogoutRequest = RefreshTokenRequest;

export type ApiErrorBody = {
  code: string;
  message: string;
  timestamp: string;
  fieldErrors: { field: string; reason: string }[] | null;
};
