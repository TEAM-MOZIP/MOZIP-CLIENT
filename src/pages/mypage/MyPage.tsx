import ProfileInfo from '@pages/mypage/components/profile/ProfileInfo';
import ProfileDetails from '@pages/mypage/components/profile/ProfileDetails';
import CalendarSection from '@pages/mypage/components/CalendarSection';
import BookmarkSection from '@pages/mypage/components/BookmarkSection';
import {
  MOCK_PROFILE_INFO,
  MOCK_PROFILE_DETAILS,
  MOCK_SCHEDULES,
  MOCK_BOOKMARKS,
} from '@pages/mypage/constants/mockData';

const MyPage = () => {
  return (
    <div className="min-h-full">
      <div className="mx-auto w-full px-[8rem] py-[6rem]">
        <h1 className="mb-[3.2rem] text-heading-2 text-gray-800">마이페이지</h1>

        <div className="flex flex-col gap-[6rem] lg:flex-row lg:items-start">
          <aside className="flex w-full shrink-0 flex-col gap-[2rem] lg:w-[32rem]">
            <ProfileInfo profile={MOCK_PROFILE_INFO} />
            <ProfileDetails details={MOCK_PROFILE_DETAILS} />
          </aside>

          <div className="flex min-w-0 flex-1 flex-col gap-[6rem]">
            <CalendarSection schedules={MOCK_SCHEDULES} />
            <hr className="border-0 border-t border-gray-200" />
            <BookmarkSection bookmarks={MOCK_BOOKMARKS} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
