/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async (knex) => {
  await knex.schema.createSchema("auth");
  await knex.schema.createSchema("ai_quiz");

  await knex.schema.withSchema("auth").createTable("user", (table) => {
    table.increments("id").primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("password").notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
    table.boolean("is_deleted").notNullable().defaultTo(false);
  });

  await knex.schema.withSchema("auth").createTable("apps", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.text("description").nullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
    table.boolean("is_deleted").notNullable().defaultTo(false);
  });

  await knex.schema.withSchema("auth").createTable("map_user_app", (table) => {
    table.increments("id").primary();
    table.integer("fk_user_id").notNullable();
    table.integer("fk_app_id").notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
    table.boolean("is_deleted").notNullable().defaultTo(false);
  });

  await knex.schema.withSchema("ai_quiz").createTable("quizzes", (table) => {
    table.increments("id").primary();
    table.integer("questions_count").notNullable();
    table.string("title").notNullable();
    table.string("type").notNullable();
    table.string("difficulty_level").notNullable();
    table.json("time").notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
    table.boolean("is_deleted").notNullable().defaultTo(false);
  });

  await knex.schema
    .withSchema("ai_quiz")
    .createTable("map_user_quizzes", (table) => {
      table.increments("id").primary();
      table.integer("fk_user_id").notNullable();
      table.integer("fk_quiz_id").notNullable();
      table.boolean("is_owner").notNullable();
      table.json("quiz_report").nullable();
      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
      table.timestamp("deleted_at").nullable();
      table.boolean("is_deleted").notNullable().defaultTo(false);
    });

  await knex.schema.withSchema("ai_quiz").createTable("questions", (table) => {
    table.increments("id").primary();
    table.integer("fk_quiz_id").notNullable();
    table.text("question_text").notNullable();
    table.json("options").notNullable();
    table.string("type").notNullable();
    table.json("answer").notNullable();
  });

  await knex.schema
    .withSchema("ai_quiz")
    .createTable("quiz_evaluation", (table) => {
      table.increments("id").primary();
      table.integer("fk_user_id").notNullable();
      table.integer("fk_quiz_id").notNullable();
      table.integer("fk_question_id").notNullable();
      table.json("user_ans").notNullable();
      table.boolean("is_correct").notNullable();
      table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    });

  await knex.schema.withSchema("ai_quiz").createTable("prompt_set", (table) => {
    table.increments("id").primary();
    table.boolean("is_active").notNullable().defaultTo(true);
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
    table.boolean("is_deleted").notNullable().defaultTo(false);
  });

  await knex.schema.withSchema("ai_quiz").createTable("prompts", (table) => {
    table.increments("id").primary();
    table.integer("fk_prompt_set_id").notNullable();
    table.text("prompt").notNullable();
    table.text("action").notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("deleted_at").nullable();
    table.boolean("is_deleted").notNullable().defaultTo(false);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await knex.schema.withSchema("ai_quiz").dropTable("prompts");
  await knex.schema.withSchema("ai_quiz").dropTable("prompt_set");
  await knex.schema.withSchema("ai_quiz").dropTable("quiz_evaluation");
  await knex.schema.withSchema("ai_quiz").dropTable("questions");
  await knex.schema.withSchema("ai_quiz").dropTable("map_user_quizzes");
  await knex.schema.withSchema("ai_quiz").dropTable("quizzes");
  await knex.schema.withSchema("auth").dropTable("map_user_app");
  await knex.schema.withSchema("auth").dropTable("apps");
  await knex.schema.withSchema("auth").dropTable("user");
  await knex.schema.dropSchema("ai_quiz");
  await knex.schema.dropSchema("auth");
};
