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

  const query = db("ai_quiz.questions").insert(questionsData);
  //   .returning("*");

  await query;
  //   const result = await query;

  //   return result;
};
