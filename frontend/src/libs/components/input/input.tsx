import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useFormController } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  label: string;
  name: FieldPath<T>;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  isDisabled?: boolean;
};

const Input = <T extends FieldValues>({
  control,
  errors,
  label,
  name,
  placeholder = '',
  type = 'text',
  isDisabled = false,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  return (
    <label className={styles.label}>
      <span className={styles.inputLabel}>{label}</span>
      <input
        {...field}
        className={getValidClassNames(
          styles.input,
          hasError && styles.hasError,
        )}
        type={type}
        placeholder={placeholder}
        disabled={isDisabled}
      />
      <span className={styles.errorMessage}>
        {hasError && (error as string)}
      </span>
    </label>
  );
};

export { Input };
