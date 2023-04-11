import './styles.scss';

import StripeCheckout, { type Token } from 'react-stripe-checkout';

import {
  CURRENCY,
  MULTIPLIER_TO_SMALLEST_CURRENCY_UNIT,
} from '~/libs/packages/billing/billing.js';
import { config } from '~/libs/packages/config/config.js';

type Properties = {
  onCheckout: (token: Token) => void;
  price: number;
  label: string;
  disabled: boolean;
};

const Checkout: React.FC<Properties> = ({
  onCheckout,
  price,
  label,
  disabled,
}: Properties) => {
  return (
    <StripeCheckout
      stripeKey={config.ENV.STRIPE.STRIPE_PUBLIC_KEY}
      token={onCheckout}
      amount={price * MULTIPLIER_TO_SMALLEST_CURRENCY_UNIT}
      label={label}
      currency={CURRENCY}
      disabled={disabled}
    />
  );
};

export { Checkout };
