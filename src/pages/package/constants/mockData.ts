import type { PackageItem } from '@pages/package/types';
import patternAsterisk from '@shared/assets/images/package/pattern-1-asterisk.svg';
import patternHalfCircle from '@shared/assets/images/package/pattern-2-halfcircle.svg';
import patternQuarter from '@shared/assets/images/package/pattern-3-quarter.svg';
import patternChevron from '@shared/assets/images/package/pattern-4-chevron.svg';

export const PACKAGE_ITEMS: PackageItem[] = [
  {
    id: 'job-seeker',
    title: '취업 준비생',
    headline: '취업 준비,\n혼자 하지 마세요',
    pattern: patternAsterisk,
    theme: 'yellow',
    policyCount: 42,
  },
  {
    id: 'solo-youth',
    title: '자취 청년',
    headline: '첫 자취,\n월세부터 챙겨요',
    pattern: patternHalfCircle,
    theme: 'black',
    policyCount: 38,
  },
  {
    id: 'senior',
    title: '어르신',
    headline: '어르신 혜택,\n쉬운 말로 풀었어요',
    pattern: patternQuarter,
    theme: 'yellow',
    policyCount: 35,
  },
  {
    id: 'teen',
    title: '청소년',
    headline: '부모님 동의도,\n한 번에 전달해요',
    pattern: patternChevron,
    theme: 'black',
    policyCount: 40,
  },
];
