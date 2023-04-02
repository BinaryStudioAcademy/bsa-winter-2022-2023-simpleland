import { useCallback, useState } from '~/libs/hooks/hooks.js';

type ReturnValue = [value: boolean, handleValueToggle: () => void];

const useToggle = (initialValue: boolean): ReturnValue => {
  const [value, setValue] = useState<boolean>(initialValue);

  const handleValueToggle = useCallback(
    () => setValue(!value),
    [value, setValue],
  );

  return [value, handleValueToggle];
};

export { useToggle };
