import { Header, PageLayout } from '~/libs/components/components.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { type ProjectUserEssence } from '~/packages/projects/projects.js';
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
    currentUser: state.auth.user as ProjectUserEssence,
  }));

  return (
    <PageLayout>
      <Header user={currentUser} pageName="My Projects" />
      <div className={styles['cards-wrapper']}>
        {projects.map((card) => (
          <ProjectCard key={card.id} project={card} />
        ))}
      </div>
    </PageLayout>
  );
};

export { MyProjects };
