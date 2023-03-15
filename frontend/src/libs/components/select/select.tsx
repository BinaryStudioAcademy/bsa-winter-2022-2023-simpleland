import React from 'react';
import Select from 'react-select';

import { type Option } from '../../types/types.js';
import  styles  from './styles.module.scss';

type SelectProperties = {
  options: Option[];
  value: Option | null;
  onChange: (option: Option | null) => void;
};
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
    />
  );
};

export { SelectComponent };