import { type ProjectGetAllItemResponseDto } from 'shared/build';

import styles from './styles.module.scss';

type Properties = {
  project: ProjectGetAllItemResponseDto;
};

const ProjectCard: React.FC<Properties> = ({ project }: Properties) => {
  return (
    <div className={styles['card']}>
      <img className={styles['card-image']} src="imgLink" alt="" />
      <div className={styles['card-description']}>
        <h3>{project.name}</h3>
      </div>
    </div>
  );
};

export { ProjectCard };
