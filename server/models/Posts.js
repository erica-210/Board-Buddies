const { Schema } = require("mongoose");

const postSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  gameName: {
    type: String,
    required: true,
  },
  postContent: {
    type: String,
    required: true,
  },
});

module.exports = postSchema;
