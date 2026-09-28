import type { PackageItem } from '@pages/package/types';
import patternAsterisk from '@shared/assets/images/package/pattern-1-asterisk.svg';
import patternHalfCircle from '@shared/assets/images/package/pattern-2-halfcircle.svg';
import patternQuarter from '@shared/assets/images/package/pattern-3-quarter.svg';
import patternChevron from '@shared/assets/images/package/pattern-4-chevron.svg';

// 패키지 표시 정보(제목·문구·패턴·색상). 정책 목록과 개수는 서버가 packageId 기준으로 내려준다.
// id는 서버 패키지 id(job-seeker, solo-youth, senior, teen)와 같아야 한다.
export const PACKAGE_ITEMS: PackageItem[] = [
  {
    id: 'job-seeker',
    title: '취업 준비생 패키지',
    headline: '취업 준비,\n혼자 하지 마세요',
    pattern: patternAsterisk,
    theme: 'yellow',
  },
  {
    id: 'solo-youth',
    title: '자취 청년 패키지',
    headline: '첫 자취,\n월세부터 챙겨요',
    pattern: patternHalfCircle,
    theme: 'black',
  },
  {
    id: 'senior',
    title: '정보취약계층 패키지',
    headline: '어르신 혜택,\n쉬운 말로 풀었어요',
    pattern: patternQuarter,
    theme: 'yellow',
  },
  {
    id: 'teen',
    title: '청소년 패키지',
    headline: '부모님 동의도,\n한 번에 전달해요',
    pattern: patternChevron,
    theme: 'black',
  },
];
