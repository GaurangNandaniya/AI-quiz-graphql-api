import { db } from "Clients";

export const addUserQuizMap = async (data) => {
  const { userId, quizId, isOwner = true } = data;
  const query = db("ai_quiz.map_user_quizzes").insert({
    fk_user_id: userId,
    fk_quiz_id: quizId,
    is_owner: isOwner,
    created_at: db.fn.now(),
  });
  // .returning("*");

  //   const result = await query;
  await query;

  //   return result;
};

export const fetchUserQuizzesById = async (data) => {
  const { userId } = data;

  const query = db("ai_quiz.map_user_quizzes as muq")
    .select("muq.id")
    .where("muq.is_deleted", false)
    .where("muq.fk_user_id", userId);

  const result = await query;

  return result;
};
