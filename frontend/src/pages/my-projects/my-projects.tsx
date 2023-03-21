// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';

import { type UserAuthResponse } from 'shared/build/index.js';

import { Header, PageLayout } from '~/libs/components/components.js';

// import { projectsApi } from '~/packages/projects/projects';
// import { actions as projectActions } from '~/slices/projects/projects.js';
import { ProjectCard } from './components/project-card/project-card.js';
import styles from './styles.module.scss';

type ProjectCardType = {
  id: number;
  siteName: string;
  imgLink: string;
};

const MyProjects: React.FC = () => {
  const mockUser: UserAuthResponse = {
    id: 54,
    email: 'Adenium@fk.ua',
    firstName: 'Vlad',
    lastName: 'Bazhynov',
  };

  const cardsMock: ProjectCardType[] = [
    {
      id: 1,
      siteName: 'Big Data',
      imgLink: '',
    },
    {
      id: 2,
      siteName: 'Behemoth',
      imgLink: '',
    },
    {
      id: 3,
      siteName: 'Lean On',
      imgLink: '',
    },
    {
      id: 1,
      siteName: 'Big Data',
      imgLink: '',
    },
    {
      id: 2,
      siteName: 'Behemoth',
      imgLink: '',
    },
    {
      id: 3,
      siteName: 'Lean On',
      imgLink: '',
    },
  ];

  // const dispatch = useDispatch();

  // useEffect((): void => void dispatch(projectActions.getProjects() ));

  return (
    <PageLayout>
      <Header user={mockUser} />
      <div className={styles.cardsWrapper}>
        {cardsMock.map((card) => (
          <ProjectCard
            key={card.id}
            siteName={card.siteName}
            imgLink={card.imgLink}
          />
        ))}
      </div>
    </PageLayout>
  );
};

export { MyProjects };
