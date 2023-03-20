import { SignJWT } from 'jose';

import { type IConfig } from '../config/config.js';
import { type IToken } from './libs/token.interface.js';

class Token implements IToken {
  private appConfig: IConfig;

  public constructor(config: IConfig) {
    this.appConfig = config;
  }

  public async create(id: number): Promise<string> {
    return await new SignJWT({ id })
      .setProtectedHeader({ alg: this.appConfig.AUTH.ALGORITHM })
      .setExpirationTime(this.appConfig.AUTH.EXP_TIME)
      .sign(this.createSecret());
  }

  public verify(): Promise<void> {
    return Promise.resolve();
  }

  public decode(): Promise<void> {
    return Promise.resolve();
  }

  private createSecret(): Uint8Array {
    return new TextEncoder().encode(this.appConfig.ENV.JWT.SECRET_KEY);
  }
}

export { Token };
