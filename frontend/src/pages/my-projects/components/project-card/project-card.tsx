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
      <div className={styles['image-wrapper']}>
        <Image
          className={styles['card-image']}
          src={avatarUrl ?? img}
          alt="project"
        />
        <IconButton
          icon="pencil"
          label="edit-project"
          className={styles['edit-project-icon']}
          onClick={handleEdit}
        />
      </div>

      <div className={styles['card-description']}>
        <Link
          to={configureString<ValueOf<typeof AppRoute>>(
            AppRoute.PROJECTS_$PROJECT_ID_SITES,
            {
              projectId: id,
            },
          )}
          className={styles['title-wrapper']}
        >
          <h2 className={styles['title']}>{name}</h2>
          <IconButton
            icon="arrowRight"
            label="Go to the project sites"
            className={styles['yellow-icon']}
          />
        </Link>
        <p className={styles['card-category']}>
          {projectCategoryToReadable[category]}
        </p>
      </div>
    </div>
  );
};

export { ProjectCard };
