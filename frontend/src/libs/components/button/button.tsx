import { Icon } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type IconType } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  label: string;
  icon?: IconType;
  size?: 'big' | 'small';
  style?: 'primary' | 'secondary' | 'plain';
  type?: 'button' | 'submit';
  isDisabled?: boolean;
  className?: string;
  onClick?: () => void;
  isLabelVisuallyHidden?: boolean;
};

const Button: React.FC<Properties> = ({
  onClick,
  label,
  size = 'big',
  style = 'primary',
  type = 'button',
  isDisabled = false,
  className = '',
  icon,
  isLabelVisuallyHidden = false,
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
    {icon && <Icon iconName={icon} />}
    <span
      className={getValidClassNames(isLabelVisuallyHidden && 'visually-hidden')}
    >
      {label}
    </span>
  </button>
);

export { type Properties, Button };
