import { useEffect, useRef } from 'react';
import { useGetNotifications } from '@shared/hooks/useGetNotifications';
import { useMarkNotificationAsRead } from '@shared/hooks/useMarkNotificationAsRead';
import { formatDate } from '@shared/utils/formatDate';
import bellIcon from '@shared/assets/icons/bell.svg';

type NotificationDropdownProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const NotificationDropdown = ({
  isOpen,
  onOpenChange,
}: NotificationDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { data: notifications = [] } = useGetNotifications();
  const { mutate: markAsRead } = useMarkNotificationAsRead();

  const unreadCount = notifications.filter((item) => !item.read).length;

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onOpenChange(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen, onOpenChange]);

  const handleItemClick = (notificationId?: number, isRead?: boolean) => {
    if (notificationId == null || isRead) return;
    markAsRead(notificationId);
  };

  return (
    <div ref={dropdownRef} className="relative shrink-0">
      <button
        type="button"
        aria-label="알림"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        onClick={() => onOpenChange(!isOpen)}
        className={[
          'relative flex size-[4.2rem] shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-300 transition-colors',
          isOpen ? 'bg-gray-100' : 'bg-white',
        ].join(' ')}
      >
        <img
          src={bellIcon}
          alt=""
          className="h-[2.2rem] w-auto"
          aria-hidden
          draggable={false}
        />
        {unreadCount > 0 && (
          <span
            aria-label={`읽지 않은 알림 ${unreadCount}개`}
            className="absolute top-0 right-0 flex size-[1.4rem] items-center justify-center rounded-full bg-point font-pretendard text-[1rem] font-bold text-white"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          role="menu"
          aria-label="알림 목록"
          className="absolute top-[calc(100%+0.8rem)] right-0 z-50 w-[36rem] overflow-hidden rounded-[1.2rem] border border-gray-300 bg-white"
        >
          <div className="flex items-center justify-between px-[1.6rem] py-[1rem]">
            <span className="text-body-4 text-gray-800 font-semibold">
              알림
            </span>
            {unreadCount > 0 && (
              <span className="text-caption text-gray-500">
                새 알림 {unreadCount}개
              </span>
            )}
          </div>
          <div className="h-px bg-gray-300" aria-hidden />

          {notifications.length === 0 ? (
            <p className="px-[1.4rem] py-[2.8rem] text-center text-caption text-gray-500">
              새로운 알림이 없습니다.
            </p>
          ) : (
            <ul className="max-h-[36rem] overflow-y-auto">
              {notifications.map((item, index) => {
                const isUnread = !item.read;

                return (
                  <li key={item.notificationId ?? index}>
                    {index > 0 && (
                      <div className="h-px bg-gray-200" aria-hidden />
                    )}
                    <button
                      type="button"
                      role="menuitem"
                      onClick={() =>
                        handleItemClick(item.notificationId, item.read)
                      }
                      className={[
                        'flex w-full cursor-pointer gap-[1rem] px-[1.6rem] py-[1rem] text-left transition-colors hover:bg-gray-100',
                        isUnread ? 'bg-primary-sub-3' : 'bg-white',
                      ].join(' ')}
                    >
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-caption text-gray-800 font-semibold">
                          {item.title}
                        </p>
                        <p className="line-clamp-2 text-caption text-gray-600 font-regular">
                          {item.content}
                        </p>
                        {item.createdAt && (
                          <p className="mt-[0.4rem] text-[1.2rem] text-gray-500">
                            {formatDate(item.createdAt)}
                          </p>
                        )}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
