import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import ReactSelect, { components } from 'react-select';

import { useFormController } from '~/libs/hooks/hooks.js';
import { type SelectOption } from '~/libs/types/types.js';

import style from './select.module.scss';
import { styles } from './styles.js';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  name: FieldPath<T>;
  options: SelectOption<string | number>[];
  placeholder?: string;
  isMulti?: boolean;
  hideSelectedOptions?: boolean;
  customComponents?: object;
  errors: FieldErrors<T>;
};

const Select = <T extends FieldValues>({
  control,
  name,
  options,
  placeholder = '',
  errors,
  customComponents,
  isMulti,
  hideSelectedOptions,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const selectedOption = options.find((option) => option.value === field.value);

  const componentsToUse = customComponents
    ? { ...components, ...customComponents }
    : components;

  const error = errors[name]?.message;
  const hasError = Boolean(error);

  return (
    <div>
      <ReactSelect
        {...field}
        value={selectedOption}
        defaultValue={selectedOption}
        components={componentsToUse}
        classNamePrefix="react-select"
        options={options}
        placeholder={placeholder}
        name={name}
        styles={styles}
        isMulti={isMulti}
        hideSelectedOptions={hideSelectedOptions}
      />
      <span className={style['error-message']}>
        {hasError && (error as string)}
      </span>
    </div>
  );
};

export { Select };
