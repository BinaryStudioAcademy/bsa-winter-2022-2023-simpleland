import clsx from 'clsx';

import styles from './styles.module.scss';

type Properties = {
  label: string;
  size?: 's' | 'm';
  type?: 'button' | 'submit';
  isFull?: boolean;
  isDisabled?: boolean;
  className?: string;
};

const Button: React.FC<Properties> = ({
  type = 'button',
  label,
  size = 'm',
  isFull = true,
  isDisabled = false,
  className,
}: Properties) => (
  <button
    type={type}
    className={clsx(
      'buttonText-2',
      styles.btn,
      isFull ? styles.btnEmpty : styles.btnFull,
      styles[`btn__${size}`],
      className,
    )}
    disabled={isDisabled}
  >
    {label}
  </button>
);

export { Button };
