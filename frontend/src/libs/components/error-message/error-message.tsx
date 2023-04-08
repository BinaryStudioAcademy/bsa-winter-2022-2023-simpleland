import { getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  error: string | undefined;
  className?: string | undefined;
};

const ErrorMessage = ({ error, className }: Properties): JSX.Element => {
  const hasError = Boolean(error);

  return (
    <span className={getValidClassNames(styles['error-message'], className)}>
      {hasError && error}
    </span>
  );
};

export { ErrorMessage };
