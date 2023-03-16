import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import { useAppSelector, useEffect, useNavigate } from '~/libs/hooks/hooks.js';

type Properties = {
  children: React.ReactNode;
};
const ProtectedRoute: React.FC<Properties> = ({ children }: Properties) => {
  const { auth } = useAppSelector((auth) => auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.dataStatus === DataStatus.IDLE) {
      navigate(AppRoute.SIGN_IN);
    }
  }, [auth, navigate]);

  return <>{children}</>;
};

export { ProtectedRoute };
