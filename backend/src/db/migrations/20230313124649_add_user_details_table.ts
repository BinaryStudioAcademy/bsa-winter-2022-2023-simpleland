import { type Knex } from 'knex';

const TABLE_NAME = 'user_details';

const ColumnName = {
  ID: 'id',
  USER_ID: 'user_id',
  FIRST_NAME: 'first_name',
  LAST_NAME: 'last_name',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TABLE_NAME, (table) => {
    table.increments(ColumnName.ID).primary();
    table
      .integer(ColumnName.USER_ID)
      .unsigned()
      .references('id')
      .inTable('users');
    table.string(ColumnName.FIRST_NAME).notNullable();
    table.string(ColumnName.LAST_NAME).notNullable();
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
