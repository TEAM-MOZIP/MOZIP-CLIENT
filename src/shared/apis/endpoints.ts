export const ENDPOINTS = {
  // Auth - 인증 API
  AUTH: {
    REFRESH: '/api/auth/refresh',
    LOGOUT: '/api/auth/logout',
    KAKAO_LOGIN: '/api/auth/kakao/login',
    ME: '/api/users/me',
  },

  // UserProfile - 사용자 프로필 API
  USER_PROFILE: {
    ME: '/api/users/me/profile',
  },

  // Chat - 챗봇 API
  CHAT: {
    MESSAGES: '/api/chat/messages',
  },

  // Policy - 정책 조회 API
  POLICIES: {
    TERMS_EXPLAIN: (policyId: string | number) =>
      `/api/policies/${policyId}/terms/explain`,
    LIST: '/api/policies',
    SUMMARY: (policyId: string | number) => `/api/policies/${policyId}/summary`,
    APPLICATION_GUIDE: (policyId: string | number) =>
      `/api/policies/${policyId}/application-guide`,
    DETAIL: (id: string | number) => `/api/policies/${id}`,
    RECOMMENDED: '/api/policies/recommended',
    PACKAGES: '/api/policies/packages',
  },

  // Recommendation - 정책 추천/판정 API
  RECOMMENDATIONS: {
    POLICIES: '/api/recommendations/policies',
    POLICY_EVALUATION: (policyId: string | number) =>
      `/api/recommendations/policies/${policyId}/evaluation`,
    PACKAGES: '/api/recommendations/packages',
  },

  // Category - 카테고리 조회 API
  CATEGORIES: '/api/categories',

  // Region - 지역 조회 API
  REGIONS: '/api/regions',

  // Bookmark - 정책 북마크 API
  BOOKMARKS: {
    LIST: '/api/bookmarks',
    CREATE: '/api/bookmarks',
    DELETE: (policyId: string | number) => `/api/bookmarks/${policyId}`,
  },

  // Notification - 알림 API
  NOTIFICATIONS: {
    LIST: '/api/notifications',
    READ: (notificationId: string | number) =>
      `/api/notifications/${notificationId}/read`,
  },
} as const;
