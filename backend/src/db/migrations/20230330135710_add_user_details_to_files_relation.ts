import { type Knex } from 'knex';

const TableName = { USER_DETAILS: 'user_details', FILES: 'files' };

const ColumnName = {
  ID: 'id',
  AVATAR_ID: 'avatar_id',
};

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TableName.USER_DETAILS, (table) => {
    table
      .integer(ColumnName.AVATAR_ID)
      .unsigned()
      .references(ColumnName.ID)
      .inTable(TableName.FILES);
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TableName.USER_DETAILS, (table) => {
    table.dropForeign(ColumnName.AVATAR_ID);
    table.dropColumn(ColumnName.AVATAR_ID);
  });
}

export { down, up };
