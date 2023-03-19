import { getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  label: string;
  size?: 'big' | 'small';
  style?: 'primary' | 'secondary' | 'plain';
  type?: 'button' | 'submit';
  isDisabled?: boolean;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
};

const Button: React.FC<Properties> = ({
  onClick,
  label,
  size = 'big',
  style = 'primary',
  type = 'button',
  isDisabled = false,
  className = '',
}: Properties) => (
  <button
    onClick={onClick}
    type={type}
    disabled={isDisabled}
    className={getValidClassNames(
      styles.button,
      styles[style],
      styles[size],
      className,
    )}
  >
    {label}
  </button>
);

export { Button };
