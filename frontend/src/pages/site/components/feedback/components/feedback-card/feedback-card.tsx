import styles from './styles.module.scss';

type Properties = {
  card: {
    photo: string;
    name: string;
    profession: string;
    feedback: string;
  };
};

const FeedbackCard: React.FC<Properties> = ({
  card: { name, photo, profession, feedback },
}: Properties) => {
  return (
    <div className={styles['feedback-card']} key={name}>
      <div className={styles['feedback-card-heading']}>
        <img
          src={photo}
          alt="portrait"
          className={styles['feedback-card-photo']}
        />
        <div className={styles['feedback-card-person-info']}>
          <div className={styles['feedback-card-person-name']}>{name}</div>
          <div className={styles['feedback-card-person-profession']}>
            {profession}
          </div>
        </div>
      </div>
      <div className={styles['feedback-card-text']}>{feedback}</div>
    </div>
  );
};

export { FeedbackCard };
