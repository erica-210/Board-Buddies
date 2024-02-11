const { AuthenticationError } = require("apollo-server-express");
const { BoardGames, User, Posts, Comments } = require("../models");
const { signToken } = require("../utils/auth");
const axios = require('axios');

const resolvers = {
  Query: {
    // get all users
    users: async () => {
      return User.find().populate("savedAnime");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("savedAnime");
    },
    // get all posts
    posts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Posts.find(params).sort({ createdAt: -1 });
    },
    // get a post by id
    postById: async (parent, { _id }) => {
      return Posts.findOne({ _id });
    },
    anime: async (parent, {id}) => {
      const response = await axios.get(
        `https://api.jikan.moe/v4/anime/${id}/full`
      )
      const animeData = response.data.data;

      const genres = animeData.genres.map((genre) => ({
        mal_id: genre.mal_id,
        name: genre.name
      }))
      return {
        mal_id: animeData.mal_id,
        title: animeData.title,
        images: animeData.images,
        episodes: animeData.episodes,
        synopsis: animeData.synopsis,
        genres: genres,
      }
    }
  },

  Mutation: {
    // add a user
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      // Generate JWT token for the new user
      const token = signToken(user);
      // Return token and user data
      return { token, user };
    },
    // login a user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      // Generate JWT token for the user
      const token = signToken(user);

      // Return token and user data
      return { token, user };
    },
    // add a board game
    saveAnime: async (parent, { animeData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { savedAnime: animeData } },
          { new: true }
        );
        return updatedUser;
      }
      // Throw error if user is not authenticated
      throw new AuthenticationError("Login required!");
    },
    // remove a board game
    removeAnime: async (parent, { animeId }, context) => {
      if (context.user) {
        // Update user's document to remove book from savedBooks array
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedAnime: {mal_id: animeId } } },
          { new: true }
        );
        return updatedUser;
      }
      // Throw error if user is not authenticated
      throw new AuthenticationError("Login required!");
    },
    // add a post
    addPost: async (parent, { postData }, context) => {
      if (context.user) {
        const post = await Posts.create({
          ...postData,
          username: context.user.username,
        });
        await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { posts: post._id } }
        );
        return post;
      }
      // Throw error if user is not authenticated
      throw new AuthenticationError("Login required!");
    },
    // remove a post
    removePost: async (parent, { postId }, context) => {
      if (context.user) {
        const post = await Posts.findOneAndDelete({
          _id: postId,
          username: context.user.username,
        });
        await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { posts: postId } }
        );
        return post;
      }
      // Throw error if user is not authenticated
      throw new AuthenticationError("Login required!");
    },
    // add a comment
    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        const updatedPost = await Comments.findOneAndUpdate(
          { _id: postId },
          {
            $addToSet: {
              comments: { commentText, username: context.user.username },
            },
          },
          { new: true, runValidators: true }
        );
        return updatedPost;
      }
      // Throw error if user is not authenticated
      throw new AuthenticationError("Login required!");
    },
    // remove a comment
    removeComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        const updatedPost = await Comments.findOneAndUpdate(
          { _id: postId },
          {
            $pull: {
              comments: { _id: commentId, username: context.user.username },
            },
          },
          { new: true }
        );
        return updatedPost;
      }
      // Throw error if user is not authenticated
      throw new AuthenticationError("Login required!");
    },
  },
};

module.exports = resolvers;
