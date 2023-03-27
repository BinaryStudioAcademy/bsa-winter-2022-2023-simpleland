import { type Knex } from 'knex';

const TABLE_NAME = 'sites';

const ColumnName = {
  PROJECT_ID: 'project_id',
};

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table
      .integer(ColumnName.PROJECT_ID)
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('projects');
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(ColumnName.PROJECT_ID);
  });
}

export { down, up };
