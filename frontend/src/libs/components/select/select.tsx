import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import { type Theme } from 'react-select';
import Select from 'react-select';

import { useFormController } from '~/libs/hooks/hooks.js';

import { type Options } from '../../types/types.js';
import styles from './styles.module.scss';

type SelectProperties<T extends FieldValues> = {
  control: Control<T, null>;
  label: string;
  name: FieldPath<T>;
  options: Options[];
  placeholder?: string;
  setValue?: (name: string, value: string) => void;
  value?: string;
  className?: string;
  errors: FieldErrors<T>;
};

const SelectTheme = (theme: Theme): Theme => ({
  ...theme,
  borderRadius: 0,
  colors: {
    ...theme.colors,
    primary25: 'white',
    primary: 'white',
  },
});

const SelectComponent = <T extends FieldValues>({
  control,
  label,
  name,
  options,
  placeholder = '',
  errors,
}: SelectProperties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      <div className={styles.selectWrapper}>
        <Select
          {...field}
          value={options.find((option) => option.value === field.value)}
          className={styles.select}
          defaultValue={null}
          classNamePrefix="react-select"
          options={options}
          placeholder={placeholder}
          theme={SelectTheme}
          name={name}
        />
      </div>
      {hasError && <span>{error as string}</span>}
    </div>
  );
};

export { SelectComponent };

