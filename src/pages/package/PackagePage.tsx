import PackageCollectionSection from '@pages/package/components/PackageCollectionSection';
import PolicyListSection from '@pages/package/components/PolicyListSection';
import {
  FILTER_GROUPS,
  PACKAGE_ITEMS,
  POLICY_ITEMS,
  TOTAL_POLICY_COUNT,
} from '@pages/package/constants/mockData';

const PackagePage = () => {
  return (
    <div className="min-h-full bg-background-muted">
      <PackageCollectionSection items={PACKAGE_ITEMS} />
      <PolicyListSection
        filterGroups={FILTER_GROUPS}
        policies={POLICY_ITEMS}
        totalCount={TOTAL_POLICY_COUNT}
      />
    </div>
  );
};

export default PackagePage;
