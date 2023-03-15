interface IRepository<T = unknown> {
  find(id: unknown): Promise<T>;
  findAll(): Promise<T[]>;
  create(payload: unknown): Promise<T>;
  update(): Promise<T>;
  delete(): Promise<boolean>;
}

export { type IRepository };
