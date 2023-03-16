import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import Select, { type StylesConfig } from 'react-select';

import { useFormController } from '~/libs/hooks/hooks.js';

import { type Options } from '../../types/types.js';

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

const SelectStyles: StylesConfig<Options> = {
  control: (provided) => ({
    ...provided,
    border: '2px solid #FFB61D',
    '&:hover': {
      border: '2px solid #FFB61D',
    },
    width: '324px',
    cursor: 'pointer',

  }),
  option: (provided, state) => ({
    ...provided,
    color: '#343434',
    backgroundColor: state.isSelected ? '#FFB61D' : 'white',
    '&:hover': {
      backgroundColor: '#C4C4C4',
    },
    cursor: 'pointer',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'white',
    borderRadius: '0',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
    marginTop: '0',
    cursor: 'pointer',
    width: '324px',
  }),
  placeholder: (provided) => ({
    ...provided,
    color: '#C9C9C9',
  }),
  dropdownIndicator: (provided, state) => {
    const isFocused = state.isFocused;
    const rotation = isFocused ? '180deg' : '0deg';
    return {
      ...provided,
      color: '#343434',
      transform: `rotate(${rotation})`,
    };
  },
};

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
    <div>
      <label>{label}</label>
      <div>
        <Select
          {...field}
          value={options.find((option) => option.value === field.value)}
          defaultValue={null}
          classNamePrefix="react-select"
          options={options}
          placeholder={placeholder}
          name={name}
          styles={SelectStyles}
        />
      </div>
      {hasError && <span>{error as string}</span>}
    </div>
  );
};

export { SelectComponent };

