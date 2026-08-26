import type { ProfileInfoData } from '@pages/mypage/types';
import defaultProfile from '@shared/assets/images/default-profile.png';

type ProfileInfoProps = {
  profile: ProfileInfoData;
  onEdit?: () => void;
};

const ProfileInfo = ({ profile, onEdit }: ProfileInfoProps) => {
  const { profileImage, name, nickname, email } = profile;

  return (
    <section className="flex flex-col items-center rounded-[1.2rem] border border-gray-200 bg-white p-[2.4rem] gap-[1.6rem]">
      <div className="flex size-[8rem] items-center justify-center overflow-hidden rounded-full">
        <img
          src={profileImage ?? defaultProfile}
          alt=""
          className="size-full object-cover"
          draggable={false}
        />
      </div>

      <div className="flex flex-col items-center gap-[0.4rem]">
        <h2 className="text-body-1 font-semibold text-black">{name}</h2>
        <p className="text-body-3 text-gray-500">@{nickname}</p>
      </div>

      <p className="text-body-3 text-gray-700">{email}</p>

      <button
        type="button"
        onClick={onEdit}
        className="cursor-pointer text-caption text-gray-500 underline underline-offset-2"
      >
        수정
      </button>
    </section>
  );
};

export default ProfileInfo;
