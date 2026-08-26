import type { ProfileDetailsData } from '@pages/mypage/types';

type ProfileDetailsProps = {
  details: ProfileDetailsData;
  onEdit?: () => void;
};

const ProfileDetails = ({ details, onEdit }: ProfileDetailsProps) => {
  const data = [
    { label: '나이', value: `${details.age}세` },
    { label: '성별', value: details.gender },
    { label: '지역', value: details.region },
  ];

  return (
    <section className="rounded-[1.2rem] border border-gray-200 bg-white p-[2.2rem]">
      <div className="mb-[2.8rem] flex items-center justify-between">
        <h3 className="text-heading-4 font-medium">내 프로필</h3>
        <button
          type="button"
          onClick={onEdit}
          className="cursor-pointer text-caption text-gray-500 underline underline-offset-2"
        >
          수정
        </button>
      </div>

      <dl className="flex flex-col gap-[2.4rem]">
        {data.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <dt className="text-body-3 font-medium text-gray-500">
              {row.label}
            </dt>
            <dd className="text-body-3 font-medium text-gray-800">
              {row.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-[2.4rem]">
        <p className="mb-[1.2rem] text-body-3 font-medium text-gray-500">
          현재 상황
        </p>
        <div className="flex flex-wrap gap-[0.8rem]">
          {details.situations.map((situation) => (
            <span
              key={situation}
              className="rounded-full bg-primary-sub-2 px-[1.2rem] py-[0.6rem] text-caption font-medium text-gray-800"
            >
              {situation}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-[2.4rem]">
        <p className="mb-[1.2rem] text-body-3 font-medium text-gray-500">
          관심 분야
        </p>
        <div className="flex flex-wrap gap-[1rem]">
          {details.interests.map((interest) => (
            <span
              key={interest.id}
              className="inline-flex items-center gap-[0.6rem] rounded-[0.6rem] border border-primary bg-white px-[0.8rem] py-[0.4rem] text-caption font-medium text-gray-800"
            >
              <img
                src={interest.icon}
                alt=""
                aria-hidden
                className="size-[2rem] object-contain"
                draggable={false}
              />
              {interest.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfileDetails;
