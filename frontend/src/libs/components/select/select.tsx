import React from 'react';
import Select from 'react-select';
import { type Theme } from 'react-select';

import { type Option } from '../../types/types.js';
import styles from './styles.module.scss';

type SelectProperties = {
  options: Option[];
  value: Option | null;
  onChange: (option: Option | null) => void;
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

const SelectComponent: React.FC<SelectProperties> = ({
  options,
  value,
  onChange,
}: SelectProperties) => {
  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      className={styles.select}
      classNamePrefix="select"
      theme={SelectTheme}
    />
  );
};

export { SelectComponent };