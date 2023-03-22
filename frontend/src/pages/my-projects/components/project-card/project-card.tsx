import styles from './styles.module.scss';

type Properties = {
  key: number;
  siteName: string;
};

const ProjectCard: React.FC<Properties> = ({ siteName }: Properties) => {
  return (
    <div className={styles.card}>
      <img className={styles.cardImage} src="imgLink" alt="" />
      <div className={styles.cardDescription}>
        <h3>{siteName}</h3>
      </div>
    </div>
  );
};

export { ProjectCard };
