export type ProfileInfoData = {
  profileImage?: string;
  name: string;
  email: string;
};

export type ProfileInterest = {
  id: string;
  label: string;
  icon: string;
};

export type ProfileDetailsData = {
  age: number;
  gender: string;
  region: string;
  situations: string[];
  interests: ProfileInterest[];
};

export type ScheduleStatus = 'scheduled' | 'open' | 'closing' | 'closed';

export type ScheduleItem = {
  id: string;
  title: string;
  startLabel: string;
  endLabel: string;
  /** YYYY-MM-DD — 신청 시작일 */
  startDate: string | null;
  /** YYYY-MM-DD — 신청 마감일 */
  endDate: string | null;
  status: ScheduleStatus;
};
