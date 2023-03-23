import { genSalt, hash } from 'bcrypt';

class Encrypt {
  public generateSalt(salt: number): Promise<string> {
    return genSalt(salt);
  }

  public encrypt(password: string, salt: string): Promise<string> {
    return hash(password, salt);
  }

  public async compare({
    data,
    salt,
    passwordHash,
  }: {
    data: string;
    salt: string;
    passwordHash: string;
  }): Promise<boolean> {
    const hash = await this.encrypt(data, salt);

    return hash === passwordHash;
  }
}

export { Encrypt };
