import { Button, Input } from '~/libs/components/components.js';
import { useAppForm, useCallback, useState } from '~/libs/hooks/hooks.js';
import {
  type SiteCreateRequestDto,
  type SiteCreateStepIndustry,
  siteCreateStepIndustryValidationSchema,
} from '~/packages/sites/sites.js';

import styles from './styles.module.scss';

type Properties = {
  onSubmit: (sitePayload: Partial<SiteCreateRequestDto>) => void;
  siteInfo: SiteCreateRequestDto;
};

const IndustryForm: React.FC<Properties> = ({
  onSubmit,
  siteInfo,
}: Properties) => {
  const [industry] = useState(siteInfo.industry || '');
  const { control, errors, handleSubmit } = useAppForm<SiteCreateStepIndustry>({
    defaultValues: { industry: siteInfo.industry || '' },
    validationSchema: siteCreateStepIndustryValidationSchema,
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
      <h2 className={styles['title']}>What is your industry?</h2>
      <div className={styles['subtitle']}>Just enter your it.</div>
      <form className={styles['form']} onSubmit={handleFormSubmit}>
        <Input
          type="text"
          label="Project industry"
          placeholder={industry || 'Industry'}
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
