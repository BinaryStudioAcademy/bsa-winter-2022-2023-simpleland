import { Carousel, Input } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppForm } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type SectionType,
  type SiteFeedbackContent,
  type SiteFeedbackUpdateContentDto,
  siteFeedbackUpdateContentValidationSchema,
} from '~/packages/sections/sections.js';
import { Overlay } from '~/pages/site/components/overlay/overlay.js';

import { useSectionUpdate } from '../../libs/hooks/hooks.js';
import { FeedbackCard } from './components/components.js';
import styles from './styles.module.scss';

type Properties = {
  content: SiteFeedbackContent;
  type: ValueOf<typeof SectionType>;
  onUpdate: (payload: unknown) => void;
  isOwner: boolean;
  isSubscribed: boolean;
};

const Feedback: React.FC<Properties> = ({
  content: { title, cards },
  type,
  onUpdate,
  isOwner,
  isSubscribed,
}: Properties) => {
  const [titleFirstWord, ...titleRest] = title.split(' ');

  const { control, errors, handleSubmit, handleReset } =
    useAppForm<SiteFeedbackUpdateContentDto>({
      defaultValues: { title, cards },
      validationSchema: siteFeedbackUpdateContentValidationSchema,
    });

  const { isEditing, handleEditingStart, handleSectionUpdate } =
    useSectionUpdate<SiteFeedbackUpdateContentDto>({
      onUpdate,
      handleReset,
      handleSubmit,
    });

  return (
    <Overlay
      onEdit={handleEditingStart}
      onUpdate={handleSectionUpdate}
      isEditing={isEditing}
      isOwner={isOwner}
      isSubscribed={isSubscribed}
    >
      <div id={type} className={styles['feedback']}>
        <div className={styles['feedback-container']}>
          <div className={styles['title']}>
            {isEditing ? (
              <Input
                control={control}
                errors={errors}
                name="title"
                label="Feedback section title"
                isLabelVisuallyHidden
                className={getValidClassNames(
                  styles['edit-feedback-section-content'],
                )}
                isInline
              />
            ) : (
              <>
                {titleFirstWord}
                &nbsp;
                <span className={styles['title-brown']}>
                  {titleRest.join(' ')}
                </span>
              </>
            )}
          </div>
          <div className={styles['feedback-carousel']}>
            <Carousel slidesToShow={2} slidesToScroll={2} cellSpacing={28}>
              {cards.map((card, index) => (
                <FeedbackCard
                  isEditing={isEditing}
                  card={card}
                  cardIndex={index}
                  key={card.photo}
                  control={control}
                  errors={errors}
                />
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </Overlay>
  );
};

export { Feedback };
