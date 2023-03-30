import { type SiteFooterContent } from '~/packages/sections/sections.js';

import styles from './styles.module.scss';

type Properties = {
  content: SiteFooterContent;
};

const Footer: React.FC<Properties> = ({
  content: { logo, description },
}: Properties) => {
  return (
    <div className={styles['footer']}>
      <div className={styles['footer-container']}>
        <div className={styles['footer-info']}>
          <div className={styles['footer-logo']}>{logo}</div>
          <div className={styles['footer-description']}>{description}</div>
        </div>
      </div>
    </div>
  );
};

export { Footer };
