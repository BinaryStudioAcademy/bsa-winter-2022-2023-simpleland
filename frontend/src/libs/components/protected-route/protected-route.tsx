import { Navigate } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';

const ProtectedRoute: React.FC<React.PropsWithChildren> = ({
  children,
}: React.PropsWithChildren) => {
  const { user } = useAppSelector(({ auth }) => ({ user: auth.user }));
  const hasAuthenticatedUser = Boolean(user);

  if (!hasAuthenticatedUser) {
    return <Navigate to={AppRoute.SIGN_IN} replace />;
  }

  return <>{children}</>;
};

export { ProtectedRoute };
