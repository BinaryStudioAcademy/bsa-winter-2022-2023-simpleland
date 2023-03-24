import { Icon, Link } from '~/libs/components/components.js';
import { type AppRoute } from '~/libs/enums/app-route.enum';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type IconType, type ValueOf } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  label: string;
  icon?: IconType;
  size?: 'big' | 'small';
  style?: 'primary' | 'secondary' | 'plain';
  type?: 'button' | 'submit';
  isDisabled?: boolean;
  className?: string | undefined;
  onClick?: (() => void) | undefined;
  isLabelVisuallyHidden?: boolean;
  to?: ValueOf<typeof AppRoute>;
};

const Button: React.FC<Properties> = ({
  onClick,
  label,
  size = 'big',
  style = 'primary',
  type = 'button',
  isDisabled = false,
  className,
  icon,
  isLabelVisuallyHidden = false,
  to,
}: Properties) => {
  const renderButton = (): JSX.Element => (
    <button
      onClick={onClick}
      type={type}
      disabled={isDisabled}
      className={getValidClassNames(
        styles['button'],
        styles[style],
        styles[size],
        className,
      )}
    >
      {icon && <Icon iconName={icon} />}
      <span
        className={getValidClassNames(
          isLabelVisuallyHidden && 'visually-hidden',
        )}
      >
        {label}
      </span>
    </button>
  );

  return to ? <Link to={to}>{renderButton()}</Link> : renderButton();
};

export { type Properties, Button };
