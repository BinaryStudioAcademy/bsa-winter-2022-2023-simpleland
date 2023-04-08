import { Button, Input } from '~/libs/components/components.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type SiteCreateDto,
  type SiteCreateStepName,
  siteCreateStepNameValidationSchema,
} from '~/packages/sites/sites.js';

import { DEFAULT_STEP_PAYLOAD } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (sitePayload: Partial<SiteCreateDto>) => void;
};

const SiteNameForm: React.FC<Properties> = ({ onSubmit }: Properties) => {
  const { control, errors, handleSubmit } = useAppForm<SiteCreateStepName>({
    defaultValues: DEFAULT_STEP_PAYLOAD,
    validationSchema: siteCreateStepNameValidationSchema,
  });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <>
      <h2 className={styles['title']}>What is your site&apos;s name?</h2>
      <div className={styles['subtitle']}>
        Don&apos;t have one? Just enter your name.
      </div>
      <form className={styles['form']} onSubmit={handleFormSubmit}>
        <Input
          type="text"
          label="Project name"
          placeholder="Name"
          name="name"
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

export { SiteNameForm };
