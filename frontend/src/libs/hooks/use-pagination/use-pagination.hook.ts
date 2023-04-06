import { useCallback, useState } from '~/libs/hooks/hooks.js';

type UsePagination = (parameters: { pageDefault: number }) => {
  page: number;
  handleChangePage: (value: number) => void;
};

const usePagination: UsePagination = ({ pageDefault }) => {
  const [page, setPage] = useState(pageDefault);

  const handleChangePage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  return { page, handleChangePage };
};

export { usePagination };
