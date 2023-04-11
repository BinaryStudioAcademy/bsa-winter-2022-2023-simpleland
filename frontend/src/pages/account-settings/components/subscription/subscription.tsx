import { useCallback } from 'react';
import { type Token } from 'react-stripe-checkout';

import { Checkout } from '~/libs/components/components.js';
import { useAppDispatch } from '~/libs/hooks/hooks.js';
import { SUBSCRIPTION_PRICE } from '~/packages/subscription/subscription.js';
import { actions as usersActions } from '~/slices/users/users.js';

import styles from './styles.module.scss';

const Subscription: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSubscribe = useCallback(
    (token: Token) => {
      void dispatch(usersActions.subscribe({ tokenId: token.id }));
    },
    [dispatch],
  );

  return (
    <div className={styles['subscription']}>
      <div className={styles['subscription-heading']}>My Subscription</div>
      <div className={styles['subscription-info']}>
        <div className={styles['subscription-info-title']}>
          <div className={styles['subscription-info-period']}>1 month</div>
          <div className={styles['subscription-info-price']}>
            {'$' + SUBSCRIPTION_PRICE.toString()}
            <div className={styles['subscription-info-per']}>/month</div>
          </div>
        </div>
        <div className={styles['subscription-info-benefits']} />
      </div>
      <div className={styles['subscription-buttons']}>
        <Checkout
          onCheckout={handleSubscribe}
          price={SUBSCRIPTION_PRICE}
          label="Subscribe"
        />
      </div>
    </div>
  );
};

export { Subscription };
