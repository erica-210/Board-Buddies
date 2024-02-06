const { AuthenticationError } = require("apollo-server-express");
const { BoardGames, User } = require("../models");
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
    boardGames: async (parent, { username }) => {
      const params = username ? { username } : {};
      return BoardGames.find(params).sort({ createdAt: -1 }); 
    },
    // get a board game by id
    boardGame: async (parent, { _id }) => {
      return BoardGame.findOne({ _id }); 
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
  },
};

module.exports = resolvers;