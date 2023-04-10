import img from 'src/assets/img/project-mock-image.jpg';

import { IconButton, Image, Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { configureString } from '~/libs/helpers/helpers.js';
import { useCallback } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type ProjectGetAllItemResponseDto } from '~/packages/projects/projects.js';

import { projectCategoryToReadable } from '../../libs/maps/maps.js';
import styles from './styles.module.scss';

type Properties = {
  project: ProjectGetAllItemResponseDto;
  onEdit: (project: ProjectGetAllItemResponseDto) => void;
};

const ProjectCard: React.FC<Properties> = ({ project, onEdit }: Properties) => {
  const { id, name, avatarUrl, category } = project;

  const handleEdit = useCallback(() => {
    onEdit(project);
  }, [onEdit, project]);

  return (
    <div className={styles['card']}>
      <Image
        className={styles['card-image']}
        src={avatarUrl ?? img}
        alt="project"
      />
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
          <p>{projectCategoryToReadable[category]}</p>
        </Link>
      </div>
      <IconButton
        icon="pencil"
        label="edit-project"
        className={styles['edit-project-icon']}
        onClick={handleEdit}
      />
    </div>
  );
};

export { ProjectCard };
