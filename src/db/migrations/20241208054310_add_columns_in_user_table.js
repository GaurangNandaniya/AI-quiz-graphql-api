/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.withSchema("auth").table("user", (table) => {
    table.string("email").notNullable().unique().after("last_name");
    table.string("auth_provider").nullable().after("email");
    table.string("provider_id").nullable().after("auth_provider");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.withSchema("auth").table("user", (table) => {
    table.dropColumn("email");
    table.dropColumn("auth_provider");
    table.dropColumn("provider_id");
  });
};
