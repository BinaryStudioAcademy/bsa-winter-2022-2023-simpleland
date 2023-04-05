import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import ReactSelect from 'react-select';

import { useCallback, useFormController } from '~/libs/hooks/hooks.js';
import { type SelectOption } from '~/libs/types/types.js';

import { ErrorMessage } from '../error-message/error-message.js';
import style from './select.module.scss';
import { styles } from './styles.js';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  name: FieldPath<T>;
  options: SelectOption<string | number>[];
  placeholder?: string;
  errors: FieldErrors<T>;
  isMulti?: boolean;
};

const Select = <T extends FieldValues>({
  control,
  name,
  options,
  placeholder,
  errors,
  isMulti = false,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const handleSelectValue = (
    value: string | number | (string | number)[],
  ):
    | SelectOption<string | number>
    | SelectOption<string | number>[]
    | undefined => {
    return isMulti
      ? options.filter((option) => {
          return (value as (string | number)[]).includes(option.value);
        })
      : options.find((c) => c.value === value);
  };

  const handleChange = useCallback(
    (updatedOption: unknown): void => {
      const updatedValue = isMulti
        ? (updatedOption as SelectOption<string | number>[])
            .filter((selectedOption) => {
              return options.some(
                (option) => option.value === selectedOption.value,
              );
            })
            .map((option) => option.value)
        : (updatedOption as SelectOption<string | number>).value;

      field.onChange(updatedValue);
    },
    [isMulti, field, options],
  );

  const error = errors[name]?.message;

  return (
    <div>
      <ReactSelect
        defaultValue={handleSelectValue(field.value)}
        value={handleSelectValue(field.value)}
        onChange={handleChange}
        isMulti={isMulti}
        classNamePrefix="react-select"
        options={options}
        placeholder={placeholder}
        name={name}
        styles={styles}
      />
      <ErrorMessage
        error={error as string}
        className={style['error-message']}
      />
    </div>
  );
};

export { Select };
