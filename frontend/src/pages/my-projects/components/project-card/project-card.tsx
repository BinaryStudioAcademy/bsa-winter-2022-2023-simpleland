import { Link } from '~/libs/components/link/link.js';
import { ProjectsDetailsRoute } from '~/libs/enums/app-route.enum.js';

import styles from './styles.module.scss';

type Properties = {
  key: number;
  siteName: string;
  id: number;
};

const ProjectCard: React.FC<Properties> = ({ siteName, id }: Properties) => {
  return (
    <div className={styles['card']}>
      <img className={styles['card-image']} src="imgLink" alt="" />
      <div className={styles['card-description']}>
        <Link
          to={`${ProjectsDetailsRoute.root}/${id}${ProjectsDetailsRoute.sites}`}
        >
          <h3>{siteName}</h3>
        </Link>
      </div>
    </div>
  );
};

export { ProjectCard };
