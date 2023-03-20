import { type UserAuthResponse } from 'shared/build/packages/users/libs/types/types.js';

import avatarImage from '~/assets/img/default-avatar-profile-icon.svg';
import { Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/app-route.enum';

import styles from './styles.module.scss';

type Properties = {
  user: UserAuthResponse;
};

const Header: React.FC<Properties> = ({ user }: Properties) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <div className={styles.logoIcon} />
        <span className={styles.logoText}>logo</span>
      </div>
      <div className={styles.headerSidebar}>
        <ul className={styles.headerNavList}>
          <li>
            <Link to={AppRoute.ROOT}>
              <span className={styles.sectionTitle}>My sites</span>
            </Link>
          </li>
        </ul>
        <div className={styles.profileDataWrapper}>
          <img alt="profile" src={avatarImage} className={styles.profileIcon} />
          <span className={styles.profileCaption}>
            {user.firstName} {user.lastName}
          </span>
        </div>
      </div>
    </header>
  );
};

export { Header };
