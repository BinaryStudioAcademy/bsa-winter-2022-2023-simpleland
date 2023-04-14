import {
  Button,
  Icon,
  Input,
  Link,
  Loader,
  PageLayout,
  Pagination,
} from '~/libs/components/components.js';
import { AppRoute, DataStatus } from '~/libs/enums/enums.js';
import { configureString, initDebounce } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useCallback,
  useEffect,
  useMemo,
  usePagination,
  useParams,
  useState,
  useTitle,
} from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type ProjectGetAllItemResponseDto } from '~/packages/projects/projects.js';
import {
  type SitesSearchDto,
  sitesSearchValidationSchema,
} from '~/packages/sites/sites.js';
import { actions as projectsActions } from '~/slices/projects/projects.js';
import { actions as sitesActions } from '~/slices/sites/sites.js';

import { SiteCard } from './components/components.js';
import { DEFAULT_SITES_SEARCH_PAYLOAD } from './libs/constants.js';
import { DEFAULT_PAGE, SITES_PER_PAGE } from './libs/pagination.constants.js';
import styles from './styles.module.scss';

const Sites: React.FC = () => {
  const { projectId } = useParams();
  const dispatch = useAppDispatch();
  useTitle('My sites');

  const [isSearching, setIsSearching] = useState<boolean>(false);

  const { sites, sitesStatus, sitesCount, project, projectStatus } =
    useAppSelector(({ sites, projects }) => ({
      sites: sites.sites,
      sitesStatus: sites.dataStatus,
      sitesCount: sites.sitesCount,
      project: projects.currentProject,
      projectStatus: projects.dataStatus,
    }));

  const { page, handleChangePage, totalPages, isShowPagination } =
    usePagination({
      pageDefault: DEFAULT_PAGE,
      rowsPerPage: SITES_PER_PAGE,
      totalCount: sitesCount,
    });

  const { control, errors, handleSubmit, handleValuesGet } =
    useAppForm<SitesSearchDto>({
      defaultValues: DEFAULT_SITES_SEARCH_PAYLOAD,
      validationSchema: sitesSearchValidationSchema,
    });

  useEffect((): void => {
    if (projectId) {
      void dispatch(
        sitesActions.getSitesByProjectId({
          parameters: { projectId: Number(projectId) },
          queryParameters: {
            name: handleValuesGet('name'),
            page,
            limit: SITES_PER_PAGE,
          },
        }),
      );
      void dispatch(
        projectsActions.getCurrentProject({ id: Number(projectId) }),
      );
    }
  }, [dispatch, projectId, page, handleValuesGet]);

  const handleSearching = useCallback((value: string) => {
    return setIsSearching(value.length > 0);
  }, []);

  const handleInputChange = useCallback(
    async (data: SitesSearchDto): Promise<void> => {
      handleChangePage(DEFAULT_PAGE);

      await dispatch(
        sitesActions.getSitesByProjectId({
          parameters: { projectId: Number(projectId) },
          queryParameters: { name: data.name, page, limit: SITES_PER_PAGE },
        }),
      );
      handleSearching(data.name);
    },
    [dispatch, projectId, handleSearching, handleChangePage, page],
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

  const isSitesShow = useMemo(() => {
    return hasSites || isSearching;
  }, [hasSites, isSearching]);

  const isLoading =
    sitesStatus === DataStatus.PENDING || projectStatus === DataStatus.PENDING;

  if (isLoading) {
    return (
      <PageLayout style={isSitesShow ? 'white' : 'black'}>
        <Loader style="yellow" />
      </PageLayout>
    );
  }

  const isError =
    sitesStatus === DataStatus.REJECTED ||
    projectStatus === DataStatus.REJECTED;

  if (isError) {
    return <PageLayout style={isSitesShow ? 'white' : 'black'} />;
  }

  return (
    <PageLayout
      style={isSitesShow ? 'white' : 'black'}
      className={styles['page-layout']}
    >
      <div className={styles['page-wrapper']}>
        {isSitesShow ? (
          <>
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
              <h2 className={styles['title']}>
                {(project as ProjectGetAllItemResponseDto).name}
              </h2>
            </div>
            <div className={styles['search-wrapper']}>
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
            {isShowPagination && (
              <Pagination
                currentPage={page}
                onChangePage={handleChangePage}
                totalPages={totalPages}
                className={styles['pagination-wrapper']}
              />
            )}
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
