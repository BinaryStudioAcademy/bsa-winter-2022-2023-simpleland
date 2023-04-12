import { Input } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppForm } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type SectionType,
  type SiteHeaderContent,
  type SiteHeaderUpdateContentDto,
  siteHeaderUpdateContentValidationSchema,
} from '~/packages/sections/sections.js';
import { Overlay } from '~/pages/site/components/overlay/overlay.js';
import { useSectionUpdate } from '~/pages/site/libs/hooks/hooks.js';

import styles from './styles.module.scss';

type Properties = {
  content: SiteHeaderContent;
  onUpdate: (payload: unknown) => void;
  navigationSections: readonly ValueOf<typeof SectionType>[];
};

const Header: React.FC<Properties> = ({
  content: { logo, phone },
  onUpdate,
  navigationSections,
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
      <Overlay
        onEdit={handleEditingStart}
        isEditing={isEditing}
        onUpdate={handleSectionUpdate}
      >
        <div className={styles['header-container']}>
          <div className={styles['header-navigation']}>
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
                  isInline
                />
              ) : (
                logo
              )}
            </div>

            <div className={styles['navigation-links']}>
              {navigationSections.map((section) => (
                <a
                  className={styles['navigation-link']}
                  href={`#${section}`}
                  key={section}
                >
                  {section}
                </a>
              ))}
            </div>
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
                isInline
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
