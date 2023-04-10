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
import { Overlay } from '~/pages/site/components/overlay/overlay.js';
import { useSectionUpdate } from '~/pages/site/libs/hooks/hooks.js';

import { Textarea } from './components/components.js';
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
    <div id={type} className={styles['about']}>
      <Overlay onEdit={handleEditingStart} isEditing={isEditing}>
        <div className={styles['about-container']}>
          <div className={styles['about-content']}>
            <div className={styles['about-content-left']} />
            <div className={styles['about-title']}>
              {isEditing ? (
                <Input
                  control={control}
                  errors={errors}
                  name="title"
                  label="About section title"
                  isLabelVisuallyHidden
                  className={getValidClassNames(
                    styles['edit-about-section-content'],
                  )}
                  onBlur={handleSectionUpdate}
                />
              ) : (
                title
              )}
            </div>
            <div className={styles['about-content-right']}>
              <div className={styles['about-description']}>
                {isEditing ? (
                  <Textarea
                    control={control}
                    errors={errors}
                    name="description"
                    className={getValidClassNames(
                      styles['edit-about-section-content'],
                    )}
                    onBlur={handleSectionUpdate}
                  />
                ) : (
                  description
                )}
              </div>
            </div>
          </div>
        </div>
      </Overlay>
    </div>
  );
};

export { About };
