import { IconButton } from '~/libs/components/components.js';
import { useCallback, useState } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  onEdit: () => void;
  isEditing: boolean;
  children: React.ReactNode;
};

const Overlay: React.FC<Properties> = ({
  onEdit,
  isEditing,
  children,
}: Properties) => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const handleMouseEnter = useCallback((): void => {
    setShowOverlay(true);
  }, [setShowOverlay]);

  const handleMouseLeave = useCallback((): void => {
    setShowOverlay(false);
  }, [setShowOverlay]);

  const shouldShowOverlay = showOverlay && !isEditing;

  return (
    <div
      className={styles['overlay-wrapper']}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {shouldShowOverlay && (
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
      )}
      {children}
    </div>
  );
};

export { Overlay };
