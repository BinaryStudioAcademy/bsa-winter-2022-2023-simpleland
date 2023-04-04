import { type RelationMappings, Model } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
  getJoinRelationPath,
} from '~/libs/packages/database/database.js';
import { FileModel } from '~/libs/packages/file/file.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type ProjectType } from './libs/enums/enums.js';

class ProjectModel extends AbstractModel {
  public 'userId': number | null;

  public 'name': string | null;

  public 'avatarId': number | null;

  public 'avatar': FileModel | null;

  public 'type': ValueOf<typeof ProjectType> | null;

  public static override get tableName(): string {
    return DatabaseTableName.PROJECTS;
  }

  public static override get relationMappings(): RelationMappings {
    return {
      avatar: {
        relation: Model.HasOneRelation,
        modelClass: FileModel,
        join: {
          from: getJoinRelationPath<ProjectModel>(
            DatabaseTableName.PROJECTS,
            'avatarId',
          ),
          to: getJoinRelationPath(DatabaseTableName.FILES, 'id'),
        },
      },
    };
  }
}

export { ProjectModel };
