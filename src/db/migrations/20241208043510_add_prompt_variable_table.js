/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema
    .withSchema("ai_quiz")
    .createTable("prompt_variable", (table) => {
      table.increments("id").primary();
      table.integer("fk_prompt_id").notNullable();
      table.string("variable_id").notNullable();
      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
      table.timestamp("deleted_at").nullable();
      table.boolean("is_deleted").notNullable().defaultTo(false);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.withSchema("ai_quiz").dropTable("prompt_variable");
};
