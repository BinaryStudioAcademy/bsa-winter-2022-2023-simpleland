import { Icon } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type IconType } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  icon: IconType;
  label: string;
  onClick?: () => void;
  isDisabled?: boolean;
  className?: string;
  isLabelVisuallyHidden?: boolean;
};

const IconButton: React.FC<Properties> = ({
  icon,
  label,
  onClick,
  isDisabled = false,
  className = '',
  isLabelVisuallyHidden = true,
}: Properties) => (
  <button
    onClick={onClick}
    disabled={isDisabled}
    className={getValidClassNames(styles.button, className)}
  >
    <Icon iconName={icon} />
    <span
      className={getValidClassNames(isLabelVisuallyHidden && 'visually-hidden')}
    >
      {label}
    </span>
  </button>
);

export { IconButton };
