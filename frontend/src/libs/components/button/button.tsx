import { Icon, Link } from '~/libs/components/components.js';
import { type AppRoute } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type IconType, type ValueOf } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties = {
  label: string;
  form?: string;
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
  form,
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
  const content = (
    <>
      {icon && <Icon iconName={icon} />}
      <span
        className={getValidClassNames(
          isLabelVisuallyHidden && 'visually-hidden',
        )}
      >
        {label}
      </span>
    </>
  );

  const validClassNames = getValidClassNames(
    styles['button'],
    styles[style],
    styles[size],
    className,
  );

  return to ? (
    <Link to={to} className={validClassNames}>
      {content}
    </Link>
  ) : (
    <button
      onClick={onClick}
      form={form}
      type={type}
      disabled={isDisabled}
      className={validClassNames}
    >
      {content}
    </button>
  );
};

export { type Properties, Button };
