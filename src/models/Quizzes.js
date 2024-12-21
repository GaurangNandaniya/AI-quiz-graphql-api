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
