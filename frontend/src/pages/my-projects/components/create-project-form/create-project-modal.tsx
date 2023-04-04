import img from 'src/assets/img/project-mock-image.jpg';

import { Button, Image, Input, Modal } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppForm, useCallback, useState } from '~/libs/hooks/hooks.js';
import { FormDataKey } from '~/libs/packages/file/file.js';
import {
  type ProjectCreateRequestDto,
  type ProjectUploadImageDto,
  projectCreateValidationSchema,
} from '~/packages/projects/projects.js';

import { DEFAULT_CREATE_PROJECT_PAYLOAD } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  isOpen: boolean;
  onCloseModal: () => void;
  onSubmit: (payload: ProjectCreateRequestDto & ProjectUploadImageDto) => void;
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

  const [image, setImage] = useState<{
    src: string;
    blob: Blob;
  } | null>(null);

  const handleFormSubmit = useCallback(
    (event_: React.BaseSyntheticEvent): void => {
      void handleSubmit((payload) => {
        let formData: null | FormData = null;

        if (image) {
          formData = new FormData();
          formData.append(FormDataKey.FILE, image.blob);
        }

        onSubmit({
          name: payload.name,
          formData,
        });
      })(event_);
    },
    [handleSubmit, image, onSubmit],
  );

  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();
      const [newImage] = event.target.files ?? [];

      if (newImage) {
        reader.addEventListener('load', () => {
          setImage({
            src: reader.result as string,
            blob: newImage,
          });
        });
        reader.readAsDataURL(newImage);
      }
    },
    [setImage],
  );

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal}>
      <div className={getValidClassNames(styles['form-wrapper'], className)}>
        <h2>Create a new project</h2>

        <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
          <label className={styles['choose-image-wrapper']}>
            <Image
              className={styles['choose-image']}
              src={image?.src ?? img}
              alt="project"
            />
            <input
              type="file"
              className="visually-hidden"
              onChange={handleImageChange}
            />
          </label>

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
            label="Create Project"
            className={styles['submit-button']}
          />
        </form>
      </div>
    </Modal>
  );
};

export { CreateProjectModal };
