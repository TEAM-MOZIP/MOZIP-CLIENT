import PackageCard from '@pages/package/components/PackageCard';
import type { PackageItem } from '@pages/package/types';

type PackageCollectionSectionProps = {
  items: PackageItem[];
};

const PackageCollectionSection = ({ items }: PackageCollectionSectionProps) => {
  return (
    <section className="w-full bg-primary-sub-2 py-[4rem]">
      <div className="mx-auto w-full px-16">
        <h2 className="text-heading-2 text-title">정책 패키지 모음</h2>
        <p className="mt-[0.4rem] text-body-2 text-body">
          나에게 맞는 상황별 정책 패키지를 확인해 보세요.
        </p>

        <div className="mt-[2rem] grid grid-cols-4 gap-[1.8rem]">
          {items.map((item) => (
            <PackageCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PackageCollectionSection;
