import { type Control, type FieldErrors } from 'react-hook-form';

import { Input } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type SiteServiceUpdateContentDto } from '~/packages/sections/sections.js';

import styles from './styles.module.scss';

type Properties = {
  card: {
    picture: string;
    title: string;
    description: string;
  };
  control: Control<SiteServiceUpdateContentDto>;
  errors: FieldErrors<SiteServiceUpdateContentDto>;
  cardIndex: number;
  isEditing: boolean;
  onSectionUpdate: () => void;
};

const ServiceCard: React.FC<Properties> = ({
  card: { title, picture, description },
  control,
  errors,
  cardIndex,
  isEditing,
  onSectionUpdate,
}: Properties) => {
  return (
    <div className={styles['service-card']}>
      <div className={styles['service-card-icon-wrapper']}>
        <img src={picture} alt="icon" className={styles['service-card-icon']} />
      </div>
      <div className={styles['service-card-text-wrapper']}>
        <div className={styles['service-card-title']}>
          {isEditing ? (
            <Input
              control={control}
              errors={errors}
              name={`cards.${cardIndex}.title`}
              label="Service title"
              isLabelVisuallyHidden
              className={getValidClassNames(
                styles['edit-service-card'],
                styles['service-card-title'],
              )}
              onBlur={onSectionUpdate}
            />
          ) : (
            title
          )}
        </div>
        <div className={styles['service-card-description']}>
          {isEditing ? (
            <Input
              control={control}
              errors={errors}
              name={`cards.${cardIndex}.description`}
              label="Service description"
              isLabelVisuallyHidden
              className={getValidClassNames(
                styles['edit-service-card'],
                styles['service-card-description'],
              )}
              rows={7}
              onBlur={onSectionUpdate}
            />
          ) : (
            description
          )}
        </div>
      </div>
    </div>
  );
};

export { ServiceCard };
