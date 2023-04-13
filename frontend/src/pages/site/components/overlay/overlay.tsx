import { IconButton } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  onEdit: () => void;
  onUpdate: () => void;
  isEditing: boolean;
  children: React.ReactNode;
  isOwner: boolean;
  isSubscribed: boolean;
};

const Overlay: React.FC<Properties> = ({
  onEdit,
  onUpdate,
  isEditing,
  children,
  isOwner,
  isSubscribed,
}: Properties) => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false);

  const overlayReference = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback((): void => {
    setShowOverlay(true);
  }, [setShowOverlay]);

  const handleMouseLeave = useCallback((): void => {
    setShowOverlay(false);
  }, [setShowOverlay]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        isEditing &&
        overlayReference.current &&
        !overlayReference.current.contains(event.target as Node)
      ) {
        onUpdate();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing, overlayReference, onUpdate]);

  const shouldShowOverlay = showOverlay && !isEditing && isOwner;

  return (
    <div
      className={styles['overlay-wrapper']}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={overlayReference}
    >
      {shouldShowOverlay && (
        <div className={styles['overlay']}>
          <div className={styles['overlay-buttons']}>
            {isSubscribed ? (
              <IconButton
                label="Edit"
                icon="pencil"
                className={styles['overlay-button']}
                onClick={onEdit}
              />
            ) : (
              <IconButton
                label="Edit"
                icon="pencil"
                className={getValidClassNames(
                  styles['overlay-button'],
                  styles['overlay-button-gray'],
                )}
                tooltip="Subscription only feature"
              />
            )}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export { Overlay };
