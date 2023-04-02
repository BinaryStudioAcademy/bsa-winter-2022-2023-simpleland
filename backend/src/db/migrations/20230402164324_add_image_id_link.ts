import { type Knex } from 'knex';

const TableName = { PROJECTS: 'projects', FILES: 'files' };

const ColumnName = {
  ID: 'id',
  IMAGE_ID: 'image_id',
};

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TableName.PROJECTS, (table) => {
    table
      .integer(ColumnName.IMAGE_ID)
      .unsigned()
      .references(ColumnName.ID)
      .inTable(TableName.FILES);
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TableName.PROJECTS, (table) => {
    table.dropForeign(ColumnName.IMAGE_ID);
    table.dropColumn(ColumnName.IMAGE_ID);
  });
}

export { down, up };
