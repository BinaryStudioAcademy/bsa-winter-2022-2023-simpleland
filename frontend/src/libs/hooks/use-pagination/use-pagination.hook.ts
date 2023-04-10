import { useCallback, useMemo, useState } from '~/libs/hooks/hooks.js';

type UsePagination = (parameters: {
  pageDefault: number;
  totalCount: number;
  rowsPerPage: number;
}) => {
  page: number;
  totalPages: number;
  isShowPagination: boolean;
  handleChangePage: (value: number) => void;
};

const usePagination: UsePagination = ({
  pageDefault,
  totalCount,
  rowsPerPage,
}) => {
  const [page, setPage] = useState(pageDefault);

  const totalPages = useMemo(() => {
    return Math.ceil(totalCount / rowsPerPage);
  }, [totalCount, rowsPerPage]);

  const isShowPagination = useMemo(() => {
    return totalCount > rowsPerPage;
  }, [totalCount, rowsPerPage]);

  const handleChangePage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  return { page, handleChangePage, totalPages, isShowPagination };
};

export { usePagination };
