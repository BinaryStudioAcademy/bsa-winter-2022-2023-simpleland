import { Icon } from '~/libs/components/components.js';
import { type IconType } from '~/libs/components/icon/common.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  label?: string;
  icon?: IconType;
  size?: 'big' | 'small' | 'fitContent';
  style?: 'primary' | 'secondary' | 'plain';
  type?: 'button' | 'submit';
  isDisabled?: boolean;
  className?: string;
  onClick?: () => void;
  visuallyHiddenLabel?: string;
};

const Button: React.FC<Properties> = ({
  onClick,
  label,
  size = 'big',
  style = 'primary',
  type = 'button',
  isDisabled = false,
  className = '',
  visuallyHiddenLabel,
  icon,
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
    {Boolean(label) && label}
    {icon && <Icon iconName={icon} />}
    {visuallyHiddenLabel && (
      <span className="visually-hidden">{visuallyHiddenLabel}</span>
    )}
  </button>
);

export { Button };
