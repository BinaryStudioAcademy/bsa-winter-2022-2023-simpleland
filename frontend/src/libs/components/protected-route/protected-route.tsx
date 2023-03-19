import { Navigate } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';

type Properties = {
  children: React.ReactNode;
  redirectPath?: string;
};

const ProtectedRoute: React.FC<Properties> = ({ children, redirectPath = AppRoute.SIGN_IN }: Properties) => {
  const { user } = useAppSelector(({ auth }) => ({ user: auth.user }));
  const hasAuthenticatedUser = Boolean(user);

  if (!hasAuthenticatedUser) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children }</>;
};

export { ProtectedRoute };
