import { type Knex } from 'knex';

const ENUM_NAME = 'enum_sections_type';

const SECTION_TYPE = 'portfolio';

function up(knex: Knex): Promise<void> {
  return knex.schema.raw(
    `ALTER TYPE ${ENUM_NAME} ADD VALUE IF NOT EXISTS '${SECTION_TYPE}'`,
  );
}

function down(): void {
  return;
}

export { down, up };
