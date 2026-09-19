import type { PackageItem } from '@pages/package/types';
import emojiBag from '@shared/assets/images/package/emoji-1-bag.png';
import emojiHouse from '@shared/assets/images/package/emoji-2-house.png';
import emojiEdu from '@shared/assets/images/package/emoji-3-edu.png';
import emojiSprout from '@shared/assets/images/package/emoji-4-sprout.png';

export const PACKAGE_ITEMS: PackageItem[] = [
  {
    id: 'job-seeker',
    icon: emojiBag,
    title: '취업 준비생',
    description: '이력서 지원부터 면접비, 취업 장려금까지 한 번에 알아보세요.',
    policyCount: 42,
  },
  {
    id: 'solo-youth',
    icon: emojiHouse,
    title: '자취 청년',
    description:
      '월세 · 전세 지원부터 공공임대 입주 정보, 공과금, 생활비까지 한 번에 알아보세요.',
    policyCount: 38,
  },
  {
    id: 'university',
    icon: emojiEdu,
    title: '대학생',
    description:
      '장학금, 각종 교육비 · 자격증 비용, 생활 지원 정책 모음입니다.',
    policyCount: 35,
  },
  {
    id: 'early-career',
    icon: emojiSprout,
    title: '사회 초년생',
    description: '첫 직장 적응을 돕는 복지, 저축, 경력 지원 정책 모음입니다.',
    policyCount: 40,
  },
];
