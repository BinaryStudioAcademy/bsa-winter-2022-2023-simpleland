import { Loader, RouterOutlet } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { actions as authActions } from '~/slices/auth/auth.js';

const App: React.FC = () => {
  const { user, currentUserDataStatus } = useAppSelector(({ auth }) => ({
    user: auth.user,
    currentUserDataStatus: auth.currentUserDataStatus,
  }));

  const dispatch = useAppDispatch();

  const hasUser = Boolean(user);

  useEffect(() => {
    if (!hasUser) {
      void dispatch(authActions.getCurrentUser());
    }
  }, [hasUser, dispatch]);

  if (currentUserDataStatus !== DataStatus.FULFILLED) {
    return <Loader style="yellow" />;
  }

  return <RouterOutlet />;
};

export { App };
