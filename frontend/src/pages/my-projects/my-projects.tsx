import { Button, PageLayout } from '~/libs/components/components.js';
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

  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const dispatch = useAppDispatch();

  useEffect((): void => {
    void dispatch(projectActions.getUserProjects());
  }, [dispatch]);

  const { projects } = useAppSelector((state) => ({
    projects: state.projects.projects,
  }));

  const hasProjects = projects.length > 0;

  const handleProjectSubmit = useCallback(
    (payload: ProjectCreateRequestDto): void => {
      void dispatch(projectActions.createProject(payload))
        .unwrap()
        .then(() => {
          handleCloseModal();
        });
    },
    [dispatch, handleCloseModal],
  );

  return (
    <PageLayout
      pageName="My Projects"
      style="white"
      className={styles['page-layout']}
    >
      {isOpen ? (
        <CreateProjectModal
          onSubmit={handleProjectSubmit}
          isOpen={isOpen}
          closeModal={handleCloseModal}
        />
      ) : (
        <div className={styles['page-wrapper']}>
          <div className={styles['search-wrapper']}>
            <Button
              label="Add Business"
              icon="plus"
              className={styles['create-button']}
              size="small"
              onClick={handleOpenModal}
            />
          </div>
          {hasProjects ? (
            <div className={styles['cards-wrapper']}>
              {projects.map((card) => (
                <ProjectCard key={card.id} project={card} />
              ))}
            </div>
          ) : (
            <div className={styles['placeholder']}>
              <div className={styles['placeholder-caption']}>
                <span className={styles['placeholder-sub-caption']}>
                  Hello!
                </span>
                <span className={styles['placeholder-main-caption']}>
                  There are no businesses
                </span>
              </div>
              <Button
                className={styles['placeholder-button']}
                label="Create new business"
                onClick={handleOpenModal}
              />
            </div>
          )}
        </div>
      )}
    </PageLayout>
  );
};

export { MyProjects };
