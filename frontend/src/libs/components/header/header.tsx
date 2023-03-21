import avatarImage from '~/assets/img/default-avatar-profile-icon.svg';
import { Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/app-route.enum';
import { type UserAuthResponse } from '~/packages/users/users.js';

import styles from './styles.module.scss';

type Properties = {
  user: UserAuthResponse;
};

const Header: React.FC<Properties> = ({ user }: Properties) => {
  return (
    <header className={styles['header']}>
      <div className={styles['logo-wrapper']}>
        <div className={styles['logo-icon']} />
        <span className={styles['logo-text']}>logo</span>
      </div>
      <div className={styles['header-sidebar']}>
        <ul className={styles['header-nav-list']}>
          <li>
            <Link to={AppRoute.ROOT}>
              <span className={styles['section-title']}>My sites</span>
            </Link>
          </li>
        </ul>
        <div className={styles['profile-data-wrapper']}>
          <img
            alt="profile"
            src={avatarImage}
            className={styles['profile-icon']}
          />
          <span className={styles['profile-caption']}>
            {user.firstName} {user.lastName}
          </span>
        </div>
      </div>
    </header>
  );
};

export { Header };
