import { Input } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppForm } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type SectionType,
  type SiteServiceContent,
  type SiteServiceUpdateContentDto,
} from '~/packages/sections/sections.js';
import { siteServiceUpdateContentValidationSchema } from '~/packages/sections/sections.js';
import { Overlay } from '~/pages/site/components/overlay/overlay.js';
import { useSectionUpdate } from '~/pages/site/libs/hooks/hooks.js';

import { ServiceCard } from './components/components.js';
import styles from './styles.module.scss';

type Properties = {
  content: SiteServiceContent;
  type: ValueOf<typeof SectionType>;
  onUpdate: (payload: unknown) => void;
};

const Service: React.FC<Properties> = ({
  content: { title, cards },
  type,
  onUpdate,
}: Properties) => {
  const { control, errors, handleSubmit, handleReset } =
    useAppForm<SiteServiceUpdateContentDto>({
      defaultValues: { title, cards },
      validationSchema: siteServiceUpdateContentValidationSchema,
    });

  const { isEditing, handleEditingStart, handleSectionUpdate } =
    useSectionUpdate<SiteServiceUpdateContentDto>({
      handleSubmit,
      handleReset,
      onUpdate,
    });

  return (
    <Overlay isEditing={isEditing} onEdit={handleEditingStart}>
      <div id={type} className={styles['service']}>
        <div className={styles['service-container']}>
          <div className={styles['title']}>
            {isEditing ? (
              <Input
                control={control}
                errors={errors}
                name="title"
                label="Service section title"
                isLabelVisuallyHidden
                className={getValidClassNames(
                  styles['edit-title'],
                  styles['title'],
                )}
                onBlur={handleSectionUpdate}
                isInline
              />
            ) : (
              title
            )}
          </div>
          <div className={styles['service-cards']}>
            {cards.map((card, index) => (
              <ServiceCard
                card={card}
                key={card.picture}
                control={control}
                errors={errors}
                cardIndex={index}
                isEditing={isEditing}
                onSectionUpdate={handleSectionUpdate}
              />
            ))}
          </div>
          <div className={styles['service-button-wrapper']}>
            <button className={styles['service-button']}>
              FREE CONSULTATION
            </button>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export { Service };
