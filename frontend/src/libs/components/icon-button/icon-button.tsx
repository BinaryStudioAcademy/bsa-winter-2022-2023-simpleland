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
  className,
  to,
  formId,
  type,
  tooltip,
}: Properties) => (
  <Button
    formId={formId}
    type={type}
    icon={icon}
    label={label}
    onClick={onClick}
    style="plain"
    isDisabled={isDisabled}
    to={to}
    className={getValidClassNames(styles['icon-button'], className)}
    isLabelVisuallyHidden
    tooltip={tooltip}
  />
);

export { IconButton };
