import { Button, Input } from '~/libs/components/components.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type SiteCreateRequestDto,
  type SiteCreateStepIndustry,
  siteCreateStepIndustryValidationSchema,
} from '~/packages/sites/sites.js';
import { STEPS_FORM_SUBMIT_ID } from '~/pages/start/libs/constants.js';

import { DEFAULT_STEP_PAYLOAD } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (sitePayload: Partial<SiteCreateRequestDto>) => void;
  siteInfo: SiteCreateRequestDto;
};

const IndustryForm: React.FC<Properties> = ({
  onSubmit,
  siteInfo,
}: Properties) => {
  const { control, errors, handleSubmit } = useAppForm<SiteCreateStepIndustry>({
    defaultValues: { ...DEFAULT_STEP_PAYLOAD, industry: siteInfo.industry },
    validationSchema: siteCreateStepIndustryValidationSchema,
  });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <>
      <h2 className={styles['title']}>What is your industry?</h2>
      <div className={styles['subtitle']}>Just enter your it.</div>
      <form
        id={STEPS_FORM_SUBMIT_ID}
        className={styles['form']}
        onSubmit={handleFormSubmit}
      >
        <Input
          type="text"
          label="Project industry"
          placeholder="Industry"
          name="industry"
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

export { IndustryForm };
