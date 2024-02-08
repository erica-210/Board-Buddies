const mongoose = require("mongoose");

const { Schema } = mongoose;
const bcryptjs = require("bcryptjs");
const BoardGame = require("./BoardGames.js");
const Comment = require("./Comments.js");
const Post = require("./Posts.js");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    savedGames: [BoardGame.schema],
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },

  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcryptjs.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcryptjs.compare(password, this.password);
};

// when we query a user, we'll also get another field called `gameCount` with the number of saved games we have
userSchema.virtual("gameCount").get(function () {
  return this.savedGames.length;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
