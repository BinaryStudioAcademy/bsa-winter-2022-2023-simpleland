import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  Icon,
  Input,
  Loader,
  PageLayout,
} from '~/libs/components/components.js';
import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import { configureString, initDebounce } from '~/libs/helpers/helpers.js';
import {
  useAppForm,
  useAppSelector,
  useEffect,
  useParams,
} from '~/libs/hooks/hooks.js';
import { useAppDispatch } from '~/libs/hooks/use-app-dispatch/use-app-dispatch.hook.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type SitesGetAllParametersDto } from '~/packages/sites/libs/types/types.js';
import { sitesFilterValidationSchema } from '~/packages/sites/sites.js';
import { SiteCard } from '~/pages/sites/components/components.js';
import { actions as sitesActions } from '~/slices/sites/sites.js';

import { DEFAULT_SITES_FILTER_PAYLOAD } from './libs/constants.js';
import styles from './styles.module.scss';

const Sites: React.FC = () => {
  const { projectId } = useParams();
  const dispatch = useAppDispatch();

  useEffect((): void => {
    if (projectId) {
      void dispatch(
        sitesActions.getSitesByProjectId({
          projectId: Number(projectId),
          queryParameters: {
            name: '',
          },
        }),
      );
    }
  }, [dispatch, projectId]);

  const { sites, status } = useAppSelector(({ sites }) => ({
    sites: sites.sites,
    status: sites.dataStatus,
  }));

  const { control, errors, handleSubmit } =
    useAppForm<SitesGetAllParametersDto>({
      defaultValues: DEFAULT_SITES_FILTER_PAYLOAD,
      validationSchema: sitesFilterValidationSchema,
    });

  const handleInputChange = useCallback(
    async (data: SitesGetAllParametersDto): Promise<void> => {
      await dispatch(
        sitesActions.getSitesByProjectId({
          projectId: Number(projectId),
          queryParameters: data,
        }),
      );
    },
    [dispatch, projectId],
  );

  const handleFormChange = initDebounce((event_: React.BaseSyntheticEvent) => {
    void handleSubmit(handleInputChange)(event_);
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
            <form onChange={handleFormChange}>
              <Input
                label="search"
                type="search"
                placeholder="Search"
                name="name"
                control={control}
                errors={errors}
                className={styles['search-input']}
                icon="loupe"
                isLabelVisuallyHidden
              />
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
