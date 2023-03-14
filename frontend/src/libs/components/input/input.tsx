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
} & React.ComponentPropsWithoutRef<'input'>;

const Input = <T extends FieldValues>({
  control,
  errors,
  label,
  name,
  ...mirroredProperties
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  return (
    <label>
      <span className={styles.inputLabel}>{label}</span>
      <input
        {...field}
        {...mirroredProperties}
        className={`${styles.input} ${hasError ? styles.hasError : ''}`}
      />
      <div className={styles.errorMessage}>{hasError && (error as string)}</div>
    </label>
  );
};

export { Input };
