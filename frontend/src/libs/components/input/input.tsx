import { clsx } from 'clsx';
import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { useFormController } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  label: string;
  name: FieldPath<T>;
  placeholder?: string;
  isDisabled?: boolean;
  type?: 'text' | 'email' | 'password';
};

const Input = <T extends FieldValues>({
  control,
  errors,
  label,
  name,
  placeholder = '',
  isDisabled = false,
  type = 'text',
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  return (
    <label>
      <span className={styles.inputLabel}>{label}</span>
      <input
        {...field}
        className={clsx(styles.input, hasError && styles.hasError)}
        type={type}
        placeholder={placeholder}
        disabled={isDisabled}
      />
      <div className={styles.errorMessage}>{hasError && (error as string)}</div>
    </label>
  );
};

export { Input };
