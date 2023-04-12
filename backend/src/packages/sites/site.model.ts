import { type RelationMappings, Model } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
  getJoinRelationPath,
} from '~/libs/packages/database/database.js';
import { type ProjectModel } from '~/packages/projects/projects.js';
import { SectionModel } from '~/packages/sections/section.model.js';
import { UserModel } from '~/packages/users/users.js';

class SiteModel extends AbstractModel {
  public 'name': string;

  public 'publishedUrl': string | null;

  public 'sections': SectionModel[];

  public 'projectId': number;

  public 'image': string | null;

  public 'user': UserModel;

  public static override get tableName(): string {
    return DatabaseTableName.SITES;
  }

  public static override relationMappings = (): RelationMappings => ({
    sections: {
      relation: Model.ManyToManyRelation,
      modelClass: SectionModel,
      join: {
        from: getJoinRelationPath<SiteModel>(DatabaseTableName.SITES, 'id'),
        through: {
          from: `${DatabaseTableName.SITES_TO_SECTIONS}.site_id`,
          to: `${DatabaseTableName.SITES_TO_SECTIONS}.section_id`,
        },
        to: getJoinRelationPath<SectionModel>(DatabaseTableName.SECTIONS, 'id'),
      },
    },
    user: {
      relation: Model.HasOneThroughRelation,
      modelClass: UserModel,
      join: {
        from: getJoinRelationPath<SiteModel>(
          DatabaseTableName.SITES,
          'projectId',
        ),
        through: {
          from: getJoinRelationPath<ProjectModel>(
            DatabaseTableName.PROJECTS,
            'id',
          ),
          to: getJoinRelationPath<ProjectModel>(
            DatabaseTableName.PROJECTS,
            'userId',
          ),
        },
        to: getJoinRelationPath<UserModel>(DatabaseTableName.USERS, 'id'),
      },
    },
  });
}

export { SiteModel };
