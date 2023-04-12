import { useCallback } from 'react';
import { type Token } from 'react-stripe-checkout';

import {
  Button,
  Checkout,
  Disabled,
  Icon,
} from '~/libs/components/components.js';
import { getNumberOfDays } from '~/libs/helpers/helpers.js';
import { useAppDispatch, useAppSelector, useMemo } from '~/libs/hooks/hooks.js';
import { SUBSCRIPTION_PRICE } from '~/packages/subscription/subscription.js';
import { type UserAuthResponse } from '~/packages/users/users.js';
import { actions as usersActions } from '~/slices/users/users.js';

import styles from './styles.module.scss';

const Subscription: React.FC = () => {
  const dispatch = useAppDispatch();

  const { subscriptionEndDate, isSubscribed } = useAppSelector(({ auth }) => ({
    subscriptionEndDate: (auth.user as UserAuthResponse).subscriptionEndDate,
    isSubscribed: (auth.user as UserAuthResponse).isSubscribed,
  }));

  const leftSubscriptionDays = useMemo(() => {
    if (subscriptionEndDate) {
      return getNumberOfDays(new Date(), new Date(subscriptionEndDate));
    }

    return '';
  }, [subscriptionEndDate]);

  const handleSubscribe = useCallback(
    (token: Token) => {
      void dispatch(usersActions.subscribe({ tokenId: token.id }));
    },
    [dispatch],
  );

  return (
    <div className={styles['subscription']}>
      <div className={styles['subscription-heading']}>
        <div className={styles['title-wrapper']}>
          <div>My Subscription</div>
          {subscriptionEndDate && (
            <Icon iconName="checkOn" className={styles['check-icon']} />
          )}
        </div>

        {subscriptionEndDate && (
          <div
            className={styles['subscription-date']}
          >{`left ${leftSubscriptionDays} days`}</div>
        )}
      </div>
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
        <Button
          style="secondary"
          label="Cancel"
          size="small"
          className={styles['button']}
        />
        <Disabled isDisabled={Boolean(isSubscribed)}>
          <Checkout
            onCheckout={handleSubscribe}
            price={SUBSCRIPTION_PRICE}
            label="Subscribe"
          />
        </Disabled>
      </div>
    </div>
  );
};

export { Subscription };
