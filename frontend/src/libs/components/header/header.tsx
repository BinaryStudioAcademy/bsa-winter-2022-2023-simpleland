import profileImage from '~/assets/img/profile-image.png';
import { Link } from '~/libs/components/components.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

const Header: React.FC = () => {

  const { user: userData } = useAppSelector(({ auth }) => ({ user: auth.user }));
  const { users } = useAppSelector(({ users }) => users);
  const user = users.find(user => user.id === userData?.id);

  return (
    <header className={styles.header}>
      <div className={styles.logoWrapper}>
        <div className={styles.logoIcon} />
        <span className={styles.logoText}>logo</span>
      </div>
      <div className={styles.headerSidebar}>
        <ul className={styles.headerNavList}>
          <li>
            <Link to={'/'}>
              <span className={styles.sectionTitle}>My sites</span>
            </Link>
          </li>
        </ul>
        <div className={styles.profileDataWrapper}>
          <img alt={'img'} src={profileImage} className={styles.profileIcon} />
          <span className={styles.profileCaption}>
            {user?.firstName} {user?.lastName}
          </span>
        </div>
      </div>
    </header>
  );
};

export { Header };
