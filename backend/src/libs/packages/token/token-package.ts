import { SignJWT } from 'jose';

import { type IConfig } from '../config/config.js';
import { type ITokenConfig } from '../config/libs/interfaces/config.interface.js';
import { type IToken } from './libs/token.interface.js';

class Token implements IToken {
  private tokenConfig: ITokenConfig;
  private appConfig: IConfig;
  public constructor(config: IConfig, tokenConfig: ITokenConfig) {
    this.appConfig = config;
    this.tokenConfig = tokenConfig;
  }

  public async createToken(id: number): Promise<string> {
    const secret = new TextEncoder().encode(this.appConfig.ENV.JWT.SECRET_KEY);
    return await new SignJWT({ id })
      .setProtectedHeader({ alg: this.tokenConfig.AUTH.ALGORITHM })
      .setExpirationTime(this.tokenConfig.AUTH.EXP_TIME)
      .sign(secret);
  }
}

export { Token };
