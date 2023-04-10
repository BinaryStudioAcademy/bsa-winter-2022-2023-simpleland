import { IconButton } from '~/libs/components/components.js';

import styles from './styles.module.scss';

const Domain: React.FC = () => {
  return (
    <div className={styles['wrapper']}>
      <div className={styles['item']}>
        <div
          data-tooltip-id="app-main-tooltip"
          data-tooltip-content="Coming soon"
          className={styles['item-text']}
        >
          By a new domain name
        </div>
        <IconButton
          label="By a new domain name"
          icon="lock"
          className={styles['item-icon']}
        />
      </div>

      <div className={styles['item']}>
        <div
          data-tooltip-id="app-main-tooltip"
          data-tooltip-content="Coming soon"
          className={styles['item-text']}
        >
          Connect an existing domain
        </div>
        <IconButton
          label="Connect an existing domain"
          icon="lock"
          className={styles['item-icon']}
        />
      </div>
    </div>
  );
};

export { Domain };
