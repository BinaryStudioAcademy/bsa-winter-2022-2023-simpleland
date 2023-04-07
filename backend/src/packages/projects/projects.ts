import { file } from '~/libs/packages/file/file.js';
import { logger } from '~/libs/packages/logger/logger.js';

import { ProjectController } from './project.controller.js';
import { ProjectModel } from './project.model.js';
import { ProjectRepository } from './project.repository.js';
import { ProjectService } from './project.service.js';

const projectRepository = new ProjectRepository(ProjectModel);
const projectService = new ProjectService({ projectRepository, file });
const projectController = new ProjectController(logger, projectService);

export { projectController, projectService };
export {
  type ProjectCreateResponseDto,
  type ProjectFilterQueryDto,
  type ProjectGetAllResponseDto,
  type ProjectRequestDto,
  type ProjectUpdateResponseDto,
} from './libs/types/types.js';
export {
  projectCreateValidationSchema,
  projectFilterValidationSchema,
  projectUpdateValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';
export { ProjectModel } from './project.model.js';
