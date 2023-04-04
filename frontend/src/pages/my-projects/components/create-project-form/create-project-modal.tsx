import { Button, Input, Modal, Select } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppForm, useCallback } from '~/libs/hooks/hooks.js';
import {
  type ProjectCreateRequestDto,
  projectCreateValidationSchema,
} from '~/packages/projects/projects.js';

import { DEFAULT_CREATE_PROJECT_PAYLOAD } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  isOpen: boolean;
  onCloseModal: () => void;
  onSubmit: (payload: ProjectCreateRequestDto) => void;
  className?: string;
};

const CreateProjectModal: React.FC<Properties> = ({
  isOpen = false,
  onCloseModal,
  onSubmit,
  className = '',
}: Properties) => {
  const { control, errors, handleSubmit } = useAppForm<ProjectCreateRequestDto>(
    {
      defaultValues: DEFAULT_CREATE_PROJECT_PAYLOAD,
      validationSchema: projectCreateValidationSchema,
    },
  );

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit(onSubmit)(event_);
    },
    [handleSubmit, onSubmit],
  );

  const options = [
    { value: 'eCommercial', label: 'eCommercial' },
    { value: 'Business', label: 'Business' },
    { value: 'Blog', label: 'Blog' },
    { value: 'Portfolio', label: 'Portfolio' },
    { value: 'Personal', label: 'Personal' },
    { value: 'Nonprofit', label: 'Nonprofit' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal}>
      <div className={getValidClassNames(styles['form-wrapper'], className)}>
        <h2>Create a new project</h2>
        <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
          <Input
            control={control}
            errors={errors}
            label="Enter your project name"
            name="name"
          />
          <div className={styles['select-wrapper']}>
            <Select
              control={control}
              errors={errors}
              name="type"
              placeholder="Please select your type"
              options={options}
              isSearchable
            />
          </div>
          <Button
            type="submit"
            style="primary"
            size="small"
            label="Create Project"
            className={styles['submit-button']}
          />
        </form>
      </div>
    </Modal>
  );
};

export { CreateProjectModal };
