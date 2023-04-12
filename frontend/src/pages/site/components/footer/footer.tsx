import { Icon } from '~/libs/components/components.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type SectionType,
  type SiteFooterContent,
} from '~/packages/sections/sections.js';

import styles from './styles.module.scss';

type Properties = {
  content: SiteFooterContent;
  navigationSections: readonly ValueOf<typeof SectionType>[];
  isOwner: boolean;
  isSubscribed: boolean;
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
          <div>
            <div className={styles['navigation-title']}>Navigation</div>
            <div className={styles['navigation-links']}>
              {navigationSections.map((section) => (
                <a
                  className={styles['navigation-link']}
                  href={`#${section}`}
                  key={section}
                >
                  {section}
                </a>
              ))}
            </div>
          </div>

          <div className={styles['social-media']}>
            <a href="#twitter">
              <Icon iconName="twitter" />
            </a>
            <a href="#linkedin">
              <Icon iconName="linkedin" />
            </a>
            <a href="#facebook">
              <Icon iconName="facebook" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Footer };
