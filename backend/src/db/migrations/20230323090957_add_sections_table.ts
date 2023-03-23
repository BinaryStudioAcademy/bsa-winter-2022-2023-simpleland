import { type Knex } from 'knex';

import { SECTION_NAMES } from '~/packages/sections/sections.js';

const TABLE_NAME = 'sections';

const ColumnName = {
  ID: 'id',
  NAME: 'name',
  CONTENT: 'content',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table.enu(ColumnName.NAME, SECTION_NAMES).notNullable();
    table.jsonb(ColumnName.CONTENT).notNullable();
    table
      .dateTime(ColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(ColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(TABLE_NAME);
}

export { down, up };
