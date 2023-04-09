import {
  type SectionGetAllItemResponseDto,
  type SiteFooterContent,
} from '~/packages/sections/sections.js';

import styles from './styles.module.scss';

type Properties = {
  content: SiteFooterContent;
  navigationSections: SectionGetAllItemResponseDto[];
};

const Footer: React.FC<Properties> = ({
  content: { logo, description },
  navigationSections,
}: Properties) => {
  return (
    <div className={styles['footer']}>
      <div className={styles['footer-container']}>
        <div className={styles['footer-info']}>
          <div className={styles['footer-logo']}>{logo}</div>
          <div className={styles['footer-description']}>{description}</div>
        </div>

        <div className={styles['footer-navigation']}>
          <div className={styles['navigation-title']}>Navigation</div>
          <div className={styles['navigation-links']}>
            {navigationSections.map((section) => (
              <a
                className={styles['navigation-link']}
                href={`#${section.type}`}
                key={section.id}
              >
                {section.type}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { Footer };
