import { Loader, RouterOutlet } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useNavigate,
} from '~/libs/hooks/hooks.js';
import { actions as appActions } from '~/slices/app/app.js';
import { actions as authActions } from '~/slices/auth/auth.js';

const App: React.FC = () => {
  const { redirectTo, user, currentUserDataStatus } = useAppSelector(
    ({ app, auth }) => ({
      redirectTo: app.navigateTo,
      user: auth.user,
      currentUserDataStatus: auth.currentUserDataStatus,
    }),
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const hasUser = Boolean(user);

  useEffect(() => {
    if (redirectTo) {
      navigate(redirectTo);

      dispatch(appActions.navigate(null));
    }
  }, [redirectTo, navigate, dispatch]);

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
