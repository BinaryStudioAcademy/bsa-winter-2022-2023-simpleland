import {
  type Control,
  type FieldErrors,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';
import ReactSelect from 'react-select';

import { Icon } from '~/libs/components/components.js';
import {
  useCallback,
  useFormController,
  useState,
} from '~/libs/hooks/hooks.js';
import { type IconType, type SelectOption } from '~/libs/types/types.js';

import { ErrorMessage } from '../error-message/error-message.js';
import { getStyles } from './styles.js';
import styles from './styles.module.scss';

type Properties<T extends FieldValues> = {
  control: Control<T, null>;
  name: FieldPath<T>;
  options: SelectOption<string | number>[];
  placeholder?: string;
  errors: FieldErrors<T>;
  isMulti?: boolean;
  icon?: IconType;
};

const Select = <T extends FieldValues>({
  control,
  name,
  options,
  placeholder,
  errors,
  isMulti = false,
  icon,
}: Properties<T>): JSX.Element => {
  const { field } = useFormController({ name, control });

  const [{ isMenuOpen, isOptionSelected }, setMenuState] = useState<{
    isMenuOpen: boolean;
    isOptionSelected: boolean;
  }>({
    isMenuOpen: false,
    isOptionSelected: !!field.value,
  });

  const handleMenuOpenToggle = useCallback(
    () =>
      setMenuState((state) => ({ ...state, isMenuOpen: !state.isMenuOpen })),
    [setMenuState],
  );
  const handleChooseMenuOption = useCallback(
    () => setMenuState((state) => ({ ...state, isOptionSelected: true })),
    [setMenuState],
  );

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
      handleChooseMenuOption();
    },
    [isMulti, field, options, handleChooseMenuOption],
  );

  const error = errors[name]?.message;

  return (
    <div>
      {icon && !isMenuOpen && !isOptionSelected && (
        <Icon iconName={icon} className={styles['select-icon']} />
      )}
      <ReactSelect
        defaultValue={handleSelectValue(field.value)}
        value={handleSelectValue(field.value)}
        onChange={handleChange}
        isMulti={isMulti}
        classNamePrefix="react-select"
        options={options}
        placeholder={placeholder}
        name={name}
        onMenuOpen={handleMenuOpenToggle}
        onMenuClose={handleMenuOpenToggle}
        styles={getStyles({ hasIcon: !isMenuOpen && !isOptionSelected })}
      />
      <ErrorMessage error={error as string} />
    </div>
  );
};

export { Select };
