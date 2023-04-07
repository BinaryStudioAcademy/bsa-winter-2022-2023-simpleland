import { Input } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppForm, useCallback, useState } from '~/libs/hooks/hooks.js';
import { siteHeaderUpdateContentValidationSchema } from '~/packages/sections/sections.js';
import {
  type SiteHeaderContent,
  type SiteHeaderUpdateContentDto,
} from '~/packages/sections/sections.js';
import { Overlay } from '~/pages/site/components/overlay/overlay.js';

import styles from './styles.module.scss';

type Properties = {
  content: SiteHeaderContent;
  onUpdate: (payload: { logo: string; phone: string }) => void;
};

const Header: React.FC<Properties> = ({
  content: { logo, phone },
  onUpdate,
}: Properties) => {
  const { control, errors, handleSubmit, handleReset } =
    useAppForm<SiteHeaderUpdateContentDto>({
      defaultValues: { logo, phone },
      validationSchema: siteHeaderUpdateContentValidationSchema,
    });

  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const handleMouseEnter = useCallback((): void => {
    setShowOverlay(true);
  }, [setShowOverlay]);

  const handleMouseLeave = useCallback((): void => {
    setShowOverlay(false);
  }, [setShowOverlay]);

  const handleEdit = useCallback((): void => {
    setIsEditing(true);
  }, [setIsEditing]);

  const handleHeaderUpdate = useCallback(() => {
    void handleSubmit(onUpdate, () => {
      handleReset();
    })();
    setIsEditing(false);
  }, [handleSubmit, onUpdate, handleReset]);

  const shouldShowOverlay = showOverlay && !isEditing;

  return (
    <div
      className={styles['header']}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {shouldShowOverlay && <Overlay onEdit={handleEdit} />}
      <div className={styles['header-container']}>
        <div className={styles['header-logo']}>
          {isEditing ? (
            <Input
              control={control}
              errors={errors}
              name="logo"
              label="Header logo"
              isLabelVisuallyHidden
              className={getValidClassNames(
                styles['edit-input'],
                styles['header-logo'],
              )}
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
              className={getValidClassNames(
                styles['edit-input'],
                styles['header-phone'],
              )}
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
