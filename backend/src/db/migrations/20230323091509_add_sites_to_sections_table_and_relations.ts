import { type Knex } from 'knex';

const TableName = {
  SITES_TO_SECTIONS: 'sites_to_sections',
  SECTIONS: 'sections',
  SITES: 'sites',
};

const ColumnName = {
  ID: 'id',
  SECTION_ID: 'section_id',
  SITE_ID: 'site_id',
  CREATED_AT: 'created_at',
  UPDATED_AT: 'updated_at',
};

function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(TableName.SITES_TO_SECTIONS, (table) => {
    table.increments(ColumnName.ID).primary();
    table
      .integer(ColumnName.SECTION_ID)
      .references(ColumnName.ID)
      .inTable(TableName.SECTIONS);
    table
      .integer(ColumnName.SITE_ID)
      .references(ColumnName.ID)
      .inTable(TableName.SITES);
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
  return knex.schema.dropTableIfExists(TableName.SITES_TO_SECTIONS);
}

export { down, up };
