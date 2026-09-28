import PackageCollectionSection from '@pages/package/components/PackageCollectionSection';
import PolicyListSection from '@pages/package/components/PolicyListSection';
import { PACKAGE_ITEMS } from '@pages/package/constants/packageItems';

const PackagePage = () => {
  return (
    <div className="min-h-full bg-background-muted">
      <PackageCollectionSection items={PACKAGE_ITEMS} />
      <PolicyListSection />
    </div>
  );
};

export default PackagePage;
