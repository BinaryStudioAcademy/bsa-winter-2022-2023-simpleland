import { type Control, type FieldErrors } from 'react-hook-form';

import { Input } from '~/libs/components/components.js';
import { type SiteFeedbackUpdateContentDto } from '~/packages/sections/sections.js';

import styles from './styles.module.scss';

type Properties = {
  isEditing: boolean;
  control: Control<SiteFeedbackUpdateContentDto>;
  errors: FieldErrors<SiteFeedbackUpdateContentDto>;
  handleSectionUpdate: () => void;
  cardIndex: number;
  card: {
    photo: string;
    name: string;
    profession: string;
    feedback: string;
  };
};

const FeedbackCard: React.FC<Properties> = ({
  isEditing,
  cardIndex,
  control,
  errors,
  handleSectionUpdate,
  card: { name, photo, profession, feedback },
}: Properties) => {
  return (
    <div className={styles['feedback-card']} key={name}>
      <div className={styles['feedback-card-heading']}>
        <img
          src={photo}
          alt="portrait"
          className={styles['feedback-card-photo']}
        />
        <div className={styles['feedback-card-person-info']}>
          <div className={styles['feedback-card-person-name']}>
            {isEditing ? (
              <>
                <Input
                  control={control}
                  errors={errors}
                  name={`cards.${cardIndex}.name`}
                  label="Feedback author name"
                  isLabelVisuallyHidden
                  className={styles['edit-feedback-section-content']}
                  onBlur={handleSectionUpdate}
                />
              </>
            ) : (
              <>{name}</>
            )}
          </div>
          <div className={styles['feedback-card-person-profession']}>
            {isEditing ? (
              <>
                <Input
                  control={control}
                  errors={errors}
                  name={`cards.${cardIndex}.profession`}
                  label="Feedback author profession"
                  isLabelVisuallyHidden
                  className={styles['edit-feedback-section-content']}
                  onBlur={handleSectionUpdate}
                />
              </>
            ) : (
              <>{profession}</>
            )}
          </div>
        </div>
      </div>
      <div className={styles['feedback-card-text']}>
        {isEditing ? (
          <>
            <Input
              control={control}
              errors={errors}
              name={`cards.${cardIndex}.feedback`}
              label="Feedback author name"
              isLabelVisuallyHidden
              rows={5}
              className={styles['edit-feedback-section']}
              onBlur={handleSectionUpdate}
            />
          </>
        ) : (
          <>{feedback}</>
        )}
      </div>
    </div>
  );
};

export { FeedbackCard };
