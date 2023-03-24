import { type JWTPayload } from 'jose';

interface IToken {
  create<T extends Record<string, unknown>>(payload: T): Promise<string>;
  decode<T extends Record<string, unknown>>(token: string): JWTPayload & T;
}
export { type IToken };
