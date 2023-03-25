import avatarImage from '~/assets/img/default-avatar-profile-icon.svg';
import { Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/app-route.enum';
import { type ProjectUserEssence } from '~/packages/projects/projects.js';

import styles from './styles.module.scss';

type Properties = {
  user: ProjectUserEssence | null;
  pageName?: string;
};

const Header: React.FC<Properties> = ({ user, pageName = '' }: Properties) => {
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
              <span className={styles['section-title']}>{pageName}</span>
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
            {user?.firstName} {user?.lastName}
          </span>
        </div>
      </div>
    </header>
  );
};

export { Header };
