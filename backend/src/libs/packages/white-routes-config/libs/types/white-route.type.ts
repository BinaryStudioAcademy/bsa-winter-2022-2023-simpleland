import { type HttpMethod } from '~/libs/packages/http/http.js';

type WhiteRoute = {
  routerPath: string;
  httpMethods: HttpMethod[];
};

export { type WhiteRoute };
