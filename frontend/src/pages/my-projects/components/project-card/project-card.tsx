import { Link } from '~/libs/components/link/link.js';
import { AppRoute } from '~/libs/enums/app-route.enum.js';
import { configureString } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type ProjectGetAllItemResponseDto } from '~/packages/projects/projects.js';

import styles from './styles.module.scss';

type Properties = {
  project: ProjectGetAllItemResponseDto;
};

const ProjectCard: React.FC<Properties> = ({ project }: Properties) => {
  const { id, name } = project;

  return (
    <div className={styles['card']}>
      <img className={styles['card-image']} src="imgLink" alt="" />
      <div className={styles['card-description']}>
        <Link
          to={
            configureString(AppRoute.PROJECTS_$PROJECT_ID_SITES, {
              projectId: id.toString(),
            }) as ValueOf<typeof AppRoute>
          }
        >
          <h3>{name}</h3>
        </Link>
      </div>
    </div>
  );
};

export { ProjectCard };
