interface IToken {
  create(payload: unknown): Promise<string>;
  verify(): void;
  decode(): void;
}
export { type IToken };
