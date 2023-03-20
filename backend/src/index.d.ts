import { type UserAuthResponse } from './packages/users/users.js';

declare module 'fastify' {
  interface FastifyRequest {
    user: UserAuthResponse | null;
  }
}
