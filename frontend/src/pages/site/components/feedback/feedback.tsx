import { Carousel } from '~/libs/components/components.js';
import { type SiteFeedbackContent } from '~/packages/sections/sections.js';

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

  const slidesContent: {
    photo: string;
    name: string;
    profession: string;
    feedback: string;
  }[][] = [];

  for (let index = 0; index < cards.length; index += 2) {
    slidesContent.push(cards.slice(index, index + 2));
  }

  return (
    <div className={styles['feedback']}>
      <div className={styles['feedback-container']}>
        {handleRenderTitle()}
        <div className={styles['feedback-carousel']}>
          <Carousel>
            {slidesContent.map((cards, index) => {
              return (
                <div className={styles['feedback-carousel-slide']} key={index}>
                  {cards.map(({ name, photo, profession, feedback }) => (
                    <div className={styles['feedback-card']} key={name}>
                      <div className={styles['feedback-card-heading']}>
                        <img
                          src={photo}
                          alt="portrait"
                          className={styles['feedback-card-photo']}
                        />
                        <div className={styles['feedback-card-person-info']}>
                          <div className={styles['feedback-card-person-name']}>
                            {name}
                          </div>
                          <div
                            className={
                              styles['feedback-card-person-profession']
                            }
                          >
                            {profession}
                          </div>
                        </div>
                      </div>
                      <div className={styles['feedback-card-text']}>
                        {feedback}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export { Feedback };
