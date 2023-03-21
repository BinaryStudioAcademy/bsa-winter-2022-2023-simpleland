import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import ReactSelect from 'react-select';

import { useFormController } from '~/libs/hooks/hooks.js';
import { type Options } from '~/libs/types/types.js';

import styles from './select.module.scss';
import { SelectStyles } from './styles.js';

type SelectProperties<T extends FieldValues> = {
  control: Control<T, null>;
  name: FieldPath<T>;
  options: Options<string | number>[];
  placeholder?: string;
  errors: FieldErrors<T>;
};

function findOptionByValue<T extends string | number>(
  options: Options<T>[],
  value: T,
): Options<T> | undefined {
  return options.find((option) => option.value === value);
}

const Select = <T extends FieldValues>({
  control,
  name,
  options,
  placeholder = '',
  errors,
}: SelectProperties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const selectedOption = findOptionByValue(options, field.value);

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  return (
    <div>
      <ReactSelect
        {...field}
        value={selectedOption}
        defaultValue={selectedOption}
        classNamePrefix="react-select"
        options={options}
        placeholder={placeholder}
        name={name}
        styles={SelectStyles}
      />
      <span className={styles['errorMessage']}>
        {hasError && (error as string)}
      </span>
    </div>
  );
};

export { Select };
