import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { Icon } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useFormController } from '~/libs/hooks/hooks.js';
import { type IconType } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  label?: string;
  icon?: IconType;
  name: FieldPath<T>;
  placeholder?: string;
  className?: string | undefined;
  type?: 'text' | 'email' | 'password' | 'search';
  isDisabled?: boolean;
  inputMode?: 'email' | 'text' | 'search';
};

const Input = <T extends FieldValues>({
  control,
  errors,
  label,
  name,
  placeholder = '',
  type = 'text',
  isDisabled = false,
  className,
  icon,
  inputMode = 'text',
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  const validClassNames = getValidClassNames(
    styles['input'],
    hasError && styles['has-error'],
    icon && styles['search-input'],
    className,
  );

  return (
    <label className={styles['label']}>
      <span className={styles['input-label']}>{label}</span>
      {icon && <Icon iconName={icon} className={styles['search-input-icon']} />}
      <input
        {...field}
        className={validClassNames}
        type={type}
        placeholder={placeholder}
        disabled={isDisabled}
        inputMode={inputMode}
      />
      <span className={styles['error-message']}>
        {hasError && (error as string)}
      </span>
    </label>
  );
};

export { Input };
