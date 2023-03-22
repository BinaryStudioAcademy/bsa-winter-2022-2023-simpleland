import { type UserAuthResponse } from 'shared/build/index.js';

import { Header, PageLayout } from '~/libs/components/components.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { actions as projectActions } from '~/slices/projects/projects.js';

import { ProjectCard } from './components/project-card/project-card.js';
import styles from './styles.module.scss';

const MyProjects: React.FC = () => {
  const mockUser: UserAuthResponse = {
    // replace with user fromn store
    id: 35,
    email: 'Adenium@fk.ua',
    firstName: 'Vlad',
    lastName: 'Bazhynov',
  };

  const dispatch = useAppDispatch();

  useEffect((): void => {
    void dispatch(projectActions.getProjects());
  });

  const { projects } = useAppSelector((state) => ({
    projects: state.projects.projects?.items,
  }));

  return (
    <PageLayout>
      <Header user={mockUser} />
      <div className={styles['cardsWrapper']}>
        {projects?.map((card) => (
          <ProjectCard key={card.id} siteName={card.name} />
        ))}
      </div>
    </PageLayout>
  );
};

export { MyProjects };
