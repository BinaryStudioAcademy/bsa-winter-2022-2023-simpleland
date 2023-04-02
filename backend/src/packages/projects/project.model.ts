import { type RelationMappings, Model } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
  getJoinRelationPath,
} from '~/libs/packages/database/database.js';
import { FileModel } from '~/libs/packages/file/file.js';

class ProjectModel extends AbstractModel {
  public 'userId': number | null;

  public 'name': string | null;

  public 'imageId': number | null;

  public 'image': FileModel | null;

  public static override get tableName(): string {
    return DatabaseTableName.PROJECTS;
  }

  public static override get relationMappings(): RelationMappings {
    return {
      image: {
        relation: Model.HasOneRelation,
        modelClass: FileModel,
        join: {
          from: getJoinRelationPath<ProjectModel>(
            DatabaseTableName.PROJECTS,
            'imageId',
          ),
          to: getJoinRelationPath(DatabaseTableName.FILES, 'id'),
        },
      },
    };
  }
}

export { ProjectModel };
