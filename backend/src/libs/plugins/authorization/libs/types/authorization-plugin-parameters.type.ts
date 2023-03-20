import { type WhiteRoute } from '~/libs/packages/server-application/server-application.js';
import { type Token } from '~/libs/packages/token/token.package';
import { type UserService } from '~/packages/users/user.service';

type AuthorizationPluginParameters = {
  whiteRoutesConfig: WhiteRoute[];
  userService: UserService;
  token: Token;
};

export { type AuthorizationPluginParameters };
