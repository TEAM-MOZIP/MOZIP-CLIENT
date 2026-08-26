export type ProfileInfoData = {
  profileImage?: string;
  name: string;
  nickname: string;
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
  /** YYYY-MM-DD — 캘린더에 표시할 날짜 */
  date: string;
  status: ScheduleStatus;
};
