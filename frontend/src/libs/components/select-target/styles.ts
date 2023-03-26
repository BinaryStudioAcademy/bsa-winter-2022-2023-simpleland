import { type StylesConfig } from 'react-select';
import ceckIcon from 'src/assets/img/icons/choice.svg';

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
    width: '324px',
    cursor: 'pointer',
  }),
  option: (provided, state) => ({
    ...provided,
    color: '#343434',
    backgroundColor: state.isSelected ? '#FFB61D' : 'white',
    '&::before': {
      content: '""',
      border: '1px solid black',
      borderRadius: '3px',
      width: '14px',
      height: '14px',
      margin: '0px 9px 0 0',
      display: 'inline-block',
    },
    '&:before':{
      content: '""',
      display: 'inline-block',
      backgroundImage: state.isSelected ? `url(${ceckIcon})` : 'none',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'contain',

    },
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
  placeholder: (provided) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: '10px',
  }),
  valueContainer: (provided) => ({
    ...provided,
    caretColor: 'transparent',
  }),
};

export { styles };
