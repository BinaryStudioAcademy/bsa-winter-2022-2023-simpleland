interface IService<T = unknown> {
  find(id: number): Promise<T>;
  findAll(): Promise<{
    items: T[];
  }>;
  create(payload: unknown): Promise<T>;
  findByEmail(email: string): Promise<T>;
  update(): Promise<T>;
  delete(): Promise<boolean>;
}

export { type IService };
