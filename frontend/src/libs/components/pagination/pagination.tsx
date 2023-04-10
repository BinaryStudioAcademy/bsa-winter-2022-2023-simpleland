import { IconButton } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

const ONE_STEP_LENGTH = 1;
const FIRST_PAGE = 1;

type Properties = {
  currentPage: number;
  onChangePage: (value: number) => void;
  totalPages: number;
  className?: string | undefined;
};

const Pagination: React.FC<Properties> = ({
  currentPage,
  onChangePage,
  totalPages,
  className = '',
}: Properties) => {
  const handlePreviousPage = useCallback(() => {
    onChangePage(currentPage - ONE_STEP_LENGTH);
  }, [onChangePage, currentPage]);

  const handleNextPage = useCallback(() => {
    onChangePage(currentPage + ONE_STEP_LENGTH);
  }, [onChangePage, currentPage]);

  return (
    <div className={getValidClassNames(styles['wrapper'], className)}>
      <IconButton
        icon="arrowLeft"
        label="On previous page"
        onClick={handlePreviousPage}
        className={styles['buttons']}
        isDisabled={currentPage === FIRST_PAGE}
      />
      <div className={styles['item']}>{`${currentPage} of ${totalPages}`}</div>
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
