interface IService<T = unknown> {
  find(id: unknown): Promise<T>;
  findAll(): Promise<{
    items: T[];
  }>;
  create(payload: unknown): Promise<T>;
  update(id: unknown, payload: unknown): Promise<T>;
  delete(): Promise<boolean>;
}

export { type IService };
