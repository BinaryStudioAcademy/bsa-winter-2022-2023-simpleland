import { Button, PageLayout } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { actions as projectActions } from '~/slices/projects/projects.js';

import { ProjectCard } from './components/project-card/project-card.js';
import styles from './styles.module.scss';

const MyProjects: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect((): void => {
    void dispatch(projectActions.getUserProjects());
  }, [dispatch]);

  const { projects } = useAppSelector((state) => ({
    projects: state.projects.projects,
  }));

  const hasProjects = projects.length > 0;

  return (
    <PageLayout
      pageName="My Projects"
      style="white"
      className={styles['page-layout']}
    >
      <div className={styles['page-wrapper']}>
        <div className={styles['search-wrapper']}>
          <Button
            label="Add Business"
            icon="plus"
            className={styles['create-button']}
            size="small"
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
              <span className={styles['placeholder-sub-caption']}>Hello!</span>
              <span className={styles['placeholder-main-caption']}>
                There are no businesses
              </span>
            </div>
            <Button
              className={styles['placeholder-button']}
              label="Create new business"
              to={AppRoute.ROOT}
            />
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export { MyProjects };
