import {
  AbstractModel,
  DatabaseTableName,
} from '~/libs/packages/database/database.js';

class UserDetailsModel extends AbstractModel {
  public 'userId': number;

  public 'firstName': string;

  public 'lastName': string;

  public static get tableName(): string {
    return DatabaseTableName.USER_DETAILS;
  }
}

export { UserDetailsModel };
