import ProfileInfo from '@pages/mypage/components/profile/ProfileInfo';
import ProfileDetails from '@pages/mypage/components/profile/ProfileDetails';
import CalendarSection from '@pages/mypage/components/CalendarSection';
import BookmarkSection from '@pages/mypage/components/BookmarkSection';
import { useGetMe } from '@pages/mypage/hooks/useGetMe';
import { useGetMyProfile } from '@pages/mypage/hooks/useGetMyProfile';
import { mapUserProfileToDetails } from '@pages/mypage/utils/mapUserProfileToDetails';
import type { ProfileInfoData } from '@pages/mypage/types';

const MyPage = () => {
  const { data: me } = useGetMe();
  const { data: myProfile } = useGetMyProfile();

  const profile: ProfileInfoData = {
    profileImage: me?.profileImageUrl ?? undefined,
    name: me?.nickname ?? '-',
    email: me?.email ?? '-',
  };

  const profileDetails = mapUserProfileToDetails(myProfile);

  return (
    <div className="min-h-full">
      <div className="mx-auto w-full px-[8rem] py-[6rem]">
        <h1 className="mb-[3.2rem] text-heading-2 text-gray-800">마이페이지</h1>

        <div className="flex flex-col gap-[6rem] lg:flex-row lg:items-start">
          <aside className="flex w-full shrink-0 flex-col gap-[2rem] lg:w-[32rem]">
            <ProfileInfo profile={profile} />
            {profileDetails && <ProfileDetails details={profileDetails} />}
          </aside>

          <div className="flex min-w-0 flex-1 flex-col gap-[6rem]">
            <CalendarSection />
            <hr className="border-0 border-t border-gray-200" />
            <BookmarkSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
