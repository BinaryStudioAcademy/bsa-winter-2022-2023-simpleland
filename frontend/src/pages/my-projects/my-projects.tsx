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
  useState,
} from '~/libs/hooks/hooks.js';
import {
  type ProjectCreateRequestDto,
  type ProjectGetAllParametersDto,
} from '~/packages/projects/projects.js';
import { actions as projectActions } from '~/slices/projects/projects.js';

import { CreateProjectModal, ProjectCard } from './components/components.js';
import { DEFAULT_PROJECT_FILTER_PAYLOAD } from './libs/constants.js';
import styles from './styles.module.scss';

const MyProjects: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModalOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const dispatch = useAppDispatch();

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
    (payload: ProjectCreateRequestDto): void => {
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
      void dispatch(projectActions.getUserProjects({ name: data.search }));
    },
    [dispatch],
  );

  const handleFormChange = initDebounce((event_: React.BaseSyntheticEvent) => {
    void handleSubmit(handleSearch)(event_);
  });

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
        pageName="My Projects"
        style={hasProjects ? 'white' : 'black'}
        className={styles['page-layout']}
      >
        <div className={styles['page-wrapper']}>
          {hasProjects ? (
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
                  <ProjectCard key={card.id} project={card} />
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
      <CreateProjectModal
        onSubmit={handleProjectSubmit}
        isOpen={isOpen}
        onCloseModal={handleModalClose}
      />
    </>
  );
};

export { MyProjects };
