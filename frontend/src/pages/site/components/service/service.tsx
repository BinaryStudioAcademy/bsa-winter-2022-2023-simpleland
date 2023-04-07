import { type SiteServiceContent } from '~/packages/sections/sections.js';

import { ServiceCard } from './components/components.js';
import styles from './styles.module.scss';

type Properties = {
  content: SiteServiceContent;
};

const Service: React.FC<Properties> = ({
  content: { title, cards },
}: Properties) => {
  return (
    <div className={styles['service']}>
      <div className={styles['service-container']}>
        <div className={styles['title']}>{title}</div>
        <div className={styles['service-cards']}>
          {cards.map((card) => (
            <ServiceCard card={card} key={card.picture} />
          ))}
        </div>
        <div className={styles['service-button-wrapper']}>
          <button className={styles['service-button']}>
            FREE CONSULTATION
          </button>
        </div>
      </div>
    </div>
  );
};

export { Service };
