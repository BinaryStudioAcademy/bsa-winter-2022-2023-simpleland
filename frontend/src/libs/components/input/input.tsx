import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useFormController } from '~/libs/hooks/hooks.js';
import { type IconType } from '~/libs/types/icon.type.js';

import { Icon } from '../components.js';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  label?: string;
  name: FieldPath<T>;
  icon?: IconType;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  isDisabled?: boolean;
  inputMode?: 'email' | 'text';
  isLabelVisuallyHidden?: boolean;
};

const Input = <T extends FieldValues>({
  control,
  errors,
  label,
  name,
  icon,
  placeholder = '',
  type = 'text',
  isDisabled = false,
  inputMode = 'text',
  isLabelVisuallyHidden = false,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  return (
    <label className={styles['label']}>
      <span
        className={getValidClassNames(
          styles['input-label'],
          isLabelVisuallyHidden && 'visually-hidden',
        )}
      >
        {label}
      </span>
      {icon && <Icon iconName={icon} className={styles['search-input-icon']} />}
      <input
        {...field}
        className={getValidClassNames(
          styles['input'],
          icon && styles['search-input'],
          hasError && styles['has-error'],
        )}
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
