import { type SiteHeaderContent } from '~/packages/sections/sections.js';

import styles from './styles.module.scss';

type Properties = {
  content: SiteHeaderContent;
};

const Header: React.FC<Properties> = ({
  content: { logo, phone },
}: Properties) => {
  return (
    <div className={styles['header']}>
      <div className={styles['header-container']}>
        <div className={styles['header-logo']}>{logo}</div>
        <div className={styles['header-phone']}>{phone}</div>
      </div>
    </div>
  );
};

export { Header };
