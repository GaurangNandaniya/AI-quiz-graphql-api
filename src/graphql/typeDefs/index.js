const typeDefs = `#graphql
type User {
  id: ID!
  firstName: String
  lastName: String
  email: String
}

type Quiz{
    id:ID!

}

type Query {
    user(id:ID!):User

  }

  type Mutation{
    createQuiz:Quiz
  }

`;

export default typeDefs;
