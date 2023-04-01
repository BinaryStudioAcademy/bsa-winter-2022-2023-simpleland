import { Button, PageLayout } from '~/libs/components/components.js';
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

  const { sites } = useAppSelector(({ sites }) => ({
    sites: sites.sites,
  }));

  const hasSites = sites.length > 0;

  return (
    <PageLayout
      style={hasSites ? 'white' : 'black'}
      pageName="My Sites"
      className={styles['page-layout']}
    >
      {hasSites ? (
        <div className={styles['page-wrapper']}>
          <div className={styles['cards-wrapper']}>
            {sites.map((site) => (
              <SiteCard key={site.id} site={site} />
            ))}
          </div>
        </div>
      ) : (
        <div className={styles['placeholder']}>
          <div className={styles['placeholder-caption']}>
            <span className={styles['placeholder-sub-caption']}>Hello!</span>
            <span className={styles['placeholder-main-caption']}>
              There are no sites
            </span>
          </div>
          <Button
            className={styles['placeholder-button']}
            label="Create a new site"
          />
        </div>
      )}
    </PageLayout>
  );
};

export { Sites };
