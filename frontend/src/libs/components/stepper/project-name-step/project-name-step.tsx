import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';

import { Input } from '~/libs/components/input/input.js';
import { useCallback } from '~/libs/hooks/hooks.js';
import { ProjectNameValidationSchema } from '~/packages/new-project-create/new-project-create.js';

import { DEFAULT_PROJECT_NAME } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  onSubmit: (data: FormValues) => void;
};

type FormValues = {
  projectName: string;
};

const ProjectName: React.FC<Properties> = ({ onSubmit }: Properties) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>({
    defaultValues: DEFAULT_PROJECT_NAME,
    mode: 'onChange',
    resolver: joiResolver(ProjectNameValidationSchema),
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
          name="projectName"
          control={control}
          errors={errors}
        />
      </form>
    </div>
  );
};

export { ProjectName };
