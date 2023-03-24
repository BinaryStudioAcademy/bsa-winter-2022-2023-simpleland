interface IEncrypt {
  generateSalt(salt: number): Promise<string>;
  encrypt(password: string, salt: string): Promise<string>;
  compare(options: {
    data: string;
    salt: string;
    passwordHash: string;
  }): Promise<boolean>;
}
export { type IEncrypt };
