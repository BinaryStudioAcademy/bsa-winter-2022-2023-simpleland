import { Header, Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/app-route.enum.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useLocation,
  useTitle,
} from '~/libs/hooks/hooks.js';
import { FormDataKey } from '~/libs/packages/file/file.js';
import {
  type UserAuthResponse,
  type UserUpdateRequestDto,
} from '~/packages/users/users.js';
import { actions as usersActions } from '~/slices/users/users.js';

import { Login, Profile, Subscription } from './components/components.js';
import styles from './styles.module.scss';

const AccountSettings: React.FC = () => {
  const user = useAppSelector(({ auth }) => {
    return auth.user as UserAuthResponse;
  });
  const dispatch = useAppDispatch();
  useTitle('Settings');

  const handleUpdateUser = useCallback(
    (payload: UserUpdateRequestDto): void => {
      void dispatch(usersActions.updateUser(payload));
    },
    [dispatch],
  );

  const handleUpdateUserAvatar = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const [avatar] = event.target.files ?? [];

      if (avatar) {
        const formData = new FormData();
        formData.append(FormDataKey.FILE, avatar);

        void dispatch(usersActions.updateUserAvatar(formData));
      }
    },
    [dispatch],
  );

  const location = useLocation();

  const handleScreenRender = (): React.ReactNode => {
    switch (location.pathname) {
      case AppRoute.PROFILE: {
        return (
          <Profile
            user={user}
            onUpdateUser={handleUpdateUser}
            onUpdateUserAvatar={handleUpdateUserAvatar}
          />
        );
      }
      case AppRoute.LOGIN: {
        return <Login user={user} />;
      }
      case AppRoute.SUBSCRIPTION: {
        return <Subscription />;
      }
    }
  };

  return (
    <>
      <Header user={user} />
      <div className={styles['page']}>
        <div className={styles['page-heading']}>
          <div className={styles['container']}>
            <div className={styles['page-title']}>Account Settings</div>
            <div className={styles['page-nav']}>
              <Link
                to={AppRoute.PROFILE}
                activeClassName={styles['profile-link-active']}
              >
                Profile
              </Link>
              <Link
                to={AppRoute.LOGIN}
                activeClassName={styles['profile-link-active']}
              >
                Login
              </Link>
              <Link
                to={AppRoute.SUBSCRIPTION}
                activeClassName={styles['active-link']}
              >
                Subscription
              </Link>
            </div>
          </div>
        </div>
        <div
          className={getValidClassNames(styles['screen'], styles['container'])}
        >
          {handleScreenRender()}
        </div>
      </div>
    </>
  );
};

export { AccountSettings };
