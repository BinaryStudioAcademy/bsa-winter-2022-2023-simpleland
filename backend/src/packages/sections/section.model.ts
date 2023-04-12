import { type RelationMappings, Model } from 'objection';

import {
  AbstractModel,
  DatabaseTableName,
  getJoinRelationPath,
} from '~/libs/packages/database/database.js';
import { type ValueOf } from '~/libs/types/types.js';

import { SiteModel } from '../sites/site.model.js';
import { type SectionType } from './libs/enums/enums.js';

class SectionModel extends AbstractModel {
  public 'type': ValueOf<typeof SectionType>;

  public 'content': unknown;

  public 'site': SiteModel;

  public static override get tableName(): string {
    return DatabaseTableName.SECTIONS;
  }

  public static override relationMappings = (): RelationMappings => ({
    site: {
      relation: Model.HasOneThroughRelation,
      modelClass: SiteModel,
      join: {
        from: getJoinRelationPath<SectionModel>(
          DatabaseTableName.SECTIONS,
          'id',
        ),
        through: {
          from: `${DatabaseTableName.SITES_TO_SECTIONS}.section_id`,
          to: `${DatabaseTableName.SITES_TO_SECTIONS}.site_id`,
        },
        to: getJoinRelationPath<SiteModel>(DatabaseTableName.SITES, 'id'),
      },
    },
  });
}

export { SectionModel };
