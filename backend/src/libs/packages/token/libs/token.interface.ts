interface IToken {
  createToken(id: number): Promise<string>;
}
export { type IToken };
