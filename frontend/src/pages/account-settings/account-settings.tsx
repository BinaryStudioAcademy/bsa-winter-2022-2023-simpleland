import { Header, Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/app-route.enum.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
} from '~/libs/hooks/hooks.js';
import {
  type UserAuthResponse,
  type UserUpdateRequestDto,
} from '~/packages/users/users.js';
import { actions as usersActions } from '~/slices/users/users.js';

import { Profile } from './components/components.js';
import styles from './styles.module.scss';

const AccountSettings: React.FC = () => {
  const user = useAppSelector(({ auth }) => {
    return auth.user as UserAuthResponse;
  });
  const dispatch = useAppDispatch();

  const handleUpdateUser = useCallback(
    (payload: UserUpdateRequestDto): void => {
      void dispatch(usersActions.updateUser(payload));
    },
    [dispatch],
  );

  const handleUpdateUserAvatar = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const avatar = event.target.files?.item(0);

      if (avatar) {
        const formData = new FormData();
        formData.append('file', avatar);

        void dispatch(usersActions.updateUserAvatar(formData));
      }
    },
    [dispatch],
  );

  const handleScreenRender = (): React.ReactNode => (
    <Profile
      user={user}
      onUpdateUser={handleUpdateUser}
      onUpdateUserAvatar={handleUpdateUserAvatar}
    />
  );

  return (
    <>
      <Header user={user} pageName="Account Settings" />
      <div className={styles['page']}>
        <div className={styles['page-heading']}>
          <div className={styles['container']}>
            <div className={styles['page-title']}>Account Settings</div>
            <div className={styles['page-nav']}>
              <Link to={AppRoute.PROFILE}>Profile</Link>
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
