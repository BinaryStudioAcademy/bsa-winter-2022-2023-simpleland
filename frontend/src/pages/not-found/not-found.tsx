import { PageLayout } from '~/libs/components/components.js';

import styles from './styles.module.scss';

const NotFound = (): JSX.Element => {
  return (
    <PageLayout style="black">
      <div className={styles['not-found-page']}>
        <h1 className={styles['warning-message']}>Oops!</h1>
        <p className={styles['warning-number']}>Error 404 - Page Not Found</p>
        <p className={styles['status']}>
          Sorry, but the requested page could not be found
        </p>
      </div>
    </PageLayout>
  );
};

export { NotFound };
