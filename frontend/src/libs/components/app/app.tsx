import { RouterOutlet } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { useAppDispatch, useEffect, useLocation } from '~/libs/hooks/hooks.js';
import { actions as authActions } from '~/slices/auth/auth.js';
import { actions as userActions } from '~/slices/users/users.js';

const App: React.FC = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const isRoot = pathname === AppRoute.ROOT;

  useEffect(() => {
    if (isRoot) {
      void dispatch(userActions.loadAll());
    }
  }, [isRoot, dispatch]);

  useEffect(() => {
    if (isRoot) {
      void dispatch(authActions.getCurrentUser());
    }
  }, [isRoot, dispatch]);

  return <RouterOutlet />;
};

export { App };
