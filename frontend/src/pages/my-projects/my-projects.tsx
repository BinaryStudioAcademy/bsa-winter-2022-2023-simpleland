import {
  Button,
  Input,
  Loader,
  PageLayout,
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

const MyProjects: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
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

  useEffect((): void => {
    void dispatch(projectActions.getUserProjects({ name: '' }));
  }, [dispatch]);

  const { projects, status } = useAppSelector((state) => ({
    projects: state.projects.projects,
    status: state.projects.dataStatus,
  }));

  const { control, errors, handleSubmit } =
    useAppForm<ProjectGetAllParametersDto>({
      defaultValues: DEFAULT_PROJECT_FILTER_PAYLOAD,
      mode: 'onChange',
    });

  const hasProjects = projects.length > 0;

  const handleProjectSubmit = useCallback(
    (payload: ProjectCreateRequestDto & ProjectUploadImageDto): void => {
      if (currentProject) {
        void dispatch(
          projectActions.updateProject({
            projectId: currentProject.id,
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

  const handleSearching = useCallback((value: string) => {
    return setIsSearching(value.length > 0);
  }, []);

  const handleSearch = useCallback(
    (data: ProjectGetAllParametersDto): void => {
      void dispatch(projectActions.getUserProjects({ name: data.search }));
      handleSearching(data.search);
    },
    [dispatch, handleSearching],
  );

  const handleFormChange = initDebounce((event_: React.BaseSyntheticEvent) => {
    void handleSubmit(handleSearch)(event_);
  });

  const isProjectShow = useMemo(() => {
    return hasProjects || isSearching;
  }, [hasProjects, isSearching]);

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
        style={isProjectShow ? 'white' : 'black'}
        className={styles['page-layout']}
      >
        <div className={styles['page-wrapper']}>
          {isProjectShow ? (
            <>
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
