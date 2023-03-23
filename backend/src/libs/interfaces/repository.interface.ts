interface IRepository<T = unknown> {
  find(id: unknown): Promise<T>;
  findAll(id: number): Promise<T[]>;
  create(payload: unknown): Promise<T>;
  update(payload: unknown): Promise<T>;
  delete(): Promise<boolean>;
}

export { type IRepository };
