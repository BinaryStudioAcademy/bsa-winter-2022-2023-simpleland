import {
  type ProjectGetAllItemResponseDto,
  type ProjectRequestDto,
  type ProjectUploadImageDto,
} from '~/packages/projects/projects.js';
import { ProjectModal } from '~/pages/my-projects/components/components.js';

type Properties = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: ProjectRequestDto & ProjectUploadImageDto) => void;
  project?: ProjectGetAllItemResponseDto;
};

const CreatePopup: React.FC<Properties> = ({
  isOpen,
  onClose,
  onSubmit,
  project,
}: Properties) => {
  const isUpdate = !!project;

  return (
    <ProjectModal
      isOpen={isOpen}
      onCloseModal={onClose}
      onSubmit={onSubmit}
      isUpdate={isUpdate}
      project={project}
    />
  );
};

export { CreatePopup };
