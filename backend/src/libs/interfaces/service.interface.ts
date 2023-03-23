interface IService<T = unknown> {
  find(id: unknown): Promise<T>;
  findAll(user: unknown): Promise<{
    items: T[];
  }>;
  create(payload: unknown): Promise<T>;
  update(id: unknown, payload: unknown): Promise<T>;
  delete(): Promise<boolean>;
}

export { type IService };
