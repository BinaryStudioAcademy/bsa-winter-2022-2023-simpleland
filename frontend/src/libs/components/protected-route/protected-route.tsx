import { Navigate } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';

type Properties = {
  children: React.ReactNode,
};

const ProtectedRoute: React.FC<Properties> = ({ children }: Properties) => {
  const { user } = useAppSelector(({ auth }) => ({ user: auth.user }));
  const hasAuthenticatedUser = Boolean(user);

  if (!hasAuthenticatedUser) {
    return <Navigate to={AppRoute.SIGN_IN} replace />;
  }

  return <>{children}</>;
};

export { ProtectedRoute };
