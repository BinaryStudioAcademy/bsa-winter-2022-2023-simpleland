import { type Knex } from 'knex';

const TABLE_NAME = 'sections';

const ColumnName = {
  ID: 'id',
  NAME: 'name',
  TYPE: 'type',
  CONTENT: 'content',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

const SECTION_TYPES = ['header', 'footer'];

function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table.string(ColumnName.NAME).notNullable();
    table.enum(ColumnName.TYPE, SECTION_TYPES).notNullable();
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
