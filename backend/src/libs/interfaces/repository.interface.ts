interface IRepository<T = unknown> {
  find(id: unknown): Promise<T>;
  findAll(): Promise<T[]>;
  create(payload: unknown): Promise<T>;
  update(payload: unknown): Promise<T>;
  delete(): Promise<boolean>;
  search(query: unknown, id: unknown): Promise<T[]>;
}

export { type IRepository };
