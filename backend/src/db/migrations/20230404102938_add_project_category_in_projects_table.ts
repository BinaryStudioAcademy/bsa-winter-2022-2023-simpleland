import { type Knex } from 'knex';

const TABLE_NAME = 'projects';

const COLUMN_NAME = 'category';

const ENUM_NAME = 'enum_projects_category';

const CATEGORY_TYPES = [
  'e-commercial',
  'business',
  'blog',
  'portfolio',
  'personal',
  'nonprofit',
];

async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.enum(COLUMN_NAME, CATEGORY_TYPES, {
      useNative: true,
      enumName: ENUM_NAME,
    });
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(TABLE_NAME, (table) => {
    table.dropColumn(COLUMN_NAME);
  });

  await knex.schema.raw(`DROP TYPE IF EXISTS ${ENUM_NAME} CASCADE;`);
}

export { down, up };
