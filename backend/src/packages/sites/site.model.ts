import { type RelationMappings, Model } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
  getJoinRelationPath,
} from '~/libs/packages/database/database.js';
import { SectionModel } from '~/packages/sections/section.model.js';

import { SiteModelRelation } from './libs/enums/enums.js';

class SiteModel extends AbstractModel {
  public 'name': string;

  public 'publishedUrl': string | null;

  public 'sections': SectionModel[];

  public 'projectId': number;

  public static override get tableName(): string {
    return DatabaseTableName.SITES;
  }

  public static override relationMappings = (): RelationMappings => ({
    [SiteModelRelation.SECTIONS]: {
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
  });
}

export { SiteModel };
