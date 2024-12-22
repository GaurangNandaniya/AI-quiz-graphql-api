import { db } from "Clients";
import _ from "lodash";

export const addQuizDetails = async (data) => {
  const { quizDetails } = data;

  const query = db("ai_quiz.quizzes as q")
    .insert({
      title: quizDetails.title,
      type: quizDetails.type,
      questions_count: quizDetails.questionCount,
      time: quizDetails.time,
      difficulty_level: quizDetails.difficultyLevel,
      created_at: db.fn.now(),
    })
    .returning("*");

  const result = await query;

  return _.first(result);
};

export const fetchQuizzesByIds = async (ids) => {
  console.log("fetchQuizzesByIds", ids);

  const query = db("ai_quiz.quizzes as q")
    .select(
      "q.id",
      "q.questions_count",
      "q.title",
      "q.type",
      "q.difficulty_level",
      "q.time"
    )
    .whereIn("q.id", ids)
    .where("q.is_deleted", false);

  const result = await query;

  return result;
};
