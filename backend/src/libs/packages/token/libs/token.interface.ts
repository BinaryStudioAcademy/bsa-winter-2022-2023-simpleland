import { type JWTPayload } from 'jose';

interface IToken {
  create(payload: unknown): Promise<string>;
  verify<T>(token: string): Promise<JWTPayload & T>;
  decode<T>(token: string): JWTPayload & T;
}
export { type IToken };
