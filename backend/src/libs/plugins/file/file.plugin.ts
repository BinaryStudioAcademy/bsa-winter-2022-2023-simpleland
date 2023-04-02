import { type MultipartFile } from '@fastify/multipart';
import {
  type FastifyInstance,
  type FastifyPluginAsync,
  type FastifyRequest,
} from 'fastify';
import fp from 'fastify-plugin';

import { FormDataKey } from '~/libs/packages/file/file.js';
import { HttpCode, HttpError } from '~/libs/packages/http/http.js';

import { ALLOWED_FILE_MIMETYPES } from './libs/allowed-file-mimetypes.constants.js';

const file: FastifyPluginAsync = fp(async (fastify: FastifyInstance) => {
  fastify.decorateRequest('fileBuffer', null);

  fastify.addHook(
    'preValidation',
    async (
      request: FastifyRequest<{ Body: { [FormDataKey.FILE]: MultipartFile } }>,
    ) => {
      if (!request.isMultipart()) {
        return;
      }

      const file = request.body[FormDataKey.FILE];

      const isAllowedMimetype = ALLOWED_FILE_MIMETYPES.includes(file.mimetype);

      if (!isAllowedMimetype) {
        throw new HttpError({
          message: 'Unsupported file mimetype',
          status: HttpCode.BAD_REQUEST,
        });
      }

      if (file.file.truncated) {
        throw new HttpError({
          message: 'Payload too large',
          status: HttpCode.CONTENT_TOO_LARGE,
        });
      }

      const fileBuffer = await file.toBuffer();

      request.fileBuffer = fileBuffer;
    },
  );

  return await Promise.resolve();
});

export { file };
