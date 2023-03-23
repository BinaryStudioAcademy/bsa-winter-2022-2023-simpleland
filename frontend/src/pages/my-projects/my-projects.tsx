import { type UserAuthResponse } from 'shared/build/index.js';

import { Button, Header, PageLayout } from '~/libs/components/components.js';
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
    // replace with user from store
    id: 35,
    email: 'Adenium@fk.ua',
    firstName: 'Vlad',
    lastName: 'Bazhynov',
    accountName: 'Bazhynov',
  };

  const dispatch = useAppDispatch();

  useEffect((): void => {
    void dispatch(projectActions.getUserProjects());
  }, [dispatch]);

  const { projects } = useAppSelector((state) => ({
    projects: state.projects.projects.items,
  }));

  return (
    <PageLayout style="black">
      <Header user={mockUser} />
      {projects.length === 0 && (
        <div className={styles['placeholder']}>
          <div className={styles['placeholder-caption']}>
            <span className={styles['placeholder-sub-caption']}>Hello!</span>
            <span className={styles['placeholder-main-caption']}>
              There are no businesses
            </span>
          </div>
          <Button className={styles['placeholder-button']} label="Create new business" />
        </div>
      )}
      {projects.length > 0 && (
        <div className={styles['cards-wrapper']}>
          {projects.map((card) => (
            <ProjectCard key={card.id} siteName={card.name} />
          ))}
        </div>
      )}
    </PageLayout>
  );
};

export { MyProjects };
