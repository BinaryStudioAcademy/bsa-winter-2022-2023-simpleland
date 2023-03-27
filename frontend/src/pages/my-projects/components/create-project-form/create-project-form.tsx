import { Button, Input } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppForm, useAppSelector, useCallback } from '~/libs/hooks/hooks.js';
import {
  type ProjectCreateRequestDto,
  projectCreateValidationSchema,
} from '~/packages/projects/projects.js';
import { type UserAuthResponse } from '~/packages/users/users.js';

import styles from './styles.module.scss';

type Properties = {
  onSubmit: (payload: ProjectCreateRequestDto) => void;
  className?: string | undefined;
};

const CreateProjectForm: React.FC<Properties> = ({
  onSubmit,
  className = '',
}: Properties) => {
  const user = useAppSelector(({ auth }) => {
    return auth.user as UserAuthResponse;
  });

  const { control, errors, handleSubmit } = useAppForm<ProjectCreateRequestDto>(
    {
      defaultValues: {
        name: '',
        userId: user.id,
      },
      validationSchema: projectCreateValidationSchema,
    },
  );

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  return (
    <div className={getValidClassNames(styles['form-wrapper'], className)}>
      <h2>What is your business’s name?</h2>
      <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
        <Input control={control} errors={errors} label="" name="name" />

        <Button
          type="submit"
          style="primary"
          size="small"
          label="Create Business"
          className={styles['submit-button']}
        />
      </form>
    </div>
  );
};

export { CreateProjectForm };
