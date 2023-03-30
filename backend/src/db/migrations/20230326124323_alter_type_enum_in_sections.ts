import { type Knex } from 'knex';

const TABLE_NAME = 'sections';

const COLUMN_NAME = 'type';

const ENUM_NAME = 'enum_sections_type';

const SECTION_TYPES = ['header', 'footer'];

const UPDATED_SECTION_TYPES = [...SECTION_TYPES, 'main'];

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });

  return await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.enum(COLUMN_NAME, UPDATED_SECTION_TYPES, {
      useNative: true,
      enumName: ENUM_NAME,
    });
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });

  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.enum(COLUMN_NAME, SECTION_TYPES).notNullable();
  });

  return await knex.schema.raw(`DROP TYPE IF EXISTS ${ENUM_NAME} CASCADE;`);
}

export { down, up };
