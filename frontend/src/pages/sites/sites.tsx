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
import {
  type SitesSearchDto,
  sitesSearchValidationSchema,
} from '~/packages/sites/sites.js';
import { actions as sitesActions } from '~/slices/sites/sites.js';

import { SiteCard } from './components/components.js';
import { DEFAULT_SITES_FILTER_PAYLOAD } from './libs/constants.js';
import { DEFAULT_PAGE, SITES_PER_PAGE } from './libs/pagination.constants.js';
import styles from './styles.module.scss';

const Sites: React.FC = () => {
  const { projectId } = useParams();
  const dispatch = useAppDispatch();
  useTitle('My sites');

  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');

  const { sites, status, sitesCount } = useAppSelector(({ sites }) => ({
    sites: sites.sites,
    status: sites.dataStatus,
    sitesCount: sites.sitesCount,
  }));

  const { page, handleChangePage, totalPages, isShowPagination } =
    usePagination({
      pageDefault: DEFAULT_PAGE,
      rowsPerPage: SITES_PER_PAGE,
      totalCount: sitesCount,
    });

  useEffect((): void => {
    if (projectId) {
      void dispatch(
        sitesActions.getSitesByProjectId({
          parameters: { projectId: Number(projectId) },
          queryParameters: {
            name: search,
            page,
            limit: SITES_PER_PAGE,
          },
        }),
      );
    }
  }, [dispatch, projectId, page, search]);

  const { control, errors, handleSubmit } = useAppForm<SitesSearchDto>({
    defaultValues: DEFAULT_SITES_FILTER_PAYLOAD,
    validationSchema: sitesSearchValidationSchema,
  });

  const handleSearching = useCallback(
    (value: string) => {
      setSearch(value);

      return setIsSearching(value.length > 0);
    },
    [setSearch],
  );

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

  if (status === DataStatus.PENDING) {
    return (
      <PageLayout style={isSitesShow ? 'white' : 'black'}>
        <Loader style="yellow" />
      </PageLayout>
    );
  }

  return (
    <PageLayout
      style={isSitesShow ? 'white' : 'black'}
      className={styles['page-layout']}
    >
      <div className={styles['page-wrapper']}>
        {isSitesShow ? (
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
