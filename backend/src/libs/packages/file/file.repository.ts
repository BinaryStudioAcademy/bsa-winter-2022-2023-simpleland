import { type IRepository } from '~/libs/interfaces/interfaces.js';

import { FileEntity } from './file.entity.js';
import { type FileModel } from './file.model.js';

class FileRepository
  implements
    Omit<IRepository<FileEntity>, 'find' | 'findAll' | 'update' | 'delete'>
{
  private fileModel: typeof FileModel;

  public constructor(fileModel: typeof FileModel) {
    this.fileModel = fileModel;
  }

  public async create(entity: FileEntity): Promise<FileEntity> {
    const { url } = entity.toNewObject();

    const file = await this.fileModel.query().insert({ url }).returning('*');

    return FileEntity.initialize(file);
  }
}

export { FileRepository };
