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
