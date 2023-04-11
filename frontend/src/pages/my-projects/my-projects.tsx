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
  type ProjectGetAllItemResponseDto,
  type ProjectGetAllParametersDto,
  type ProjectUploadImageDto,
} from '~/packages/projects/projects.js';
import { actions as projectActions } from '~/slices/projects/projects.js';

import {
  ConfigurateProjectPopup,
  ProjectCard,
} from './components/components.js';
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
  const { page, handleChangePage, totalPages, isShowPagination } =
    usePagination({
      pageDefault: PAGE_DEFAULT,
      totalCount: projectsCount,
      rowsPerPage: PROJECTS_PER_PAGE,
    });
  const [currentProject, setCurrentProject] =
    useState<ProjectGetAllItemResponseDto | null>(null);

  const handleModalOpen = useCallback(() => {
    setIsOpen(true);
    setCurrentProject(null);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsOpen(false);
    setCurrentProject(null);
  }, []);

  const handleProjectEdit = useCallback(
    (project: ProjectGetAllItemResponseDto) => {
      setIsOpen(true);
      setCurrentProject(project);
    },
    [],
  );

  const dispatch = useAppDispatch();
  useTitle('My projects');

  const { control, errors, handleSubmit, getValues } =
    useAppForm<ProjectGetAllParametersDto>({
      defaultValues: DEFAULT_PROJECT_FILTER_PAYLOAD,
      mode: 'onChange',
    });

  useEffect((): void => {
    void dispatch(
      projectActions.getUserProjects({
        name: getValues('search'),
        page,
        limit: PROJECTS_PER_PAGE,
      }),
    );
  }, [dispatch, page, getValues]);

  const handleProjectSubmit = useCallback(
    (payload: ProjectCreateRequestDto & ProjectUploadImageDto): void => {
      if (currentProject) {
        void dispatch(
          projectActions.updateProject({
            id: currentProject.id,
            payload,
          }),
        )
          .unwrap()
          .then(() => {
            handleModalClose();
            setCurrentProject(null);
          });
      } else {
        void dispatch(projectActions.createProject(payload))
          .unwrap()
          .then(() => {
            handleModalClose();
          });
      }
    },
    [currentProject, dispatch, handleModalClose],
  );

  const handleSearch = useCallback(
    (data: ProjectGetAllParametersDto): void => {
      handleChangePage(PAGE_DEFAULT);

      void dispatch(
        projectActions.getUserProjects({
          name: data.search,
          page,
          limit: PROJECTS_PER_PAGE,
        }),
      );
    },
    [handleChangePage, dispatch, page],
  );

  const handleFormChange = initDebounce((event_: React.BaseSyntheticEvent) => {
    void handleSubmit(handleSearch)(event_);
  });

  const hasProjects = useMemo(() => {
    return projects.length > 0 || getValues('search').length > 0;
  }, [projects, getValues]);

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
                    <ProjectCard
                      key={card.id}
                      project={card}
                      onEdit={handleProjectEdit}
                    />
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
      <ConfigurateProjectPopup
        project={currentProject}
        onSubmit={handleProjectSubmit}
        isOpen={isOpen}
        onClose={handleModalClose}
      />
    </>
  );
};

export { MyProjects };
