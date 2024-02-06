const { gql } = require("apollo-server-express");

const typeDefs = gql`

type User{
    _id: ID!
    username: String!
    email: String!
    gamesCount: Int
    wishList: [Game]
}

type BoardGame{
    gameId: ID!
    gameName: String!
    creators: [String]
    category: String
    players: Int
    playTime: Int
    recommendedAge: Int
    description: String
    gameImage: String
    gamelink: String
}

type Post {
    postId: ID!
    title: String!
    content: String!
    user: User!
    comments: [Comment]  
  }

  type Comment{
    CommentId: ID!
    text: String! 
    user: User!
    boardGame: BoardGame!
    post: Post!
  }

  type Auth{
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    savedGame(gameData: GameInput!): User
    removeBoardGame(gameId: String!): User
    addPost(postData: PostInput!): User
    removePost(postId: String!): User
    addComment(commentData: CommentInput!): User
    removeComment(commentId: String!): User
  }

`;

module.exports = typeDefs; 