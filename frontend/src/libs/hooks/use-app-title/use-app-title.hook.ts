import { useEffect } from '~/libs/hooks/hooks.js';

const useTitle = (value: string): void => {
  useEffect(() => {
    document.title = `${value} | SimpleLand`;
  }, [value]);
};

export { useTitle };
