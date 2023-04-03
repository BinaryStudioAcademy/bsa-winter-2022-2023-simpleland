import { Carousel } from '~/libs/components/components.js';
import { type SiteFeedbackContent } from '~/packages/sections/sections.js';

import { FeedbackCard } from './components/components.js';

type Properties = {
  content: SiteFeedbackContent;
};

import styles from './styles.module.scss';

const Feedback: React.FC<Properties> = ({
  content: { title, cards },
}: Properties) => {
  const [titleFirstWord, ...titleRest] = title.split(' ');

  return (
    <div className={styles['feedback']}>
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
