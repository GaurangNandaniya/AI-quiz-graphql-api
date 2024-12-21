/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.withSchema("ai_quiz").alterTable("questions", (table) => {
    table.json("options").alter({ nullable: true });
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.withSchema("qi_quiz").alterTable("questions", (table) => {
    table.json("options").notNullable().alter();
  });
};
