import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import {
  type ActionMeta,
  type MultiValue,
  type SingleValue,
} from 'react-select';
import ReactSelect from 'react-select';

import { useCallback, useFormController } from '~/libs/hooks/hooks.js';
import { type SelectOption } from '~/libs/types/types.js';

import style from './select.module.scss';
import { styles } from './styles.js';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  name: FieldPath<T>;
  onChange?: HandleChangeFunction;
  options: SelectOption<string | number>[];
  placeholder?: string;
  errors: FieldErrors<T>;
  isDisabled?: boolean;
  isMulti?: boolean;
};

type HandleChangeFunction = {
  newValue:
    | SingleValue<SelectOption<string>>
    | MultiValue<SelectOption<string>>;
  actionMeta: ActionMeta<SelectOption<string>>;
};

const Select = <T extends FieldValues>({
  control,
  name,
  options,
  placeholder,
  errors,
  isDisabled = false,
  isMulti = false,
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
        value={handleSelectValue(field.value)}
        defaultValue={handleSelectValue(field.value)}
        classNamePrefix="react-select"
        options={options}
        onChange={handleChange}
        isMulti={isMulti}
        placeholder={placeholder}
        name={name}
        styles={styles}
        isDisabled={isDisabled}
      />

      <span className={style['error-message']}>
        {hasError && (error as string)}
      </span>
    </div>
  );
};

export { Select };
