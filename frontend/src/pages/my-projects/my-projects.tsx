import {
  Button,
  Header,
  Link,
  PageLayout,
} from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useMemo,
} from '~/libs/hooks/hooks.js';
import { actions as projectActions } from '~/slices/projects/projects.js';

import { ProjectCard } from './components/project-card/project-card.js';
import styles from './styles.module.scss';

const MyProjects: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect((): void => {
    void dispatch(projectActions.getProjects());
  }, [dispatch]);

  const { projects, currentUser } = useAppSelector((state) => ({
    projects: state.projects.projects,
    currentUser: state.auth.user,
  }));

  const handleProjectsDisplay = useMemo(() => {
    if (projects.length === 0) {
      return (
        <div className={styles['placeholder']}>
          <div className={styles['placeholder-caption']}>
            <span className={styles['placeholder-sub-caption']}>Hello!</span>
            <span className={styles['placeholder-main-caption']}>
              There are no businesses
            </span>
          </div>
          <Link to={AppRoute.ROOT}>
            <Button
              className={styles['placeholder-button']}
              label="Create new business"
            />
          </Link>
        </div>
      );
    }

    return (
      <div className={styles['cards-wrapper']}>
        {projects.map((card) => (
          <ProjectCard key={card.id} siteName={card.name} />
        ))}
      </div>
    );
  }, [projects]);

  return (
    <PageLayout>
      <Header user={currentUser} />
      {handleProjectsDisplay}
    </PageLayout>
  );
};

export { MyProjects };
