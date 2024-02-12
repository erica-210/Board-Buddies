const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  mal_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;
