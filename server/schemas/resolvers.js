const { AuthenticationError } = require("apollo-server-express");
const { Anime, User, Posts } = require("../models");
const { signToken } = require("../utils/auth");
const axios = require("axios");

const resolvers = {
  Query: {
    meBasic: async () => {
      return await User.find();
    },
    me: async (parent, args, context) => {
      if (context.user) {
        // Fetch user data excluding sensitive fields
        const userData = await User.findOne({ _id: context.user._id }).select(
          "-__v -password"
        );
        return userData;
      }
      // Throw error if user is not authenticated
      throw new AuthenticationError("Not logged in!");
    },
    // get all users
    users: async () => {
      return User.find().populate("savedAnime");
    },
    // get a user by username
    user: async (_, __, context) => {
      return User.findOne({ username: context.user.username }).populate(
        "savedAnime"
      );
    },
    // get all posts
    Post: async () => {
      return Posts.find().populate("user");
    },
    // get a post by id
    postById: async (_, { _id }) => {
      try {
        // Fetch the post data
        const postData = await Posts.findOne({ _id });

        // Ensure the post data is fetched successfully
        if (!postData) {
          throw new Error("Post not found");
        }

        // Fetch the associated user data
        const userData = await User.findById(postData.user);

        // Ensure the user data is fetched successfully
        if (!userData) {
          throw new Error("User not found");
        }

        // Return the post data with the populated user field
        return {
          ...postData.toObject(),
          user: userData.toObject(),
        };
      } catch (error) {
        console.error("Error fetching post data:", error.message);
        // Return null or empty object in case of error
        return null;
      }
    },

    // get all anime
    searchAnime: async (_, { name }) => {
      try {
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime?q=${name}&sfw`
        );
        const animeData = response.data.data;

        console.log(animeData);

        // Validate animeData structure
        if (!animeData || !animeData.length) {
          // Return an empty array if no anime data is found
          return [];
        }

        // Extract genres from animeData
        let genres = [];
        if (animeData.genres && Array.isArray(animeData.genres)) {
          genres = animeData.genres.map((genre) => ({
            mal_id: genre.mal_id,
            name: genre.name,
          }));
        }
        // return animeData.map((anime) => {
        const searchResults = animeData.map((anime) => ({
          mal_id: anime.mal_id || null,
          title: anime.title || "Unknown Title",
          images: anime.images || {},
          episodes: anime.episodes || 0,
          synopsis: anime.synopsis || "No synopsis available",
          genres: genres,
        }));
        return searchResults;
      } catch (error) {
        //Handle error
        console.error("Error fetching anime details:", error);
        return [];
      }
    },
    // get a single anime by id
    anime: async (_, { animeId }) => {
      try {
        // Make API request to fetch anime data
        const response = await axios.get(
          `https://api.jikan.moe/v4/anime/${animeId}/full`
        );
        const animeData = response.data.data;

        // Validate animeData structure
        if (!animeData || typeof animeData !== "object") {
          throw new Error("Invalid anime data received");
        }
        // Extract genres from animeData
        let genres = [];
        if (animeData.genres && Array.isArray(animeData.genres)) {
          genres = animeData.genres.map((genre) => ({
            mal_id: genre.mal_id,
            name: genre.name,
          }));
        }
        // Return formatted anime data
        return {
          mal_id: animeData.mal_id || null,
          title: animeData.title || "Unknown Title",
          images: animeData.images || {},
          episodes: animeData.episodes || 0,
          synopsis: animeData.synopsis || "No synopsis available",
          score: animeData.score || "No score available",
          genres: genres,
        };
      } catch (error) {
        console.error("Error fetching anime data:", error.message);
        // Return null or empty object in case of error
        return {
          mal_id: null,
          title: "Unknown Title",
          images: {},
          episodes: 0,
          synopsis: "No synopsis available",
          score: "No score available",
          genres: [],
        };
      }
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
    // add an anime

    saveAnime: async (parent, { animeId }, context) => {
      if (context.user) {
        // Fetch the Anime object corresponding to animeId
        const anime = await Anime.findById(animeId);
        if (!anime) {
          throw new Error("Anime not found");
        }

        // Add the Anime object to the user's savedAnime array
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $addToSet: { savedAnime: anime } }, // Ensure uniqueness
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Login required!");
    },

    // remove a board game
    removeAnime: async (parent, { animeId }, context) => {
      if (context.user) {
        // Update user's document to remove book from savedBooks array
        const updatedUser = await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedAnime: animeId } },
          { new: true }
        );
        return updatedUser;
      }
      // Throw error if user is not authenticated
      throw new AuthenticationError("Login required!");
    },
    // add a post
    addPost: async (_, { title, content }, context) => {
      if (context.user) {
        const post = await Posts.create({
          title,
          content,
          user: context.user._id,
        });

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { post: post } },
          { new: true }
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
        await User.findByIdAndUpdate(context.user._id, {
          $pull: { posts: postId },
        });
        return post;
      }
      // Throw error if user is not authenticated
      throw new AuthenticationError("Login required!");
    },
    // add a comment
    addComment: async (parent, { postId, commentText }, context) => {
      if (context.user) {
        // Create the comment object
        const comment = new Comment({
          content: commentText,
          user: context.user._id, // Store the user's ObjectId
          post: postId,
        });

        // Save the comment
        const savedComment = await comment.save();

        // Update the post's comments array
        await Post.findByIdAndUpdate(postId, {
          $addToSet: { comments: savedComment },
        });

        // Return the updated post
        const updatedPost = await Post.findById(postId).populate("comments");
        return updatedPost;
      }
      throw new AuthenticationError("Login required!");
    },
    // remove a comment
    removeComment: async (parent, { postId, commentId }, context) => {
      if (context.user) {
        // Remove the comment
        await Comment.findByIdAndDelete(commentId);

        // Update the post's comments array
        const updatedPost = await Post.findByIdAndUpdate(
          postId,
          { $pull: { comments: commentId } },
          { new: true }
        ).populate("comments");

        return updatedPost;
      }
      // Throw error if user is not authenticated
      throw new AuthenticationError("Login required!");
    },
  },
};

module.exports = resolvers;
