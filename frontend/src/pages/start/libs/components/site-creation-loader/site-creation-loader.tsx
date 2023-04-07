import { Loader, PageLayout } from '~/libs/components/components.js';

import styles from './styles.module.scss';

const SiteCreationLoader: React.FC = () => {
  return (
    <PageLayout style="yellow">
      <div className={styles['wrapper']}>
        <div>This may take some time, so please wait</div>
        <Loader style="black" />
      </div>
    </PageLayout>
  );
};

export { SiteCreationLoader };
