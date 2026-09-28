import type {
  EmploymentStatus,
  Occupation,
} from '@pages/onboarding/types/onboarding';

// 정책 데이터는 취업 조건을 "재직" 또는 "구직·미취업" 묶음으로만 쓰므로,
// 학생·쉬는 중·기타는 모두 UNEMPLOYED로 보내도 판정 결과가 같다.
export const OCCUPATION_OPTIONS: {
  id: Occupation;
  label: string;
  description?: string;
  employmentStatus: EmploymentStatus;
}[] = [
  {
    id: 'STUDENT',
    label: '학생',
    description: '대학생·고등학생 등',
    employmentStatus: 'UNEMPLOYED',
  },
  {
    id: 'OFFICE_WORKER',
    label: '직장인',
    description: '정규직·계약직·아르바이트',
    employmentStatus: 'EMPLOYED',
  },
  {
    id: 'SELF_EMPLOYED',
    label: '자영업·프리랜서',
    employmentStatus: 'EMPLOYED',
  },
  {
    id: 'JOB_SEEKER',
    label: '취업 준비 중',
    description: '구직·이직 준비',
    employmentStatus: 'JOB_SEEKER',
  },
  { id: 'RESTING', label: '쉬는 중·은퇴', employmentStatus: 'UNEMPLOYED' },
  {
    id: 'OTHER',
    label: '기타',
    description: '전업주부 등',
    employmentStatus: 'UNEMPLOYED',
  },
];
