import { getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  style: 'yellow' | 'black';
};

const Loader: React.FC<Properties> = ({ style }: Properties) => (
  <div className={styles.outWrapper}>
    <div className={styles.wrapper}>
      <div className={getValidClassNames(styles.loader, styles[style])}>
        <span />
      </div>
    </div>
  </div>
);

export { Loader };
