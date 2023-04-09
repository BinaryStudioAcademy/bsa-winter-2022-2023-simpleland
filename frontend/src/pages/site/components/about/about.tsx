import { type SiteAboutContent } from '~/packages/sections/sections.js';

import styles from './styles.module.scss';

type Properties = {
  content: SiteAboutContent;
  type: string;
};

const About: React.FC<Properties> = ({
  content: { description, title },
  type,
}: Properties) => {
  return (
    <div id={type} className={styles['about']}>
      <div className={styles['about-container']}>
        <div className={styles['about-content']}>
          <div className={styles['about-content-left']} />
          <div className={styles['about-title']}>{title}</div>
        </div>
        <div className={styles['about-content-right']}>
          <div className={styles['about-description']}>{description}</div>
        </div>
      </div>
    </div>
  );
};

export { About };
