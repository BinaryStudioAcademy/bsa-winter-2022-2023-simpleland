import { type MultipartFile } from '@fastify/multipart';
import {
  type FastifyInstance,
  type FastifyPluginAsync,
  type FastifyRequest,
} from 'fastify';
import fp from 'fastify-plugin';

const file: FastifyPluginAsync = fp(async (fastify: FastifyInstance) => {
  fastify.decorateRequest('fileBuffer', null);

  fastify.addHook(
    'preValidation',
    async (request: FastifyRequest<{ Body: { file: MultipartFile } }>) => {
      if (!request.isMultipart()) {
        return;
      }

      const {
        body: { file },
      } = request;

      const fileBuffer = await file.toBuffer();

      request.fileBuffer = fileBuffer;
    },
  );

  return await Promise.resolve();
});

export { file };
