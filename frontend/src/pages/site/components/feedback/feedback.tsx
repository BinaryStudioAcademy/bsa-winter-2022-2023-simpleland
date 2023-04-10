import { Carousel } from '~/libs/components/components.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type SectionType,
  type SiteFeedbackContent,
} from '~/packages/sections/sections.js';

import { FeedbackCard } from './components/components.js';
import styles from './styles.module.scss';

type Properties = {
  content: SiteFeedbackContent;
  type: ValueOf<typeof SectionType>;
};

const Feedback: React.FC<Properties> = ({
  content: { title, cards },
  type,
}: Properties) => {
  const [titleFirstWord, ...titleRest] = title.split(' ');

  return (
    <div id={type} className={styles['feedback']}>
      <div className={styles['feedback-container']}>
        <div className={styles['title']}>
          {titleFirstWord}
          &nbsp;
          <span className={styles['title-brown']}>{titleRest.join(' ')}</span>
        </div>
        <div className={styles['feedback-carousel']}>
          <Carousel slidesToShow={2} slidesToScroll={2} cellSpacing={28}>
            {cards.map((card) => (
              <FeedbackCard card={card} key={card.photo} />
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export { Feedback };
