import styles from './styles.module.scss';

type Properties = {
  key: number;
  imgLink: string;
  siteName: string;
};

const ProjectCard: React.FC<Properties> = ({
  imgLink,
  siteName,
}: Properties) => {
  return (
    <div className={styles.card}>
      <img className={styles.cardImage} src={imgLink} alt="" />
      <div className={styles.cardDescription}>
        <h1>{siteName}</h1>
      </div>
    </div>
  );
};

export { ProjectCard };
