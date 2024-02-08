const { AuthenticationError } = require("apollo-server-express");
const { BoardGames, User, Posts, Comments } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    // get all users
    users: async () => {
      return User.find().populate("savedGames");
    },
    // get a user by username
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate("savedGames");
    },
    // get all board games
    boardGame: async (parent, { username }) => {
      const params = username ? { username } : {};
      return BoardGames.find(params).sort({ createdAt: -1 });
    },
    // get a board game by id
    boardGame: async (parent, { _id }) => {
      return BoardGames.findOne({ _id });
    },
    // get all posts
    post: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Posts.find(params).sort({ createdAt: -1 });
    },
    // get a post by id
    post: async (parent, { _id }) => {
      return Posts.findOne({ _id });
    },
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
    savedGame: async (parent, { gameData }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { savedGames: gameData } },
          { new: true }
        );
        return updatedUser;
      }
      // Throw error if user is not authenticated
      throw new AuthenticationError("Login required!");
    },
    // remove a board game
    removeBoardGame: async (parent, { gameId }, context) => {
      if (context.user) {
        // Update user's document to remove book from savedBooks array
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $pull: { savedGames: gameId } },
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
          { _id: context.user._id },
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
          { _id: context.user._id },
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
