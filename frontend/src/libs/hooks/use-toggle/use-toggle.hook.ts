import { useCallback,useState } from '~/libs/hooks/hooks.js';

type ReturnValue = [
  value: boolean,
  toggleValue: () => void
];

const useToggle = (initialValue: boolean): ReturnValue => {
  const [value, setValue] = useState(initialValue);
  
  const toggleValue = useCallback(() => setValue(!value), [value, setValue]);
  
  return [ value, toggleValue ];
};

export { useToggle };