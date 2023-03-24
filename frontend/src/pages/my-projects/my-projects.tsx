import { Header, PageLayout } from '~/libs/components/components.js';
import { PageName } from '~/libs/enums/enums.js';
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
    void dispatch(projectActions.getProjects());
  }, [dispatch]);

  const { projects, currentUser } = useAppSelector((state) => ({
    projects: state.projects.projects,
    currentUser: state.auth.user,
  }));

  return (
    <PageLayout>
      <Header user={currentUser} pageName={PageName.MY_PROJECTS} />
      <div className={styles['cards-wrapper']}>
        {projects.map((card) => (
          <ProjectCard key={card.id} siteName={card.name} />
        ))}
      </div>
    </PageLayout>
  );
};

export { MyProjects };
