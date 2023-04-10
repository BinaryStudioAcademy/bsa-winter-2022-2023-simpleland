import { Button, Select } from '~/libs/components/components.js';
import { useAppForm, useCallback, useState } from '~/libs/hooks/hooks.js';
import {
  type SiteCreateRequestDto,
  type SiteCreateStepTone,
  siteCreateStepToneValidationSchema,
} from '~/packages/sites/sites.js';

import { OPTIONS } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (sitePayload: Partial<SiteCreateStepTone>) => void;
  siteInfo: SiteCreateRequestDto;
};

const VoiceToneForm: React.FC<Properties> = ({
  onSubmit,
  siteInfo,
}: Properties) => {
  const [tone] = useState(siteInfo.tone || '');
  const { control, errors, handleSubmit } = useAppForm({
    defaultValues: { tone: siteInfo.tone || '' },
    validationSchema: siteCreateStepToneValidationSchema,
  });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit((data) => {
        onSubmit({ ...siteInfo, ...data });
      })(event_);
    },
    [handleSubmit, onSubmit, siteInfo],
  );

  return (
    <>
      <h2 className={styles['title']}>What is your tone of voice?</h2>
      <div className={styles['subtitle']}>Choose the type</div>
      <form className={styles['form']} onSubmit={handleFormSubmit}>
        <Select
          name="tone"
          placeholder={tone || 'Please select your tone'}
          label="Select your tone"
          options={OPTIONS}
          control={control}
          errors={errors}
          isLabelVisuallyHidden
        />
        <Button
          label="Go next"
          style="secondary"
          size="small"
          type="submit"
          className={styles['button']}
        />
      </form>
    </>
  );
};

export { VoiceToneForm };
