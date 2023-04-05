import img from 'src/assets/img/project-mock-image.jpg';

import { Image, Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { configureString } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type ProjectGetAllItemResponseDto } from '~/packages/projects/projects.js';

import styles from './styles.module.scss';

type Properties = {
  project: ProjectGetAllItemResponseDto;
};

const ProjectCard: React.FC<Properties> = ({ project }: Properties) => {
  const { id, name, avatarUrl } = project;

  return (
    <div className={styles['card']}>
      <Image className={styles['card-image']} src={avatarUrl ?? img} alt="" />
      <div className={styles['card-description']}>
        <Link
          to={configureString<ValueOf<typeof AppRoute>>(
            AppRoute.PROJECTS_$PROJECT_ID_SITES,
            {
              projectId: id,
            },
          )}
        >
          <h2>{name}</h2>
        </Link>
      </div>
    </div>
  );
};

export { ProjectCard };
