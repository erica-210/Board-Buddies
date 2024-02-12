const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    savedAnime: [Anime]!
    post: [Post]!
    comment: [Comment]!
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

  type Post {
    _id: ID!
    title: String!
    content: String!
    user: User
    comment: [Comment]
  }

  type Comment {
    _id: ID!
    content: String!
    user: String!
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
    posts(username: String): [Post]
    postById(postId: ID!): Post
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveAnime(animeId: ID!): User
    removeAnime(animeId: ID!): User
    addPost(title: String!, content: String!): Post
    removePost(postId: ID!): Post
    addComment(postId: ID!, commentText: String!): Post
    removeComment(postId: ID!, commentId: ID!): Post
  }
`;

module.exports = typeDefs;
