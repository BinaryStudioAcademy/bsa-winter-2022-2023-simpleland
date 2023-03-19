import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import Select, { type StylesConfig } from 'react-select';
import searchIcon from 'src/assets/img/icons/search.svg';

import { useFormController } from '~/libs/hooks/hooks.js';

type SelectProperties<T extends FieldValues> = {
  control: Control<T, null>;
  name: FieldPath<T>;
  options: Options[];
  placeholder?: string;
  setValue?: (name: string, value: string) => void;
  value?: string;
  errors: FieldErrors<T>;
};

type Options = {
  value: string | number | undefined;
  label: string;
};

const SelectStyles: StylesConfig<Options> = {
  control: (provided) => ({
    ...provided,
    border: '2px solid #FFB61D',
    '&:hover': {
      border: '2px solid #FFB61D',
    },
    borderRadius: '0',
    boxShadow: 'none',
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
    fontSize: '14px',
    padding: '6px 16px',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'white',
    borderRadius: '0',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    width: '324px',
    margin: '0px',
  }),
  menuList: (provided) => ({
    ...provided,
    padding: '0',
  }),
  dropdownIndicator: (provided, state) => {
    const rotation = state.selectProps.menuIsOpen ? '180deg' : '0deg';
    return {
      ...provided,
      color: '#343434',
      transform: `rotate(${rotation})`,
    };
  },
  indicatorSeparator: (provided) => ({
    ...provided,
    display: 'none',
  }),
  placeholder: (provided, state) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: '10px',
    '&::before': {
      content: '""',
      width: '18px',
      height: '18px',
      display: state.selectProps.menuIsOpen ? 'none' : 'inline-block',
      backgroundImage: `url(${searchIcon})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'contain',
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    caretColor: 'transparent',
  }),
};

const SelectComponent = <T extends FieldValues>({
  control,
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
      {hasError && <span>{error as string}</span>}
    </div>
  );
};

export { SelectComponent };
