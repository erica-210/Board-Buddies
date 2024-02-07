const { Schema } = require("mongoose");

const commentSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  gameName: {
    type: String,
    required: true,
  },
  commentText: {
    type: String,
    required: true,
  },
});

module.exports = commentSchema;
