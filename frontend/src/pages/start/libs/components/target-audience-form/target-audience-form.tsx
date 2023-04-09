import { Button, Select } from '~/libs/components/components.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type SiteCreateStepTarget,
  siteCreateStepTargetValidationSchema,
} from '~/packages/sites/sites.js';

import { DEFAULT_STEP_TARGET_VALUE, OPTIONS } from './libs/constants.js';
import styles from './style.module.scss';

type Properties = {
  onSubmit: (sitePayload: Partial<SiteCreateStepTarget>) => void;
};

const TargetAudienceForm: React.FC<Properties> = ({
  onSubmit,
}: Properties): JSX.Element => {
  const { control, errors, handleSubmit } = useAppForm<SiteCreateStepTarget>({
    defaultValues: DEFAULT_STEP_TARGET_VALUE,
    mode: 'onSubmit',
    validationSchema: siteCreateStepTargetValidationSchema,
  });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <>
      <h2 className={styles['title']}>What is your Target audience?</h2>
      <div className={styles['subtitle']}>Choose the age</div>
      <form className={styles['form']} onSubmit={handleFormSubmit}>
        <Select
          control={control}
          name="targetAudience"
          options={OPTIONS}
          label="Select your industry"
          placeholder="Please select your industry"
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

export { TargetAudienceForm };
