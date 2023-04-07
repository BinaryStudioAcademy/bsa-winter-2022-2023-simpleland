import { Button, IconButton } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useMemo } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

const ONE_STEP_LENGTH = 1;
const FIRST_PAGE = 1;

type Properties = {
  currentPage: number;
  onChangePage: (value: number) => void;
  count: number;
  rowsPerPage: number;
  className?: string | undefined;
};

const Pagination: React.FC<Properties> = ({
  currentPage,
  onChangePage,
  count,
  rowsPerPage,
  className = '',
}: Properties) => {
  const handlePreviousPage = useCallback(() => {
    onChangePage(currentPage - ONE_STEP_LENGTH);
  }, [onChangePage, currentPage]);

  const handleNextPage = useCallback(() => {
    onChangePage(currentPage + ONE_STEP_LENGTH);
  }, [onChangePage, currentPage]);

  const handleChangePage = useCallback(
    (page: number) => {
      return () => {
        onChangePage(page);
      };
    },
    [onChangePage],
  );

  const totalPages = useMemo(() => {
    return Math.ceil(count / rowsPerPage);
  }, [count, rowsPerPage]);

  const visiblePages = useMemo(() => {
    let pages;

    switch (currentPage) {
      case FIRST_PAGE: {
        pages = [
          currentPage,
          currentPage + ONE_STEP_LENGTH,
          currentPage + 2 * ONE_STEP_LENGTH,
        ];
        break;
      }
      case totalPages: {
        pages = [
          currentPage - 2 * ONE_STEP_LENGTH,
          currentPage - ONE_STEP_LENGTH,
          currentPage,
        ];
        break;
      }
      default: {
        pages = [
          currentPage - ONE_STEP_LENGTH,
          currentPage,
          currentPage + ONE_STEP_LENGTH,
        ];
      }
    }

    if (pages.length > totalPages) {
      pages = pages.filter((page) => page >= FIRST_PAGE && page <= totalPages);
    }

    return pages;
  }, [currentPage, totalPages]);

  const isShowFirstPage = useMemo(() => {
    return visiblePages[0] !== FIRST_PAGE;
  }, [visiblePages]);
  const isShowFirst3Dots = useMemo(() => {
    return (
      visiblePages[0] && visiblePages[0] >= FIRST_PAGE + 2 * ONE_STEP_LENGTH
    );
  }, [visiblePages]);

  const isShowLastPage = useMemo(() => {
    return visiblePages[visiblePages.length - 1] !== totalPages;
  }, [visiblePages, totalPages]);
  const isShowLast3Dots = useMemo(() => {
    const lastVisiblePage = visiblePages[visiblePages.length - 1];

    return (
      lastVisiblePage && lastVisiblePage <= totalPages - 2 * ONE_STEP_LENGTH
    );
  }, [visiblePages, totalPages]);

  return (
    <div className={getValidClassNames(styles['wrapper'], className)}>
      <IconButton
        icon="arrowLeft"
        label="On previous page"
        onClick={handlePreviousPage}
        className={styles['buttons']}
        isDisabled={currentPage === FIRST_PAGE}
      />

      <div className={styles['item-wrapper']}>
        {isShowFirstPage && (
          <Button
            label={FIRST_PAGE.toString()}
            style="plain"
            className={styles['item']}
            onClick={handleChangePage(FIRST_PAGE)}
          />
        )}
        {isShowFirst3Dots && <div>...</div>}
        {visiblePages.map((page, index) => (
          <Button
            label={page.toString()}
            style="plain"
            key={index}
            className={getValidClassNames(
              styles['item'],
              currentPage === page && styles['item-yellow'],
            )}
            onClick={handleChangePage(page)}
          />
        ))}
        {isShowLast3Dots && <div>...</div>}
        {isShowLastPage && (
          <Button
            label={totalPages.toString()}
            style="plain"
            className={styles['item']}
            onClick={handleChangePage(totalPages)}
          />
        )}
      </div>

      <IconButton
        icon="arrowRight"
        label="On next page"
        onClick={handleNextPage}
        className={styles['buttons']}
        isDisabled={currentPage === totalPages}
      />
    </div>
  );
};

export { Pagination };
