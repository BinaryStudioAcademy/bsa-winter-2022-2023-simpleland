import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';

import { Icon, Input, PageLayout } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/app-route.enum';
import { debounce } from '~/libs/helpers/debounce/debounce.js';
import {
  useAppForm,
  useAppSelector,
  useEffect,
  useParams,
} from '~/libs/hooks/hooks.js';
import { useAppDispatch } from '~/libs/hooks/use-app-dispatch/use-app-dispatch.hook.js';
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

  const { sites } = useAppSelector(({ sites }) => ({
    sites: sites.sites,
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

  return (
    <PageLayout
      style="white"
      pageName="My Sites"
      className={styles['page-layout']}
    >
      <div className={styles['page-wrapper']}>
        <div className={styles['button-wrapper']}>
          <div>
            <Link to={AppRoute.MY_PROJECTS}>
              <span className={styles['link-to-projects']}>
                <Icon iconName="arrowLeft" className={styles['back-icon']} />
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
              icon="search"
            />
          </div>
        </form>
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
