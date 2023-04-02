import { Button, Loader, PageLayout } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useState,
} from '~/libs/hooks/hooks.js';
import { type ProjectCreateRequestDto } from '~/packages/projects/projects.js';
import { actions as projectActions } from '~/slices/projects/projects.js';

import { CreateProjectModal, ProjectCard } from './components/components.js';
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
    void dispatch(projectActions.getUserProjects());
  }, [dispatch]);

  const { projects, status } = useAppSelector((state) => ({
    projects: state.projects.projects,
    status: state.projects.dataStatus,
  }));

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
