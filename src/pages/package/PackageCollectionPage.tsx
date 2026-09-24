import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PolicyCard from '@pages/package/components/PolicyCard';
import PolicyDetailModal from '@pages/package/components/PolicyDetailModal';
import {
  getPackageCollectionCategories,
  getPackagePolicyDetailBundle,
  PACKAGE_ITEMS,
  type PackagePolicyView,
} from '@pages/package/constants/mockData';

const PackageCollectionPage = () => {
  const { packageId = '' } = useParams();
  const pack = PACKAGE_ITEMS.find((item) => item.id === packageId);
  const categories = getPackageCollectionCategories(packageId);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | 'all'>(
    'all'
  );
  const [selectedPolicyId, setSelectedPolicyId] = useState<number | null>(null);
  const [bookmarkOverrides, setBookmarkOverrides] = useState<
    Record<number, boolean>
  >({});

  const activeCategoryId =
    selectedCategoryId !== 'all' &&
    categories.some((category) => category.categoryId === selectedCategoryId)
      ? selectedCategoryId
      : 'all';

  const visibleCategories =
    activeCategoryId === 'all'
      ? categories
      : categories.filter(
          (category) => category.categoryId === activeCategoryId
        );

  const totalPolicies = categories.reduce(
    (count, category) => count + category.policies.length,
    0
  );

  const getCategoryChipClassName = (isActive: boolean) =>
    [
      'cursor-pointer rounded-full border px-[1.4rem] py-[0.6rem] text-caption font-medium transition-colors duration-200',
      isActive
        ? 'border-primary bg-primary-sub-2'
        : 'border-gray-200 bg-white text-gray-700 hover:border-primary-sub-1 hover:bg-primary-sub-3',
    ].join(' ');

  const isBookmarked = (item: PackagePolicyView) =>
    bookmarkOverrides[item.id] ?? item.bookmarked ?? false;

  const handleBookmarkClick = (item: PackagePolicyView) => {
    setBookmarkOverrides((prev) => ({
      ...prev,
      [item.id]: !isBookmarked(item),
    }));
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
            <h1 className="text-heading-3 text-title">{pack.title} 패키지</h1>
            <p className="text-body-2 text-gray-600">
              {pack.headline.replace(/\n/g, ' ')}
            </p>
          </div>
        </div>
      </section>

      <section className="w-full bg-background-default py-[4rem]">
        <div className="mx-auto w-full px-16">
          {categories.length === 0 ? (
            <p className="py-[4rem] text-center text-body-2 text-gray-500">
              이 패키지에 포함된 정책이 없어요.
            </p>
          ) : (
            <>
              <div className="flex flex-wrap gap-[0.8rem]">
                <button
                  type="button"
                  onClick={() => setSelectedCategoryId('all')}
                  className={getCategoryChipClassName(
                    activeCategoryId === 'all'
                  )}
                >
                  전체 {totalPolicies}
                </button>
                {categories.map((category) => (
                  <button
                    key={category.categoryId}
                    type="button"
                    onClick={() => setSelectedCategoryId(category.categoryId)}
                    className={getCategoryChipClassName(
                      activeCategoryId === category.categoryId
                    )}
                  >
                    {category.categoryName} {category.policies.length}
                  </button>
                ))}
              </div>

              <div className="mt-[4rem] flex flex-col gap-[4rem]">
                {visibleCategories.map((category) => (
                  <section key={category.categoryId}>
                    <div className="mb-[1.6rem] flex items-end justify-between">
                      <h2 className="text-heading-4 font-semibold text-gray-800">
                        {category.categoryName}
                      </h2>
                    </div>

                    <div className="grid grid-cols-3 gap-[3.6rem_3.2rem]">
                      {category.policies.map((policy) => (
                        <PolicyCard
                          key={policy.id}
                          {...policy}
                          bookmarked={
                            policy.bookmarked === null
                              ? null
                              : isBookmarked(policy)
                          }
                          onBookmarkClick={() => handleBookmarkClick(policy)}
                          onClick={() => setSelectedPolicyId(policy.id)}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {selectedPolicyId !== null && (
        <PolicyDetailModal
          policyId={selectedPolicyId}
          mockData={getPackagePolicyDetailBundle(selectedPolicyId)}
          onClose={() => setSelectedPolicyId(null)}
        />
      )}
    </div>
  );
};

export default PackageCollectionPage;
