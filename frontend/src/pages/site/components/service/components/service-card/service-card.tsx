import styles from './styles.module.scss';

type Properties = {
  card: {
    picture: string;
    title: string;
    description: string;
  };
};

const ServiceCard: React.FC<Properties> = ({
  card: { title, picture, description },
}: Properties) => {
  return (
    <div className={styles['service-card']} key={title}>
      <div className={styles['service-card-icon-wrapper']}>
        <img src={picture} alt="icon" className={styles['service-card-icon']} />
      </div>
      <div className={styles['service-card-text-wrapper']}>
        <div className={styles['service-card-title']}>{title}</div>
        <div className={styles['service-card-description']}>{description}</div>
      </div>
    </div>
  );
};

export { ServiceCard };
