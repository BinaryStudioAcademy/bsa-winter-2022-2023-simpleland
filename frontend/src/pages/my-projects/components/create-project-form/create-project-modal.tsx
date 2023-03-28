import { Button, Input, Modal } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type ProjectCreateRequestDto,
  projectCreateValidationSchema,
} from '~/packages/projects/projects.js';

import styles from './styles.module.scss';

type Properties = {
  isOpen: boolean;
  closeModal: () => void;
  onSubmit: (payload: ProjectCreateRequestDto) => void;
  className?: string;
};

const CreateProjectModal: React.FC<Properties> = ({
  isOpen = false,
  closeModal,
  onSubmit,
  className = '',
}: Properties) => {
  const { control, errors, handleSubmit } = useAppForm<ProjectCreateRequestDto>(
    {
      defaultValues: {
        name: '',
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
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className={getValidClassNames(styles['form-wrapper'], className)}>
        <h2>Create a new business</h2>
        <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
          <Input
            control={control}
            errors={errors}
            label="Enter your project name"
            name="name"
          />

          <Button
            type="submit"
            style="primary"
            size="small"
            label="Create Business"
            className={styles['submit-button']}
          />
        </form>
      </div>
    </Modal>
  );
};

export { CreateProjectModal };
