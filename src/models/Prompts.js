import { db } from "Clients";

export const fetchPromptByAction = async (data) => {
  const { actions } = data;

  const query = db
    .withSchema("ai_quiz")
    .select("p.*")
    .from("prompt_set as ps")
    .join("prompts as p", "ps.id", "=", "p.fk_prompt_set_id")
    .where("ps.is_active", true)
    .whereIn("p.action", actions);

  const result = await query;

  return result;
};
