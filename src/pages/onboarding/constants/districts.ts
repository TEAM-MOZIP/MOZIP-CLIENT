/* 서울특별시 자치구 25개 (가나다 순) */
export const SEOUL_DISTRICTS = [
  '강남구',
  '강동구',
  '강북구',
  '강서구',
  '관악구',
  '광진구',
  '구로구',
  '금천구',
  '노원구',
  '도봉구',
  '동대문구',
  '동작구',
  '마포구',
  '서대문구',
  '서초구',
  '성동구',
  '성북구',
  '송파구',
  '양천구',
  '영등포구',
  '용산구',
  '은평구',
  '종로구',
  '중구',
  '중랑구',
] as const;

export type SeoulDistrict = (typeof SEOUL_DISTRICTS)[number];

/* 주민등록인구 상위 9개 자치구 */
export const POPULAR_DISTRICTS: SeoulDistrict[] = [
  '송파구',
  '강서구',
  '강남구',
  '노원구',
  '관악구',
  '은평구',
  '강동구',
  '양천구',
  '성북구',
];
