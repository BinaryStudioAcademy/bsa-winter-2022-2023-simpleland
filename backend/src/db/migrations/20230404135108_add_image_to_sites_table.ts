import { type Knex } from 'knex';

const TABLE_NAME = 'sites';

const COLUMN_NAME = 'image';

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.string(COLUMN_NAME).nullable().defaultTo(null);
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
}

export { down, up };
