import {
  type SectionGetAllItemResponseDto,
  type SiteHeaderContent,
} from '~/packages/sections/sections.js';

import styles from './styles.module.scss';

type Properties = {
  content: SiteHeaderContent;
  navigationSections: SectionGetAllItemResponseDto[];
};

const Header: React.FC<Properties> = ({
  content: { logo, phone },
  navigationSections,
}: Properties) => {
  return (
    <div className={styles['header']}>
      <div className={styles['header-container']}>
        <div className={styles['header-navigation']}>
          <div className={styles['header-logo']}>{logo}</div>

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
        <div className={styles['header-phone']}>{phone}</div>
      </div>
    </div>
  );
};

export { Header };
