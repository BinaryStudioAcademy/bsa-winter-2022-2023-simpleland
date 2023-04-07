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
  type ProjectRequestDto,
  type ProjectUploadImageDto,
  projectCreateValidationSchema,
  projectUpdateValidationSchema,
} from '~/packages/projects/projects.js';

import { DEFAULT_CREATE_PROJECT_PAYLOAD, options } from './libs/constants.js';
import styles from './styles.module.scss';

type Properties = {
  isOpen: boolean;
  onCloseModal: () => void;
  onSubmit: (payload: ProjectRequestDto & ProjectUploadImageDto) => void;
  isUpdate?: boolean;
  className?: string;
  project?: ProjectGetAllItemResponseDto | undefined;
};

const ProjectModal: React.FC<Properties> = ({
  isOpen = false,
  onCloseModal,
  onSubmit,
  isUpdate = false,
  className = '',
  project,
}: Properties) => {
  const projectValidationSchema = isUpdate
    ? projectUpdateValidationSchema
    : projectCreateValidationSchema;

  const { control, errors, handleSubmit } = useAppForm<ProjectRequestDto>({
    defaultValues: isUpdate
      ? { name: project?.name ?? '', category: project?.category ?? project }
      : DEFAULT_CREATE_PROJECT_PAYLOAD,
    validationSchema: projectValidationSchema,
  });

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

  const modalTitle = isUpdate ? 'Update project' : 'Create a new project';
  const submitButtonLabel = isUpdate ? 'Update project' : 'Create project';

  return (
    <Modal isOpen={isOpen} onClose={onCloseModal}>
      <div className={getValidClassNames(styles['form-wrapper'], className)}>
        <h2>{modalTitle}</h2>

        <form className={styles['form-wrapper']} onSubmit={handleFormSubmit}>
          <label className={styles['choose-image-wrapper']}>
            <Image
              className={styles['choose-image']}
              src={image?.src ?? project?.avatarUrl ?? img}
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
              placeholder="Select your project category"
              name="category"
              options={options}
            />
          </div>
          <div className={styles['button-wrapper']}>
            <Button
              type="submit"
              className={styles['submit-button']}
              style="primary"
              size="small"
              label={submitButtonLabel}
            />
          </div>
        </form>
      </div>
    </Modal>
  );
};

export { ProjectModal };
