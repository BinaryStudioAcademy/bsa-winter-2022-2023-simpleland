import { Button, Loader, PageLayout } from '~/libs/components/components.js';
import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import { configureString } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
  useTitle,
} from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import { actions as sitesActions } from '~/slices/sites/sites.js';

import { SiteCard } from './components/components.js';
import styles from './styles.module.scss';

const Sites: React.FC = () => {
  const { projectId } = useParams();
  const dispatch = useAppDispatch();
  useTitle('My sites');

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

  const hasSites = sites.length > 0;
  const createSiteLink = configureString<ValueOf<typeof AppRoute>>(
    AppRoute.PROJECTS_$PROJECT_ID_START,
    {
      projectId,
    },
  );

  if (status === DataStatus.PENDING) {
    return (
      <PageLayout style="black">
        <Loader style="yellow" />
      </PageLayout>
    );
  }

  return (
    <PageLayout
      pageName="My Sites"
      style={hasSites ? 'white' : 'black'}
      className={styles['page-layout']}
    >
      <div className={styles['page-wrapper']}>
        {hasSites ? (
          <>
            <div className={styles['search-wrapper']}>
              <Button
                label="Add Site"
                icon="plus"
                className={styles['create-button']}
                size="small"
                to={createSiteLink}
              />
            </div>
            <div className={styles['cards-wrapper']}>
              {sites.map((site) => (
                <SiteCard key={site.id} site={site} />
              ))}
            </div>
          </>
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
              to={createSiteLink}
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export { Sites };
