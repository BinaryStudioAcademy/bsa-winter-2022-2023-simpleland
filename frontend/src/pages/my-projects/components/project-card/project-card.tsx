import styles from './styles.module.scss';

type Properties = {
  id?: number;
  siteName: string;
  userId?: number;
};

const ProjectCard: React.FC<Properties> = ({ siteName }: Properties) => {
  return (
    <div className={styles['card']}>
      <img className={styles['card-image']} src="imgLink" alt="" />
      <div className={styles['card-description']}>
        <h3>{siteName}</h3>
      </div>
    </div>
  );
};

export { ProjectCard };
