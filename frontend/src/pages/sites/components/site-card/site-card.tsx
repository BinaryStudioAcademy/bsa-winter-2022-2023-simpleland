import { Divider } from '~/libs/components/components.js';

import img from '../../../../assets/img/test.jpg';
import styles from './styles.module.scss';

type Properties = {
  key: number;
  siteName: string;
};

const SiteCard: React.FC<Properties> = ({ siteName }: Properties) => {
  return (
    <div className={styles['card']}>
      <img className={styles['image']} src={img} alt="site theme" />

      <div className={styles['content-wrapper']}>
        <h2 className={styles['title']}>{siteName}</h2>

        <div className={styles['content']}>
          <div className={styles['text-wrapper']}>
            <p className={styles['text']}>Go to site</p>
          </div>

          <Divider />

          <div className={styles['text-wrapper']}>
            <p className={styles['text']}>Make your website public</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { SiteCard };
