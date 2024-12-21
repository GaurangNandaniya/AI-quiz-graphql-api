const typeDefs = `#graphql
type User {
  id: ID!
  firstName: String
  lastName: String
  email: String
}

type Question {
  id:ID!
  text:String
  options:JSON
  type:QUESTION_TYPE
  answer: JSON
}

type Quiz {
    id:ID!
    questionCount: Int
    title: String
    type: QUIZ_TYPE
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
    ADVANCE
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
    user(id:ID!):User


  }

  type Mutation{
    createQuiz(input:CreateQuizInput):Quiz
  }

`;

export default typeDefs;
