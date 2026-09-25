import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PolicyCard from '@pages/package/components/PolicyCard';
import PolicyDetailModal from '@pages/package/components/PolicyDetailModal';
import { PACKAGE_ITEMS } from '@pages/package/constants/packageItems';
import {
  usePackageDetail,
  usePackageSectionPolicies,
} from '@pages/package/hooks/usePolicyPackages';
import { useToggleBookmark } from '@pages/package/hooks/useToggleBookmark';
import type { PolicyListItem } from '@pages/package/types/package';

const ALL_SECTIONS = 'all';

const MORE_BUTTON_CLASS_NAME =
  'rounded-[0.8rem] border border-gray-300 px-[3.2rem] py-[1.2rem] text-button-2 text-title transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60';

const getSectionChipClassName = (isActive: boolean) =>
  [
    'cursor-pointer rounded-full border px-[1.4rem] py-[0.6rem] text-caption font-medium transition-colors duration-200',
    isActive
      ? 'border-primary bg-primary-sub-2'
      : 'border-gray-200 bg-white text-gray-700 hover:border-primary-sub-1 hover:bg-primary-sub-3',
  ].join(' ');

const StatusMessage = ({ children }: { children: string }) => (
  <p className="py-[4rem] text-center text-body-2 text-gray-500">{children}</p>
);

const PackageCollectionPage = () => {
  const { packageId = '' } = useParams();
  const pack = PACKAGE_ITEMS.find((item) => item.id === packageId);
  const {
    data: detail,
    isLoading,
    isError,
  } = usePackageDetail(packageId, pack !== undefined);
  const [selectedSectionKey, setSelectedSectionKey] =
    useState<string>(ALL_SECTIONS);
  const [selectedPolicyId, setSelectedPolicyId] = useState<number | null>(null);
  const [bookmarkOverrides, setBookmarkOverrides] = useState<
    Record<number, boolean>
  >({});
  const { mutate: mutateBookmark } = useToggleBookmark();

  // 정책이 없는 섹션은 칩·목록에서 숨긴다.
  const sections = (detail?.sections ?? []).filter(
    (section) => section.totalCount > 0
  );
  const activeSection =
    sections.find((section) => section.key === selectedSectionKey) ?? null;

  const {
    data: sectionData,
    isLoading: isSectionLoading,
    isError: isSectionError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = usePackageSectionPolicies(packageId, activeSection?.key ?? null);
  const sectionItems = sectionData?.pages.flatMap((page) => page.items) ?? [];

  const isBookmarked = (item: PolicyListItem) =>
    bookmarkOverrides[item.id] ?? item.bookmarked ?? false;

  const handleBookmarkClick = (item: PolicyListItem) => {
    const next = !isBookmarked(item);
    setBookmarkOverrides((prev) => ({ ...prev, [item.id]: next }));
    mutateBookmark(
      { policyId: item.id, bookmarked: next },
      {
        onError: () => {
          setBookmarkOverrides((prev) => ({ ...prev, [item.id]: !next }));
        },
      }
    );
  };

  const renderPolicyGrid = (policies: PolicyListItem[]) => (
    <div className="grid grid-cols-3 gap-[3.6rem_3.2rem]">
      {policies.map((policy) => (
        <PolicyCard
          key={policy.id}
          {...policy}
          bookmarked={policy.bookmarked === null ? null : isBookmarked(policy)}
          onBookmarkClick={() => handleBookmarkClick(policy)}
          onClick={() => setSelectedPolicyId(policy.id)}
        />
      ))}
    </div>
  );

  const renderAllSections = () => (
    <div className="mt-[4rem] flex flex-col gap-[4rem]">
      {sections.map((section) => (
        <section key={section.key}>
          <div className="mb-[1.6rem] flex items-end justify-between">
            <h2 className="text-heading-4 font-semibold text-gray-800">
              {section.name}
            </h2>
            {section.totalCount > section.policies.length && (
              <button
                type="button"
                onClick={() => setSelectedSectionKey(section.key)}
                className="cursor-pointer text-body-3 font-medium text-gray-500 hover:text-gray-800"
              >
                {section.totalCount}개 모두 보기 ›
              </button>
            )}
          </div>
          {renderPolicyGrid(section.policies)}
        </section>
      ))}
    </div>
  );

  const renderActiveSection = (name: string) => (
    <section className="mt-[4rem]">
      <h2 className="mb-[1.6rem] text-heading-4 font-semibold text-gray-800">
        {name}
      </h2>
      {isSectionLoading ? (
        <StatusMessage>정책을 불러오는 중이에요.</StatusMessage>
      ) : isSectionError ? (
        <StatusMessage>
          정책을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
        </StatusMessage>
      ) : (
        <>
          {renderPolicyGrid(sectionItems)}
          {hasNextPage && (
            <div className="mt-[3.2rem] flex justify-center">
              <button
                type="button"
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                className={MORE_BUTTON_CLASS_NAME}
              >
                {isFetchingNextPage ? '불러오는 중...' : '더보기'}
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );

  const renderBody = () => {
    if (isLoading) {
      return <StatusMessage>정책 패키지를 불러오는 중이에요.</StatusMessage>;
    }
    if (isError) {
      return (
        <StatusMessage>
          정책 패키지를 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
        </StatusMessage>
      );
    }
    if (sections.length === 0) {
      return <StatusMessage>이 패키지에 포함된 정책이 없어요.</StatusMessage>;
    }

    return (
      <>
        <div className="flex flex-wrap gap-[0.8rem]">
          <button
            type="button"
            onClick={() => setSelectedSectionKey(ALL_SECTIONS)}
            className={getSectionChipClassName(activeSection === null)}
          >
            전체 {detail?.policyCount ?? 0}
          </button>
          {sections.map((section) => (
            <button
              key={section.key}
              type="button"
              onClick={() => setSelectedSectionKey(section.key)}
              className={getSectionChipClassName(
                activeSection?.key === section.key
              )}
            >
              {section.name} {section.totalCount}
            </button>
          ))}
        </div>

        {activeSection
          ? renderActiveSection(activeSection.name)
          : renderAllSections()}
      </>
    );
  };

  if (!pack) {
    return (
      <div className="flex min-h-[calc(100dvh-8.1rem)] flex-col items-center justify-center bg-gray-200">
        <p className="text-body-2 text-gray-600">
          해당 패키지를 찾을 수 없어요.
        </p>
        <div className="mt-[1.6rem] text-center">
          <Link
            to="/package"
            className="text-body-3 text-gray-500 underline underline-offset-3"
          >
            정책 모음으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full">
      <section className="w-full bg-primary-sub-2 py-[4.8rem]">
        <div className="mx-auto w-full px-16">
          <div className="flex flex-col items-flex-start gap-[1.4rem]">
            <h1 className="text-heading-3 text-title">{pack.title}</h1>
            <p className="text-body-2 text-gray-600">
              {pack.headline.replace(/\n/g, ' ')}
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-background-default py-[4rem]">
        <div className="mx-auto w-full px-16">{renderBody()}</div>
      </section>

      {selectedPolicyId !== null && (
        <PolicyDetailModal
          policyId={selectedPolicyId}
          onClose={() => setSelectedPolicyId(null)}
        />
      )}
    </div>
  );
};

export default PackageCollectionPage;
