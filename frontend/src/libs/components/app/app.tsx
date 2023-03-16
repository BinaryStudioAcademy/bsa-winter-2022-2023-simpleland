import { RouterOutlet, Toastr } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { useAppDispatch, useEffect, useLocation } from '~/libs/hooks/hooks.js';
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

  return (
    <>
      <RouterOutlet />
      <Toastr />
    </>
  );
};

export { App };
