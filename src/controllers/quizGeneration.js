import _ from "lodash";
import { getPromptByAction } from "./promptsController";
import { replacePlaceholders } from "Utils/stringUtils";
import { generateAIResponse } from "./geminiAIController";
import { insertQuizDetails } from "./quizzesController";
import { insertUserQuizMap } from "./userQuizMapController";
import { insertQuizQuestions } from "./quizQuestionControllers";

export const generateQuiz = async (data) => {
  const { description, isTimeBased, difficultyLevel, noOfQuestions, jwtUser } =
    data;
  const { userId } = jwtUser;

  //getting prompts for quiz creation
  const prompts = await getPromptByAction({
    actions: ["SYSTEM_PROMPT_QUIZ_CREATION", "USER_PROMPT_QUIZ_CREATION"],
  });

  const systemPrompt = _.find(
    prompts,
    (item) => item.action == "SYSTEM_PROMPT_QUIZ_CREATION"
  ).prompt;
  let userPrompt = _.find(
    prompts,
    (item) => item.action == "USER_PROMPT_QUIZ_CREATION"
  ).prompt;

  //injecting user input into prompts
  userPrompt = replacePlaceholders({
    string: userPrompt,
    data: {
      description,
      isTimeBased: isTimeBased ? "YES" : "NO",
      difficultyLevel,
      noOfQuestions,
    },
    placeholderText: "can ignore",
  });

  //getting AI response
  const aiResponse = await generateAIResponse({
    systemPrompt,
    prompt: userPrompt,
  });

  const {
    quizType,
    numberOfQuestions,
    timeForQuiz,
    difficultyLevel: quizDifficultyLevel,
    title,
    questions,
    answers,
  } = aiResponse;

  //insert quiz info to respective tables
  //#1
  const quizInfo = await insertQuizDetails({
    quizDetails: {
      title,
      type: quizType,
      questionCount: numberOfQuestions,
      time: timeForQuiz,
      difficultyLevel: quizDifficultyLevel,
    },
  });

  const { id: quizId } = quizInfo;

  const promiseArray = [];
  //#2
  promiseArray.push(insertUserQuizMap({ userId, quizId, isOwner: true }));
  //#3
  promiseArray.push(
    insertQuizQuestions({
      questions: _.map(questions, (question, index) => ({
        ...question,
        answer: answers[index].value,
      })),
      quizId,
    })
  );

  const [, quizQuestions] = await Promise.allSettled(promiseArray);

  return {
    ...quizInfo,
    questions: _.map(quizQuestions.value, (question) => ({
      ..._.pick(question, ["id", "question_text", "options", "answer"]),
    })),
  };
};
