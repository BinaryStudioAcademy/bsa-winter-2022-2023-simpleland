import {
  Button,
  Input,
  Loader,
  PageLayout,
  Pagination,
} from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/enums.js';
import { initDebounce } from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useCallback,
  useEffect,
  useMemo,
  usePagination,
  useState,
  useTitle,
} from '~/libs/hooks/hooks.js';
import {
  type ProjectCreateRequestDto,
  type ProjectGetAllParametersDto,
  type ProjectUploadImageDto,
} from '~/packages/projects/projects.js';
import { actions as projectActions } from '~/slices/projects/projects.js';

import { CreateProjectModal, ProjectCard } from './components/components.js';
import { DEFAULT_PROJECT_FILTER_PAYLOAD } from './libs/constants.js';
import styles from './styles.module.scss';

const PROJECTS_PER_PAGE = 6;
const PAGE_DEFAULT = 1;

const MyProjects: React.FC = () => {
  const { projects, status, projectsCount } = useAppSelector((state) => ({
    projectsCount: state.projects.projectsCount,
    projects: state.projects.projects,
    status: state.projects.dataStatus,
  }));

  const [isOpen, setIsOpen] = useState(false);
  const [searchName, setSearchName] = useState('');
  const { page, handleChangePage, totalPages, isShowPagination } =
    usePagination({
      pageDefault: PAGE_DEFAULT,
      totalCount: projectsCount,
      rowsPerPage: PROJECTS_PER_PAGE,
    });

  const handleModalOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const dispatch = useAppDispatch();
  useTitle('My projects');

  useEffect((): void => {
    void dispatch(
      projectActions.getUserProjects({
        name: searchName,
        page,
        limit: PROJECTS_PER_PAGE,
      }),
    );
  }, [dispatch, page, searchName]);

  const { control, errors, handleSubmit } =
    useAppForm<ProjectGetAllParametersDto>({
      defaultValues: DEFAULT_PROJECT_FILTER_PAYLOAD,
      mode: 'onChange',
    });

  const handleProjectSubmit = useCallback(
    (payload: ProjectCreateRequestDto & ProjectUploadImageDto): void => {
      void dispatch(projectActions.createProject(payload))
        .unwrap()
        .then(() => {
          handleModalClose();
        });
    },
    [dispatch, handleModalClose],
  );

  const handleSearch = useCallback(
    (data: ProjectGetAllParametersDto): void => {
      setSearchName(data.search);
      handleChangePage(PAGE_DEFAULT);
    },
    [handleChangePage],
  );

  const handleFormChange = initDebounce((event_: React.BaseSyntheticEvent) => {
    void handleSubmit(handleSearch)(event_);
  });

  const hasProjects = useMemo(() => {
    return projects.length > 0 || searchName.length > 0;
  }, [projects, searchName]);

  if (status === DataStatus.PENDING) {
    return (
      <PageLayout style="black">
        <Loader style="yellow" />
      </PageLayout>
    );
  }

  return (
    <>
      <PageLayout
        style={hasProjects ? 'white' : 'black'}
        className={styles['page-layout']}
      >
        <div className={styles['page-wrapper']}>
          {hasProjects ? (
            <>
              <div>
                <div className={styles['search-wrapper']}>
                  <form onChange={handleFormChange}>
                    <Input
                      label="search"
                      type="search"
                      placeholder="Search"
                      name="search"
                      control={control}
                      errors={errors}
                      className={styles['search-input']}
                      icon="loupe"
                      isLabelVisuallyHidden
                    />
                  </form>
                  <Button
                    label="Add Project"
                    icon="plus"
                    className={styles['create-button']}
                    size="small"
                    onClick={handleModalOpen}
                  />
                </div>

                <div className={styles['cards-wrapper']}>
                  {projects.map((card) => (
                    <ProjectCard key={card.id} project={card} />
                  ))}
                </div>
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
                <span className={styles['placeholder-sub-caption']}>
                  Hello!
                </span>
                <span className={styles['placeholder-main-caption']}>
                  There are no projects
                </span>
              </div>
              <Button
                className={styles['placeholder-button']}
                label="Create a new project"
                onClick={handleModalOpen}
              />
            </div>
          )}
        </div>
      </PageLayout>
      <CreateProjectModal
        onSubmit={handleProjectSubmit}
        isOpen={isOpen}
        onCloseModal={handleModalClose}
      />
    </>
  );
};

export { MyProjects };
