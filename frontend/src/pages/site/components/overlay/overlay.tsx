import { IconButton } from '~/libs/components/components.js';

import styles from './styles.module.scss';

type Properties = {
  onEdit: () => void;
};

const Overlay: React.FC<Properties> = ({ onEdit }: Properties) => {
  return (
    <div className={styles['overlay']}>
      <div className={styles['overlay-buttons']}>
        <IconButton
          label="Edit"
          icon="pencil"
          className={styles['overlay-button']}
          onClick={onEdit}
        />
      </div>
    </div>
  );
};

export { Overlay };
