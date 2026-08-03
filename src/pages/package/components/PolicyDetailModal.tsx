import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import type { PolicyItem } from '@pages/package/types';
import { TAG_STYLES } from '@pages/package/constants/tagStyles';
import bookmarkIcon from '@shared/assets/icons/bookmark.svg';
import bookmarkFilledIcon from '@shared/assets/icons/bookmark-filled.svg';

type PolicyDetailModalProps = {
  policy: PolicyItem;
  bookmarked: boolean;
  onClose: () => void;
  onBookmarkClick: () => void;
  onShareClick?: () => void;
};

const DetailSection = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <section className="border-t border-gray-200 py-[2rem]">
    <h3 className="text-body-2 font-bold text-title">{title}</h3>
    <div className="mt-[1.2rem]">{children}</div>
  </section>
);

const BulletList = ({ items }: { items: string[] }) => (
  <ul className="flex flex-col gap-[0.6rem]">
    {items.map((item) => (
      <li key={item} className="text-body-3 text-body">
        • {item}
      </li>
    ))}
  </ul>
);

const TextBlock = ({ children }: { children: ReactNode }) => (
  <p className="text-body-3 text-body">{children}</p>
);

const PolicyDetailModal = ({
  policy,
  bookmarked,
  onClose,
  onBookmarkClick,
  onShareClick,
}: PolicyDetailModalProps) => {
  const tags = [
    { kind: 'age' as const, label: policy.age },
    { kind: 'category' as const, label: policy.category },
    { kind: 'region' as const, label: policy.region },
  ];

  const sections = [
    {
      title: '📌 정책 소개',
      content: <TextBlock>{policy.introduction}</TextBlock>,
    },
    {
      title: '💰 지원 내용',
      content: <BulletList items={policy.supportContents} />,
    },
    {
      title: '👤 신청 대상',
      content: <BulletList items={policy.eligibility} />,
    },
    {
      title: '📅 신청 기간',
      content: <TextBlock>{policy.period}</TextBlock>,
    },
    {
      title: '📝 준비 서류',
      content: <BulletList items={policy.documents} />,
    },
    {
      title: '⚠️ 유의사항',
      content: <BulletList items={policy.notes} />,
    },
    {
      title: '📞 문의처',
      content: (
        <>
          <TextBlock>{policy.contactName}</TextBlock>
          <p className="mt-[0.4rem] text-body-3 text-body">
            {policy.contactPhone}
          </p>
        </>
      ),
    },
  ];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/30 px-[2rem]"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="policy-detail-title"
        className="flex max-h-[85vh] w-full max-w-[68rem] flex-col overflow-hidden rounded-[1.2rem] border border-gray-300 bg-white shadow-[0_0.8rem_2.4rem_rgba(0,0,0,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="min-h-0 flex-1 overflow-y-auto px-[3.6rem] pt-[4rem] pb-[1.8rem]">
          <h3
            id="policy-detail-title"
            className="text-heading-3 font-bold text-title"
          >
            {policy.title}
          </h3>

          <div className="flex flex-wrap gap-[1rem] py-[2rem]">
            {tags.map(({ kind, label }) => {
              const style = TAG_STYLES[kind];
              return (
                <span
                  key={kind}
                  className="shrink-0 whitespace-nowrap rounded-[0.8rem] border px-[1rem] py-[0.2rem] font-semibold text-body-3 text-title"
                  style={{
                    borderColor: style.border,
                    backgroundColor: style.background,
                  }}
                >
                  {label}
                </span>
              );
            })}
          </div>

          {sections.map(({ title, content }) => (
            <DetailSection key={title} title={title}>
              {content}
            </DetailSection>
          ))}
        </div>

        <div className="relative shrink-0 bg-white px-[3.2rem] pt-[1.2rem] pb-[2rem]">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-full h-[4rem] bg-gradient-to-b from-transparent to-white"
          />
          <div className="flex items-center gap-[1.2rem]">
            <button
              type="button"
              aria-label={bookmarked ? '북마크 해제' : '북마크'}
              aria-pressed={bookmarked}
              onClick={onBookmarkClick}
              className="flex size-[4.4rem] shrink-0 cursor-pointer items-center justify-center rounded-[0.8rem] border border-gray-300 bg-white"
            >
              <img
                src={bookmarked ? bookmarkFilledIcon : bookmarkIcon}
                alt=""
                aria-hidden
                className="size-[2.4rem]"
              />
            </button>

            <button
              type="button"
              onClick={onShareClick}
              className="flex h-[4.4rem] flex-1 cursor-pointer items-center justify-center rounded-[0.8rem] border border-gray-300 bg-white text-button-2 text-title transition-colors duration-200 hover:bg-gray-100"
            >
              공유
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex h-[4.4rem] flex-1 cursor-pointer items-center justify-center rounded-[0.8rem] border border-gray-300 bg-white text-button-2 text-title transition-colors duration-200 hover:bg-gray-100"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PolicyDetailModal;
