const { Schema, model } = require("mongoose");

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
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
  boardGameId: {
    type: Schema.Types.ObjectId,
    ref: "BoardGame",
    required: true,
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
