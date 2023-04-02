import img from 'src/assets/img/project-mock-image.jpg';

import { Image, Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { configureString } from '~/libs/helpers/helpers.js';
import { useCallback } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type ProjectGetAllItemResponseDto } from '~/packages/projects/projects.js';

import styles from './styles.module.scss';

type Properties = {
  project: ProjectGetAllItemResponseDto;
  onUpdateProjectImage: (event: React.ChangeEvent<HTMLInputElement>, id: number) => void;
};

const ProjectCard: React.FC<Properties> = ({
  project,
  onUpdateProjectImage,
}: Properties) => {
  const { id, name, imageUrl } = project;

  const handleFileChoose = useCallback((event_: React.ChangeEvent<HTMLInputElement>) => onUpdateProjectImage(event_, id),[onUpdateProjectImage,id]);

  return (
    <div className={styles['card']}>
      <label className={styles['card-image-wrapper']}>
        <Image className={styles['card-image']} src={imageUrl ?? img} alt="" />
        <input
          type="file"
          onChange={handleFileChoose}
          className="visually-hidden"
        />
      </label>
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
