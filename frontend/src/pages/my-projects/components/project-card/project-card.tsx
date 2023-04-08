import img from 'src/assets/img/project-mock-image.jpg';

import { IconButton, Image, Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { configureString } from '~/libs/helpers/helpers.js';
import { useAppDispatch, useCallback, useModal } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type ProjectCreateRequestDto,
  type ProjectGetAllItemResponseDto,
  type ProjectUploadImageDto,
} from '~/packages/projects/projects.js';
import { ConfigurateProjectPopup } from '~/pages/my-projects/components/components.js';
import { actions as projectActions } from '~/slices/projects/projects.js';

import styles from './styles.module.scss';

type Properties = {
  project: ProjectGetAllItemResponseDto;
};

const ProjectCard: React.FC<Properties> = ({ project }: Properties) => {
  const dispatch = useAppDispatch();
  const { id, name, avatarUrl, category } = project;

  const {
    isOpenModal: isConfigurateProject,
    handleModalClose: handleProjectModalClose,
    handleModalOpen: handleProjectModalOpen,
  } = useModal();

  const handleSubmitUpdateProject = useCallback(
    (payload: ProjectCreateRequestDto & ProjectUploadImageDto): void => {
      void dispatch(projectActions.updateProject({ projectId: id, payload }))
        .unwrap()
        .then(handleProjectModalClose);
    },
    [dispatch, handleProjectModalClose, id],
  );

  return (
    <>
      {isConfigurateProject && (
        <ConfigurateProjectPopup
          onSubmit={handleSubmitUpdateProject}
          isOpen={isConfigurateProject}
          onClose={handleProjectModalClose}
          project={project}
        />
      )}
      {!isConfigurateProject && (
        <div className={styles['card']}>
          <Image
            className={styles['card-image']}
            src={avatarUrl ?? img}
            alt="project"
          />
          <div className={styles['card-description']}>
            <Link
              to={configureString<ValueOf<typeof AppRoute>>(
                AppRoute.PROJECTS_$PROJECT_ID_SITES,
                {
                  projectId: id,
                },
              )}
            >
              <h2>{name}</h2>
              <p>{category}</p>
            </Link>
          </div>
          <IconButton
            icon="pencil"
            label="edit-project"
            className={styles['edit-project-icon']}
            onClick={handleProjectModalOpen}
          />
        </div>
      )}
    </>
  );
};

export { ProjectCard };
