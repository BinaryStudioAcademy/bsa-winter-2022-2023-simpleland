import { type SiteAboutSectionContent } from '~/packages/sections/sections.js';

import styles from './styles.module.scss';

type Properties = {
  content: SiteAboutSectionContent;
};

const AboutSection: React.FC<Properties> = ({
  content: { description, title },
}: Properties) => {
  return (
    <div className={styles['about-section']}>
      <div className={styles['about-section-container']}>
        <div className={styles['about-section-content']}>
          <div className={styles['about-section-content-left']} />
          <div className={styles['about-section-title']}>{title}</div>
        </div>
        <div className={styles['about-section-content-right']}>
          <div className={styles['about-section-description']}>
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AboutSection };
