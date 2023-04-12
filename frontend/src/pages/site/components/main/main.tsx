import { Image, Input } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppForm } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type SectionType,
  type SiteMainContent,
  type SiteMainUpdateContentDto,
} from '~/packages/sections/sections.js';
import { siteMainUpdateContentValidationSchema } from '~/packages/sections/sections.js';

import { useSectionUpdate } from '../../libs/hooks/hooks.js';
import { Overlay } from '../overlay/overlay.js';
import styles from './styles.module.scss';

type Properties = {
  content: SiteMainContent;
  type: ValueOf<typeof SectionType>;
  onUpdate: (payload: unknown) => void;
};

const Main: React.FC<Properties> = ({
  content: { description, title, picture },
  type,
  onUpdate,
}: Properties) => {
  const { control, errors, handleSubmit, handleReset } =
    useAppForm<SiteMainUpdateContentDto>({
      defaultValues: { title, description },
      validationSchema: siteMainUpdateContentValidationSchema,
    });

  const { isEditing, handleEditingStart, handleSectionUpdate } =
    useSectionUpdate<SiteMainUpdateContentDto>({
      onUpdate,
      handleReset,
      handleSubmit,
    });

  return (
    <div id={type} className={styles['main']}>
      <div className={styles['main-content']}>
        <div className={styles['main-content-left']} />
        <div className={styles['main-content-right']}>
          <Overlay onEdit={handleEditingStart} isEditing={isEditing}>
            <div className={styles['main-title']}>
              {isEditing ? (
                <Input
                  control={control}
                  errors={errors}
                  name="title"
                  label="Main section title"
                  isLabelVisuallyHidden
                  onBlur={handleSectionUpdate}
                  isInline
                  rows={3}
                />
              ) : (
                title
              )}
            </div>
            <div className={styles['main-description']}>
              {isEditing ? (
                <Input
                  control={control}
                  errors={errors}
                  name="description"
                  label="Main section description"
                  isLabelVisuallyHidden
                  className={getValidClassNames(
                    styles['edit-main-section-content'],
                  )}
                  onBlur={handleSectionUpdate}
                  rows={10}
                  isInline
                />
              ) : (
                description
              )}
            </div>
          </Overlay>
          <button className={styles['main-button']}>Get started</button>
        </div>
      </div>

      <Image
        src={picture}
        alt="SimpleLand"
        className={styles['main-picture']}
      />
    </div>
  );
};

export { Main };
