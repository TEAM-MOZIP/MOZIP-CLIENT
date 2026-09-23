import { useSyncExternalStore } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { selectIsLoggedIn, useAuthStore } from '@shared/stores/useAuthStore';

const subscribeHydration = (onStoreChange: () => void) =>
  useAuthStore.persist.onFinishHydration(onStoreChange);

const getHydrationSnapshot = () => useAuthStore.persist.hasHydrated();

const RequireAuth = () => {
  const isLoggedIn = useAuthStore(selectIsLoggedIn);
  const isHydrated = useSyncExternalStore(
    subscribeHydration,
    getHydrationSnapshot,
    () => false
  );

  if (!isHydrated) return null;
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default RequireAuth;
