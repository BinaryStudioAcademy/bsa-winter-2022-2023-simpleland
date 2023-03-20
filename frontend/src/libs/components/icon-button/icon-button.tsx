import { type Properties as ButtonProperties } from '~/libs/components/button/button.js';
import { Button } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type IconType } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = Omit<
  ButtonProperties,
  'icon' | 'style' | 'size' | 'isLabelVisuallyHidden'
> & {
  icon: IconType;
};

const IconButton: React.FC<Properties> = ({
  icon,
  label,
  onClick,
  isDisabled = false,
  className = '',
}: Properties) => (
  <Button
    icon={icon}
    label={label}
    onClick={onClick}
    style="plain"
    isDisabled={isDisabled}
    className={getValidClassNames(styles.iconButton, className)}
    isLabelVisuallyHidden
  />
);

export { IconButton };
