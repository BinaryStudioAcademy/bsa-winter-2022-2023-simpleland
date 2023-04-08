import { Input } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppForm, useSectionUpdate } from '~/libs/hooks/hooks.js';
import { siteHeaderUpdateContentValidationSchema } from '~/packages/sections/sections.js';
import {
  type SiteHeaderContent,
  type SiteHeaderUpdateContentDto,
} from '~/packages/sections/sections.js';
import { Overlay } from '~/pages/site/components/overlay/overlay.js';

import styles from './styles.module.scss';

type Properties = {
  content: SiteHeaderContent;
  onUpdate: (payload: unknown) => void;
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

  const { isEditing, handleEditingStart, handleSectionUpdate } =
    useSectionUpdate<SiteHeaderUpdateContentDto>({
      onUpdate,
      handleReset,
      handleSubmit,
    });

  return (
    <div className={styles['header']}>
      <Overlay onEdit={handleEditingStart} isEditing={isEditing}>
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
                onBlur={handleSectionUpdate}
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
                onBlur={handleSectionUpdate}
              />
            ) : (
              phone
            )}
          </div>
        </div>
      </Overlay>
    </div>
  );
};

export { Header };
