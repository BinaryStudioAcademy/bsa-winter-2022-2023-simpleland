import { IconButton, Input } from '~/libs/components/components.js';
import { useAppForm, useCallback, useState } from '~/libs/hooks/hooks.js';
import { type SiteHeaderContent } from '~/packages/sections/sections.js';

import styles from './styles.module.scss';

type Properties = {
  content: SiteHeaderContent;
  onUpdate: (payload: { logo: string; phone: string }) => void;
};

const Header: React.FC<Properties> = ({
  content: { logo, phone },
  onUpdate,
}: Properties) => {
  const { control, errors, handleSubmit } = useAppForm({
    defaultValues: { logo, phone },
  });

  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleMouseEnter = useCallback((): void => {
    setShowOverlay(true);
  }, [setShowOverlay]);

  const handleMouseLeave = useCallback((): void => {
    setShowOverlay(false);
  }, [setShowOverlay]);

  const handleEditing = useCallback((): void => {
    setIsEditing(true);
  }, [setIsEditing]);

  const handleHeaderUpdate = useCallback(() => {
    void handleSubmit(onUpdate)();
  }, [handleSubmit, onUpdate]);

  const shouldShowOverlay = showOverlay && !isEditing;

  return (
    <div
      className={styles['header']}
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
              onClick={handleEditing}
            />
          </div>
        </div>
      )}
      <div className={styles['header-container']}>
        <div className={styles['header-logo']}>
          {isEditing ? (
            <Input
              control={control}
              errors={errors}
              name="logo"
              label="Header logo"
              isLabelVisuallyHidden
              className={styles['edit-input']}
              onBlur={handleHeaderUpdate}
            />
          ) : (
            logo
          )}
        </div>
        <div className={styles['header-phone']}>
          {isEditing ? (
            <Input
              control={control}
              errors={errors}
              name="phone"
              label="Phone"
              isLabelVisuallyHidden
              className={styles['edit-input']}
              onBlur={handleHeaderUpdate}
            />
          ) : (
            phone
          )}
        </div>
      </div>
    </div>
  );
};

export { Header };
