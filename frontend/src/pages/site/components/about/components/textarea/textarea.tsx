import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { ErrorMessage } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useFormController } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  name: FieldPath<T>;
  className?: string | undefined;
  placeholder?: string;
  isDisabled?: boolean;
  onBlur?: () => void;
};

const Textarea = <T extends FieldValues>({
  control,
  errors,
  name,
  placeholder = '',
  isDisabled = false,
  className,
  onBlur,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  const validClassNames = getValidClassNames(
    styles['textarea'],
    hasError && styles['has-error'],
    className,
  );

  return (
    <>
      <textarea
        {...field}
        className={validClassNames}
        placeholder={placeholder}
        disabled={isDisabled}
        onBlur={onBlur}
        rows={10}
        cols={50}
      />
      <ErrorMessage error={error as string} />
    </>
  );
};

export { Textarea };
