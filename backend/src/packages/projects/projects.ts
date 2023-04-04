import { logger } from '~/libs/packages/logger/logger.js';

import { ProjectController } from './project.controller.js';
import { ProjectModel } from './project.model.js';
import { ProjectRepository } from './project.repository.js';
import { ProjectService } from './project.service.js';

const projectRepository = new ProjectRepository(ProjectModel);
const projectService = new ProjectService(projectRepository);
const projectController = new ProjectController(logger, projectService);

export { projectController, projectService };
export {
  type ProjectCreateRequestDto,
  type ProjectCreateResponseDto,
  type ProjectFilterQueryDto,
  type ProjectGetAllResponseDto,
} from './libs/types/types.js';
export {
  projectCreateValidationSchema,
  projectFilterValidationSchema,
} from './libs/validation-schemas/validation-schemas.js';
export { ProjectModel } from './project.model.js';
