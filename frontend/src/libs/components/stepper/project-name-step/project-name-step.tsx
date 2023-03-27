import { joiResolver } from '@hookform/resolvers/joi';
import { useForm } from 'react-hook-form';

import { Input } from '~/libs/components/components.js';
import { type ProjectNameDto } from '~/packages/new-project-create/new-project-create.js';
import { ProjectNameValidationSchema } from '~/packages/new-project-create/new-project-create.js';

import styles from './styles.module.scss';

const DEFAULT_PROJECT_NAME: ProjectNameDto = {
  projectName: '',
};

type Properties = {
  className?: string | undefined;
};

type FormValues = {
  projectName: string;
};

const ProjectName: React.FC<Properties> = () => {
  const {
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: DEFAULT_PROJECT_NAME,
    mode: 'onChange',
    resolver: joiResolver(ProjectNameValidationSchema),
  });

  return (
    <div className={styles['project-name']}>
      <h2 className={styles['project-name-title']}>
        What is your project&apos;s name?
      </h2>
      <div className={styles['project-name-subtitle']}>
        Don&apos;t have one? Just enter your name.
      </div>
      <form className={styles['form-wrapper']}>
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
