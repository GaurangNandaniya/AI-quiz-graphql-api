import { db } from "Clients";
import _ from "lodash";

export const addQuizQuestions = async (data) => {
  const { questions, quizId } = data;
  const questionsData = _.map(questions, (question) => ({
    fk_quiz_id: quizId,
    question_text: question.question,
    type: question.type,
    answer: JSON.stringify(question.answer),
    options: JSON.stringify(question.options) ?? null,
  }));

  const query = db("ai_quiz.questions").insert(questionsData).returning("*");

  //   await query;
  const result = await query;

  return result;
};

export const fetchQuizQuestionsIdsByQuizIds = async (ids) => {
  console.log("fetchQuizQuestionsIdsByQuizIds");

  const query = db("ai_quiz.questions as q")
    .select(db.raw("json_agg(q.id) as question_ids"), "q.fk_quiz_id as id")
    .whereIn("q.fk_quiz_id", ids)
    .groupBy("q.fk_quiz_id");

  const result = await query;

  return result;
};

export const fetchQuestionsByIds = async (ids) => {
  console.log("fetchQuestionsByIds", ids);

  const query = db("ai_quiz.questions as q")
    .select("q.id", "q.question_text", "q.options", "q.type", "q.answer")
    .whereIn("q.id", ids);

  const result = await query;

  return result;
};
