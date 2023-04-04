import { Button } from '~/libs/components/components.js';

import styles from './styles.module.scss';

const Subscription: React.FC = () => {
  return (
    <div className={styles['subscription']}>
      <div className={styles['subscription-heading']}>My Subscription</div>
      <div className={styles['subscription-info']}>
        <div className={styles['subscription-info-title']}>
          <div className={styles['subscription-info-period']}>1 month</div>
          <div className={styles['subscription-info-price']}>
            $7.50
            <div className={styles['subscription-info-per']}>/month</div>
          </div>
        </div>
        <div className={styles['subscription-info-benefits']} />
      </div>
      <div className={styles['subscription-buttons']}>
        <Button
          style="secondary"
          label="Cancel"
          size="small"
          className={styles['button']}
        />
        <Button
          style="primary"
          label="Subscribe"
          size="small"
          className={styles['button']}
        />
      </div>
    </div>
  );
};

export { Subscription };
