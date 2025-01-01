const typeDefs = `#graphql
scalar JSON

type User {
  id: ID!
  firstName: String
  lastName: String
  email: String
  quizzes: [Quiz!]
}

type Question {
  id:ID!
  text:String
  options:JSON
  questionType:QUESTION_TYPE
  answer: JSON
}

type Quiz {
    id:ID!
    questionCount: Int
    title: String
    quizType: QUIZ_TYPE
    difficultyLevel: DIFFICULTY_LEVEL_ENUM
    time: JSON
    questions: [Question!]
}

enum QUESTION_TYPE {
  MULTIPLE_CHOICE
  TEXT_BASED
  MULTIPLE_CHOICE_MULTI_ANSWER
}

enum DIFFICULTY_LEVEL_ENUM {
    EASY
    MEDIUM
    HARD
    ADVANCED
}

enum QUIZ_TYPE {
  NON_TIME_BASED
  TIME_BASED
}

input CreateQuizInput{
    description: String
    isTimeBased: Boolean
    difficultyLevel: DIFFICULTY_LEVEL_ENUM
    noOfQuestions: Int
}

type Query {
    user(id:ID!): User
    quiz(id:ID!): Quiz
  }

type Mutation{
    createQuiz(input:CreateQuizInput):Quiz
  }

`;

export default typeDefs;
