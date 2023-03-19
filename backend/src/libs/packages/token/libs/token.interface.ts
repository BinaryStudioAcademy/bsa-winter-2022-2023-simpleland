import { type JWTPayload } from 'jose';

interface IToken {
  create(payload: unknown): Promise<string>;
  verify(token: string): Promise<JWTPayload>;
  decode(token: string): unknown;
}
export { type IToken };
