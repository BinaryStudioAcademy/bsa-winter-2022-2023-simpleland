import avatarPlaceholder from '~/assets/img/default-avatar-profile-icon.svg';
import logo from '~/assets/img/logo.svg';
import { Button, Image, Link, Popover } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/app-route.enum';
import { useAppDispatch, useCallback } from '~/libs/hooks/hooks.js';
import { type UserAuthResponse } from '~/packages/users/users.js';
import { actions as authActions } from '~/slices/auth/auth.js';

import styles from './styles.module.scss';

type Properties = {
  user: UserAuthResponse;
};

const Header: React.FC<Properties> = ({ user }: Properties) => {
  const { firstName, lastName, accountName, avatarUrl } = user;
  const profileName = accountName?.length
    ? accountName
    : `${firstName} ${lastName}`;

  const dispatch = useAppDispatch();

  const handleLogout = useCallback((): void => {
    void dispatch(authActions.logout());
  }, [dispatch]);

  return (
    <header className={styles['header']}>
      <Link to={AppRoute.ROOT} className={styles['logo-wrapper']}>
        <Image alt="logo" src={logo} />
        <span className={styles['logo-text']}>SimpleLand</span>
      </Link>
      <div className={styles['header-sidebar']}>
        <ul className={styles['header-nav-list']}>
          <li>
            <Link to={AppRoute.MY_PROJECTS}>
              <span className={styles['section-title']}>My projects</span>
            </Link>
          </li>
        </ul>
        <Popover
          trigger={
            <div className={styles['profile-data-wrapper']}>
              <img
                alt="profile"
                src={avatarUrl ?? avatarPlaceholder}
                className={styles['profile-icon']}
              />
              <span className={styles['profile-caption']}>{profileName}</span>
            </div>
          }
          content={
            <div className={styles['profile-popover-content']}>
              <Link to={AppRoute.PROFILE}>
                <span className={styles['profile-title']}>Profile</span>
              </Link>
              <Button
                type="button"
                style="primary"
                size="small"
                label="Log Out"
                className={styles['logout-button'] as string}
                onClick={handleLogout}
              />
            </div>
          }
        />
      </div>
    </header>
  );
};

export { Header };
