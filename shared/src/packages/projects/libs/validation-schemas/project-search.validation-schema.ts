import joi from 'joi';

import { ProjectValidationMessage } from '../enums/enums.js';
import { type ProjectSearchParameters } from '../types/types.js';

const projectSearch = joi.object<ProjectSearchParameters, true>({
  query: joi.string().trim().optional().messages({
    'string.empty': ProjectValidationMessage.SEARCH_QUERY_WRONG,
  }),
});

export { projectSearch };
