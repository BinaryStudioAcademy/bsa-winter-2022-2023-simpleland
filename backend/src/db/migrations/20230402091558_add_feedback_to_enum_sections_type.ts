import { type Knex } from 'knex';

const PREVIOUS_ENUM_NAME = 'enum_about_sections_type';

const ENUM_NAME = 'enum_sections_type';

const SECTION_TYPE = 'feedback';

async function up(knex: Knex): Promise<void> {
  await knex.schema.raw(`DROP TYPE IF EXISTS ${ENUM_NAME}`);

  await knex.schema.raw(
    `ALTER TYPE ${PREVIOUS_ENUM_NAME} RENAME TO ${ENUM_NAME}`,
  );

  return await knex.schema.raw(
    `ALTER TYPE ${ENUM_NAME} ADD VALUE IF NOT EXISTS '${SECTION_TYPE}'`,
  );
}

function down(): void {
  return;
}

export { down, up };
