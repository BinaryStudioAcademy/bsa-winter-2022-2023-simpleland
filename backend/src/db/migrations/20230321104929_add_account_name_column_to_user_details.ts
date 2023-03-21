import { type Knex } from 'knex';

const TABLE_NAME = 'user_details';

const COLUMN_NAME = 'account_name';

function up(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.string(COLUMN_NAME).notNullable();
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });
}

export { down, up };
