import { PageLayout } from '~/libs/components/components.js';
import { useTitle } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

const NotFound: React.FC = () => {
  useTitle('Page Not Found');

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
