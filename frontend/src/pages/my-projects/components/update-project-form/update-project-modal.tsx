import img from '~/assets/img/project-mock-image.jpg';
import {
  Button,
  Image,
  Input,
  Modal,
  Select,
} from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppForm, useCallback, useState } from '~/libs/hooks/hooks.js';
import { FormDataKey } from '~/libs/packages/file/file.js';
import {
  type ProjectGetAllItemResponseDto,
  type ProjectUpdateRequestDto,
  type ProjectUploadImageDto,
  projectUpdateValidationSchema,
} from '~/packages/projects/projects.js';

import { options } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  project: ProjectGetAllItemResponseDto;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: ProjectUpdateRequestDto & ProjectUploadImageDto) => void;
  className?: string;
};

const UpdateProjectModal: React.FC<Properties> = ({
  isOpen,
  onClose,
  onSubmit,
  className = '',
  project,
}: Properties) => {
  const { control, errors, handleSubmit } = useAppForm<ProjectUpdateRequestDto>(
    {
      defaultValues: {
        name: project.name,
        category: project.category,
      },
      validationSchema: projectUpdateValidationSchema,
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
          category: payload.category,
        });
      })(event_);
    },
    [handleSubmit, onSubmit, image],
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={getValidClassNames(styles['form-wrapper'], className)}>
        <h2>Create a new project</h2>

        <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
          <label className={styles['choose-image-wrapper']}>
            <Image
              className={styles['choose-image']}
              src={String(image?.src ?? project.avatarUrl ?? img)}
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
          <div className={styles['select-wrapper']}>
            <Select
              control={control}
              errors={errors}
              name="category"
              placeholder="Please select your category"
              options={options}
            />
          </div>
          <Button
            type="submit"
            style="primary"
            size="small"
            label="Save"
            className={getValidClassNames(
              styles['button'],
              styles['submit-button'],
            )}
          />
        </form>
      </div>
    </Modal>
  );
};

export { UpdateProjectModal };
