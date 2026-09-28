import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  useKakaoLogin,
  getKakaoOAuthReturnPath,
  clearKakaoOAuthReturnPath,
} from '@pages/login/hooks/useKakaoLogin';

const requestedCodes = new Set<string>();

const useKakaoOAuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { mutateAsync } = useKakaoLogin();

  useEffect(() => {
    const code = searchParams.get('code');
    const kakaoError = searchParams.get('error');
    const returnPath = getKakaoOAuthReturnPath() ?? '/login';

    const goBack = () => {
      clearKakaoOAuthReturnPath();
      navigate(returnPath, { replace: true });
    };

    if (kakaoError || !code) {
      goBack();
      return;
    }

    if (requestedCodes.has(code)) return;
    requestedCodes.add(code);

    const login = async () => {
      try {
        const data = await mutateAsync(code);
        clearKakaoOAuthReturnPath();
        navigate(data.isNewUser ? '/onboarding' : '/', { replace: true });
      } catch {
        requestedCodes.delete(code);
        goBack();
      }
    };

    void login();
  }, [mutateAsync, navigate, searchParams]);
};

const KakaoOAuthCallback = () => {
  useKakaoOAuthCallback();
  return null;
};

export default KakaoOAuthCallback;
