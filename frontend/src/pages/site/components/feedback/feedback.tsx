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
  const handleRenderTitle = (): JSX.Element => {
    const [firstWord = '', ...rest] = title.split(' ');

    return (
      <div className={styles['title']}>
        {firstWord}
        &nbsp;
        <span className={styles['title-brown']}>{rest.join(' ')}</span>
      </div>
    );
  };

  return (
    <div className={styles['feedback']}>
      <div className={styles['feedback-container']}>
        {handleRenderTitle()}
        <div className={styles['feedback-carousel']}>
          <Carousel cellSpacing={28}>
            {cards.map((card, index, array) => {
              if (index % 2 === 0) {
                const nextCard = array[index + 1] as {
                  photo: string;
                  name: string;
                  profession: string;
                  feedback: string;
                };

                return (
                  <div
                    className={styles['feedback-carousel-slide']}
                    key={index}
                  >
                    <FeedbackCard card={card} />
                    <FeedbackCard card={nextCard} />
                  </div>
                );
              }
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export { Feedback };
