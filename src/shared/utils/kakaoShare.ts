// 카카오톡 공유(Kakao JavaScript SDK). SDK는 공유 버튼을 처음 누를 때만 불러온다.
// - VITE_KAKAO_JAVASCRIPT_KEY: 카카오 개발자 콘솔의 "JavaScript 키"(로그인에 쓰는 REST API 키와 다름)
// - 공유 링크의 도메인은 콘솔 [플랫폼 > Web > 사이트 도메인]에 등록돼 있어야 한다.
const KAKAO_SDK_URL = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';
// 카카오 텍스트 템플릿 본문은 최대 200자다.
export const KAKAO_TEXT_MAX_LENGTH = 200;

type KakaoLink = { webUrl: string; mobileWebUrl: string };

type KakaoSdk = {
  init: (appKey: string) => void;
  isInitialized: () => boolean;
  Share: {
    sendDefault: (settings: {
      objectType: 'text';
      text: string;
      link: KakaoLink;
      buttonTitle?: string;
    }) => void;
  };
};

declare global {
  interface Window {
    Kakao?: KakaoSdk;
  }
}

let sdkPromise: Promise<KakaoSdk> | null = null;

const loadKakaoSdk = (): Promise<KakaoSdk> => {
  if (window.Kakao) return Promise.resolve(window.Kakao);
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise<KakaoSdk>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = KAKAO_SDK_URL;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = () =>
      window.Kakao
        ? resolve(window.Kakao)
        : reject(new Error('Kakao SDK를 불러오지 못했어요.'));
    script.onerror = () => {
      sdkPromise = null;
      script.remove();
      reject(new Error('Kakao SDK를 불러오지 못했어요.'));
    };
    document.head.appendChild(script);
  });

  return sdkPromise;
};

export const isKakaoShareAvailable = () =>
  Boolean(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY);

export const shareToKakao = async ({
  text,
  url,
  buttonTitle = '자세히 보기',
}: {
  text: string;
  url: string;
  buttonTitle?: string;
}) => {
  const appKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY;
  if (!appKey) throw new Error('카카오 JavaScript 키가 설정되지 않았어요.');

  const kakao = await loadKakaoSdk();
  if (!kakao.isInitialized()) kakao.init(appKey);

  kakao.Share.sendDefault({
    objectType: 'text',
    text,
    link: { webUrl: url, mobileWebUrl: url },
    buttonTitle,
  });
};
