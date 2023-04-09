import { Button, Select } from '~/libs/components/components.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type SiteCreateStepTone,
  siteCreateStepToneValidationSchema,
} from '~/packages/sites/sites.js';

import { DEFAULT_FORM_PAYLOAD, OPTIONS } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (sitePayload: Partial<SiteCreateStepTone>) => void;
};

const VoiceToneForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
  const { control, errors, handleSubmit } = useAppForm({
    defaultValues: DEFAULT_FORM_PAYLOAD,
    validationSchema: siteCreateStepToneValidationSchema,
  });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <>
      <h2 className={styles['title']}>What is your tone of voice?</h2>
      <div className={styles['subtitle']}>Choose the type</div>
      <form className={styles['form']} onSubmit={handleFormSubmit}>
        <Select
          name="tone"
          placeholder="Please select your tone"
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
