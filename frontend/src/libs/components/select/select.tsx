import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import ReactSelect, { components } from 'react-select';

import { useCallback, useFormController } from '~/libs/hooks/hooks.js';
import { type SelectOption } from '~/libs/types/types.js';

import style from './select.module.scss';
import { styles } from './styles.js';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  name: FieldPath<T>;
  options: SelectOption<string | number>[];
  placeholder?: string;
  errors: FieldErrors<T>;
  isMulti?: boolean;
  hideSelectedOptions: boolean;
  components?: Record<string, React.ElementType>;
};

const Select = <T extends FieldValues>({
  control,
  name,
  options,
  placeholder,
  errors,
  isMulti = false,
  components,
  hideSelectedOptions,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const handleSelectValue = (
    value: string | number | (string | number)[],
  ):
    | SelectOption<string | number>
    | SelectOption<string | number>[]
    | undefined => {
    if (isMulti) {
      return options.filter((option) => {
        return (value as (string | number)[]).includes(option.value);
      });
    }

    return options.find((c) => c.value === value);
  };

  const handleChange = useCallback(
    (option: unknown): void => {
      if (isMulti) {
        field.onChange(
          (option as SelectOption<string | number>[])
            .filter((selectedOption) => {
              return options.some(
                (option) => option.value === selectedOption.value,
              );
            })
            .map((option) => option.value),
        );

        return;
      }

      field.onChange((option as SelectOption<string | number>).value);
    },
    [isMulti, field, options],
  );

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  return (
    <div>
      <ReactSelect
        {...field}
        defaultValue={handleSelectValue(field.value)}
        value={handleSelectValue(field.value)}
        onChange={handleChange}
        isMulti={isMulti}
        components={components}
        classNamePrefix="react-select"
        options={options}
        placeholder={placeholder}
        name={name}
        styles={styles}
        hideSelectedOptions={hideSelectedOptions}
      />
      <span className={style['error-message']}>
        {hasError && (error as string)}
      </span>
    </div>
  );
};

export { Select };
