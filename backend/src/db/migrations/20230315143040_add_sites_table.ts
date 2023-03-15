import { type Knex } from 'knex';

const TABLE_NAME = 'sites';

const COLUMN_NAME = {
  ID: 'id',
  NAME: 'name',
  PUBLISHED_URL: 'published_url',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments(COLUMN_NAME.ID).primary();
    table.string(COLUMN_NAME.NAME).notNullable();
    table.string(COLUMN_NAME.PUBLISHED_URL).nullable().defaultTo(null);
    table
      .dateTime(COLUMN_NAME.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(COLUMN_NAME.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
