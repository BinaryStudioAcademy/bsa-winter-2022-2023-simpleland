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
  type UserUpdateDetailsRequestDto,
} from '~/packages/users/users.js';
import { actions as authActions } from '~/slices/auth/auth.js';

import { Profile } from './components/components.js';
import styles from './styles.module.scss';

const AccountSettings: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user) as UserAuthResponse;
  const dispatch = useAppDispatch();

  const handleUpdateUserDetails = useCallback(
    (payload: UserUpdateDetailsRequestDto): void => {
      void dispatch(authActions.updateUserDetails(payload));
    },
    [dispatch],
  );

  const getScreen = (): React.ReactNode => (
    <Profile user={user} onUpdateUserDetails={handleUpdateUserDetails} />
  );

  return (
    <>
      <Header user={user} />
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
          {getScreen()}
        </div>
      </div>
    </>
  );
};

export { AccountSettings };
