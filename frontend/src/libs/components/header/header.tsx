import avatarImage from '~/assets/img/default-avatar-profile-icon.png';
import { Link } from '~/libs/components/components.js';
import { type UserSignInResponseDto } from '~/packages/users/users.js';

import styles from './styles.module.scss';

type Properties = {
  user: UserSignInResponseDto;
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
            <Link to="/">
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
