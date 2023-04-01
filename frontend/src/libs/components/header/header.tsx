import avatarImage from '~/assets/img/default-avatar-profile-icon.svg';
import logo from '~/assets/img/logo.svg';
import { Button, Image, Link, Popover } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/app-route.enum';
import { useAppDispatch, useCallback } from '~/libs/hooks/hooks.js';
import { type UserAuthResponse } from '~/packages/users/users.js';
import { actions as authActions } from '~/slices/auth/auth.js';

import styles from './styles.module.scss';

type Properties = {
  user: UserAuthResponse;
  pageName?: string;
};

const Header: React.FC<Properties> = ({ user, pageName = '' }: Properties) => {
  const { firstName, lastName, accountName } = user;
  const profileName = accountName?.length
    ? accountName
    : `${firstName} ${lastName}`;

  const dispatch = useAppDispatch();

  const handleLogout = useCallback((): void => {
    void dispatch(authActions.logout());
  }, [dispatch]);

  return (
    <header className={styles['header']}>
      <div className={styles['logo-wrapper']}>
        <Image alt="logo" src={logo} />
        <Link to={AppRoute.ROOT}>
          <span className={styles['logo-text']}>SimpleLand</span>
        </Link>
      </div>
      <div className={styles['header-sidebar']}>
        <ul className={styles['header-nav-list']}>
          <li>
            <Link to={AppRoute.ROOT} className={styles['page-link']}>
              <span className={styles['section-title']}>{pageName}</span>
            </Link>
          </li>
        </ul>
        <Popover
          trigger={
            <div className={styles['profile-data-wrapper']}>
              <img
                alt="profile"
                src={avatarImage}
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
