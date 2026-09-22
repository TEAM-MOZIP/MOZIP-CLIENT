const ONBOARDING_INTERESTS_STORAGE_KEY = 'mozip:onboarding-interests';

// 서버 프로필 스키마엔 관심분야 필드가 없어 로컬에만 보관한다.
// 추후 패키지 페이지의 기본 카테고리 필터 값으로 재활용할 수 있다.
export const saveOnboardingInterests = (interests: string[]) => {
  try {
    localStorage.setItem(
      ONBOARDING_INTERESTS_STORAGE_KEY,
      JSON.stringify(interests)
    );
  } catch {
    // localStorage를 쓸 수 없는 환경(프라이빗 모드 등)에서는 조용히 무시한다.
  }
};

export const getOnboardingInterests = (): string[] => {
  try {
    const raw = localStorage.getItem(ONBOARDING_INTERESTS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
};
