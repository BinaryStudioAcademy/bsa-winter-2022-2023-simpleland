import styles from './styles.module.scss';

type Properties = {
  card: {
    picture: string;
    name: string;
    description: string;
  };
};

const ServiceCard: React.FC<Properties> = ({
  card: { name, picture, description },
}: Properties) => {
  return (
    <div className={styles['service-card']} key={name}>
      <div className={styles['service-card-icon-wrapper']}>
        <img src={picture} alt="icon" className={styles['service-card-icon']} />
      </div>
      <div className={styles['service-card-text-wrapper']}>
        <div className={styles['service-card-name']}>{name}</div>
        <div className={styles['service-card-description']}>{description}</div>
      </div>
    </div>
  );
};

export { ServiceCard };
