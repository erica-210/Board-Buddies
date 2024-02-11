const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    gameCount: Int
    savedGames: [BoardGame]
    post: [Post]
    comment: [Comment]
  }

  type Anime {
    mal_id: ID!
    title: String
    images: AnimeImages
    episodes: Int
    synopsis: String
    genres: [Genre]
  }

  type AnimeImages {
    jpg: AnimeImage
    webp: AnimeImage
  }

  type AnimeImage {
    image_url: String
    small_image_url: String
    large_image_url: String
  }

  type Genre {
    mal_id: ID!
    name: String
  }

  type BoardGame {
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
    _id: ID
    title: String!
    content: String!
    user: String
    comments: [Comment]
  }

  type Comment {
    CommentId: ID!
    commentText: String!
    user: String
    boardGame: BoardGame
    post: Post!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    anime(id: ID!): Anime
    boardGames(username: String): [BoardGame]
    boardGameById(gameId: ID!): BoardGame
    posts(username: String): [Post]
    postById(postId: ID!): Post
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveAnime(animeData: ID!): User
    removeAnime(animeId: ID!): User
    addPost(title: String!, content: String!): Post
    removePost(postId: String!): Post
    addComment(postId: ID!, commentText: String!): Post
    removeComment(postId: ID!, commentId: ID!): Post
  }
`;

module.exports = typeDefs;
