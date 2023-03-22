import img from '../../../../assets/img/test.jpg';
import styles from './styles.module.scss';

type Properties = {
  key: number;
  siteName: string;
};

const SiteCard: React.FC<Properties> = ({ siteName }: Properties) => {
  return (
    <div className={styles.card}>
      <img className={styles.image} src={img} alt="site theme" />

      <div className={styles.content}>
        <h2 className={styles.title}>{siteName}</h2>
        <div>
          <p>Go to site</p>
        </div>
        <div>Make your website public</div>
      </div>
    </div>
  );
};

export { SiteCard };
