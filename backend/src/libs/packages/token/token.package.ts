import { type JWTPayload, decodeJwt, SignJWT } from 'jose';

import { type IConfig } from '../config/config.js';
import { type IToken } from './libs/interfaces/interfaces.js';

class Token implements IToken {
  private appConfig: IConfig;

  public constructor(config: IConfig) {
    this.appConfig = config;
  }

  public async create<T extends Record<string, unknown>>(
    payload: T,
  ): Promise<string> {
    return await new SignJWT(payload)
      .setProtectedHeader({ alg: this.appConfig.AUTH.ALGORITHM })
      .setExpirationTime(this.appConfig.AUTH.EXP_TIME)
      .sign(new TextEncoder().encode(this.appConfig.ENV.JWT.SECRET_KEY));
  }

  public decode<T>(token: string): JWTPayload & T {
    return decodeJwt(token) as JWTPayload & T;
  }
}

export { Token };
