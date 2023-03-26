import { type Knex } from 'knex';

const TABLE_NAME = 'sections';

const COLUMN_NAME = 'type';

const SECTION_TYPES = ['header', 'footer'];

const UPDATED_SECTION_TYPES = [...SECTION_TYPES, 'main'];

function up(knex: Knex): Promise<void> {
  return knex.schema.raw(
    alterEnum(TABLE_NAME, COLUMN_NAME, UPDATED_SECTION_TYPES),
  );
}

function down(knex: Knex): Promise<void> {
  return knex.schema.raw(alterEnum(TABLE_NAME, COLUMN_NAME, SECTION_TYPES));
}

function alterEnum(
  tableName: string,
  columnName: string,
  enu: string[],
): string {
  const constraintName = `${tableName}_${columnName}_check`;
  const constraint = enu
    .map((value) => {
      return `'${value}'::text`;
    })
    .join(', ');

  return `
    ALTER TABLE "${tableName}" DROP CONSTRAINT IF EXISTS "${constraintName}";
    ALTER TABLE "${tableName}" ADD CONSTRAINT "${constraintName}" CHECK ("${columnName}" = ANY (ARRAY[${constraint}]));
  `;
}

export { down, up };
