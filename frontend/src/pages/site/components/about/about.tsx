import { Input } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppForm } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type SectionType,
  type SiteAboutContent,
  type SiteAboutUpdateContentDto,
} from '~/packages/sections/sections.js';
import { siteAboutUpdateContentValidationSchema } from '~/packages/sections/sections.js';

import { useSectionUpdate } from '../../libs/hooks/hooks.js';
import { Overlay } from '../overlay/overlay.js';
import styles from './styles.module.scss';

type Properties = {
  content: SiteAboutContent;
  type: ValueOf<typeof SectionType>;
  onUpdate: (payload: unknown) => void;
};

const About: React.FC<Properties> = ({
  content: { description, title },
  type,
  onUpdate,
}: Properties) => {
  const { control, errors, handleSubmit, handleReset } =
    useAppForm<SiteAboutUpdateContentDto>({
      defaultValues: { title, description },
      validationSchema: siteAboutUpdateContentValidationSchema,
    });

  const { isEditing, handleEditingStart, handleSectionUpdate } =
    useSectionUpdate<SiteAboutUpdateContentDto>({
      onUpdate,
      handleReset,
      handleSubmit,
    });

  return (
    <Overlay onEdit={handleEditingStart} isEditing={isEditing}>
      <div id={type} className={styles['about']}>
        <div className={styles['about-container']}>
          <div className={styles['about-title']}>
            {isEditing ? (
              <Input
                control={control}
                errors={errors}
                name="title"
                label="About section title"
                isLabelVisuallyHidden
                onBlur={handleSectionUpdate}
                isInline
                rows={3}
              />
            ) : (
              title
            )}
          </div>
          <div className={styles['about-description']}>
            {isEditing ? (
              <Input
                control={control}
                errors={errors}
                name="description"
                label="About section description"
                isLabelVisuallyHidden
                className={getValidClassNames(
                  styles['edit-about-section-content'],
                )}
                onBlur={handleSectionUpdate}
                rows={10}
                isInline
              />
            ) : (
              description
            )}
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export { About };
