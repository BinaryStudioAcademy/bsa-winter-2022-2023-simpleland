import './styles.scss';

import StripeCheckout, { type Token } from 'react-stripe-checkout';

import { config } from '~/libs/packages/config/config.js';

type Properties = {
  onCheckout: (token: Token) => void;
  price: number;
  label: string;
};

const Checkout: React.FC<Properties> = ({
  onCheckout,
  price,
  label,
}: Properties) => {
  return (
    <StripeCheckout
      stripeKey={config.ENV.STRIPE.STRIPE_PUBLIC_KEY}
      token={onCheckout}
      amount={price * 100}
      label={label}
      currency="usd"
    />
  );
};

export { Checkout };
