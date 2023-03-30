import { Input } from '~/libs/components/input/input.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type SiteNameDto,
  siteNameValidationSchema,
} from '~/packages/sites/sites.js';

import { DEFAULT_PROJECT_NAME } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: SiteNameDto) => void;
};

const ProjectName: React.FC<Properties> = ({ onSubmit }: Properties) => {
  const { control, errors, handleSubmit } = useAppForm<SiteNameDto>({
    defaultValues: DEFAULT_PROJECT_NAME,
    mode: 'onChange',
    validationSchema: siteNameValidationSchema,
  });

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <div className={styles['project-name']}>
      <h2 className={styles['project-name-title']}>
        What is your project&apos;s name?
      </h2>
      <div className={styles['project-name-subtitle']}>
        Don&apos;t have one? Just enter your name.
      </div>
      <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
        <Input
          type="text"
          label=""
          placeholder="Enter your project name"
          name="siteName"
          control={control}
          errors={errors}
        />
      </form>
    </div>
  );
};

export { ProjectName };
