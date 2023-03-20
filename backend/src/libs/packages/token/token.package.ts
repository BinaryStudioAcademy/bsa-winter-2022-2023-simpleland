import { type JWTPayload, decodeJwt, jwtVerify, SignJWT } from 'jose';

import { type IConfig } from '../config/config.js';
import { type IToken } from './libs/token.interface.js';

class Token implements IToken {
  private appConfig: IConfig;

  public constructor(config: IConfig) {
    this.appConfig = config;
  }

  public async create(userId: number): Promise<string> {
    return await new SignJWT({ userId })
      .setProtectedHeader({ alg: this.appConfig.AUTH.ALGORITHM })
      .setExpirationTime(this.appConfig.AUTH.EXP_TIME)
      .sign(this.createSecret());
  }

  public async verify<T>(token: string): Promise<JWTPayload & T> {
    const { payload } = await jwtVerify(token, this.createSecret());

    return payload as JWTPayload & T;
  }

  public decode<T>(token: string): JWTPayload & T {
    return decodeJwt(token) as JWTPayload & T;
  }

  private createSecret(): Uint8Array {
    return new TextEncoder().encode(this.appConfig.ENV.JWT.SECRET_KEY);
  }
}

export { Token };
