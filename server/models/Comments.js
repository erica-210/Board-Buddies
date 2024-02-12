const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  postId: {
    type: Schema.Types.ObjectId,
    ref: "Post",
    required: true,
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
