import { type StylesConfig } from 'react-select';
import searchIcon from 'src/assets/img/loupe.svg';

import { type SelectOption } from '~/libs/types/types.js';

const styles: StylesConfig<SelectOption<string | number> | undefined> = {
  control: (provided) => ({
    ...provided,
    border: '2px solid #FFB61D',
    '&:hover': {
      border: '2px solid #FFB61D',
    },
    borderRadius: '0',
    boxShadow: 'none',
    width: '100%',
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

export { styles };
