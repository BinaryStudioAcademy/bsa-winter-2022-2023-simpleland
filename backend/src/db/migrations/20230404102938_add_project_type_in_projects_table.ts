import { type Knex } from 'knex';

const TABLE_NAME = 'projects';

const ColumnName = {
  TYPE: 'type',
};

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.string(ColumnName.TYPE).notNullable();
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(ColumnName.TYPE);
  });
}

export { down, up };
