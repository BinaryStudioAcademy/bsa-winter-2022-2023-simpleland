import {
  Button,
  Icon,
  Input,
  Link,
  Loader,
  PageLayout,
} from '~/libs/components/components.js';
import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import { debounce } from '~/libs/helpers/debounce/debounce.js';
import { configureString } from '~/libs/helpers/helpers.js';
import {
  useAppForm,
  useAppSelector,
  useCallback,
  useEffect,
  useParams,
} from '~/libs/hooks/hooks.js';
import { useAppDispatch } from '~/libs/hooks/use-app-dispatch/use-app-dispatch.hook.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type SitesSearchRequestDto } from '~/packages/sites/libs/types/types.js';
import { sitesSearchValidationSchema } from '~/packages/sites/sites.js';
import { SiteCard } from '~/pages/sites/components/components.js';
import { actions as sitesActions } from '~/slices/sites/sites.js';

import styles from './styles.module.scss';

const Sites: React.FC = () => {
  const { projectId } = useParams();
  const dispatch = useAppDispatch();

  useEffect((): void => {
    if (projectId) {
      void dispatch(
        sitesActions.getSitesByProjectId({
          projectId: Number(projectId),
          parameters: { pattern: null },
        }),
      );
    }
  }, [dispatch, projectId]);

  const { sites, status } = useAppSelector(({ sites }) => ({
    sites: sites.sites,
    status: sites.dataStatus,
  }));

  const { control, errors, handleSubmit } = useAppForm<SitesSearchRequestDto>({
    defaultValues: { pattern: '' },
    validationSchema: sitesSearchValidationSchema,
  });

  const onInputChange = useCallback(
    async (data: SitesSearchRequestDto): Promise<void> => {
      await dispatch(
        sitesActions.getSitesByProjectId({
          projectId: Number(projectId),
          parameters: data,
        }),
      );
    },
    [dispatch, projectId],
  );

  const handleFormChange = debounce((event_: React.BaseSyntheticEvent) => {
    void handleSubmit(onInputChange)(event_);
  });

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
            <div className={styles['button-wrapper']}>
              <div>
                <Link to={AppRoute.MY_PROJECTS}>
                  <span className={styles['link-to-projects']}>
                    <Icon
                      iconName="arrowLeft"
                      className={styles['back-icon']}
                    />
                  </span>
                </Link>
              </div>
              <h2>Landing</h2>
            </div>
            <form className={styles['search-form']} onChange={handleFormChange}>
              <div className={styles['search-input-wrapper']}>
                <Input
                  type="text"
                  placeholder="Search"
                  name="pattern"
                  control={control}
                  errors={errors}
                  icon="loupe"
                />
              </div>
            </form>
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
