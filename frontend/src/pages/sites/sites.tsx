import { Loader, PageLayout } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/enums.js';
import { useAppSelector, useEffect, useParams } from '~/libs/hooks/hooks.js';
import { useAppDispatch } from '~/libs/hooks/use-app-dispatch/use-app-dispatch.hook';
import { SiteCard } from '~/pages/sites/components/components.js';
import { actions as sitesActions } from '~/slices/sites/sites.js';

import styles from './styles.module.scss';

const Sites: React.FC = () => {
  const { projectId } = useParams();
  const dispatch = useAppDispatch();

  useEffect((): void => {
    if (projectId) {
      void dispatch(
        sitesActions.getSitesByProject({ projectId: Number(projectId) }),
      );
    }
  }, [dispatch, projectId]);

  const { sites, status } = useAppSelector(({ sites }) => ({
    sites: sites.sites,
    status: sites.dataStatus,
  }));

  if (status === DataStatus.PENDING) {
    return (
      <PageLayout style="black">
        <Loader style="yellow" />
      </PageLayout>
    );
  }

  return (
    <PageLayout
      style="white"
      pageName="My Sites"
      className={styles['page-layout']}
    >
      <div className={styles['page-wrapper']}>
        <div className={styles['cards-wrapper']}>
          {sites.map((site) => (
            <SiteCard key={site.id} site={site} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export { Sites };
