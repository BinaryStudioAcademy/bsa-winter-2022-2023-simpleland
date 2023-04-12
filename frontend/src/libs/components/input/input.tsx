import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { ErrorMessage, Icon } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useFormController } from '~/libs/hooks/hooks.js';
import { type IconType } from '~/libs/types/types.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  label: string;
  name: FieldPath<T>;
  className?: string | undefined;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'search';
  icon?: IconType;
  isDisabled?: boolean;
  inputMode?: 'email' | 'text' | 'search';
  isLabelVisuallyHidden?: boolean;
  onBlur?: () => void;
  rows?: number;
  isInline?: boolean;
};

const Input = <T extends FieldValues>({
  control,
  errors,
  label,
  name,
  placeholder = '',
  type = 'text',
  icon,
  isDisabled = false,
  className,
  inputMode = 'text',
  isLabelVisuallyHidden = false,
  onBlur,
  rows,
  isInline,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  const validClassNames = getValidClassNames(
    styles['input'],
    hasError && styles['has-error'],
    icon && styles['search-input'],
    rows && styles['textarea'],
    isInline && styles['inline-input'],
    className,
  );

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
      {rows ? (
        <textarea
          {...field}
          className={validClassNames}
          placeholder={placeholder}
          disabled={isDisabled}
          onBlur={onBlur}
          rows={rows}
        />
      ) : (
        <input
          {...field}
          className={validClassNames}
          type={type}
          placeholder={placeholder}
          disabled={isDisabled}
          inputMode={inputMode}
          onBlur={onBlur}
        />
      )}
      <ErrorMessage error={error as string} />
    </label>
  );
};

export { Input };
