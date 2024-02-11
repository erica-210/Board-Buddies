const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnimeSchema = new Schema({
  mal_id: { type: String, required: true, unique: true },
  title: {
    type: String,
  },
  images: {
    jpg: { type: AnimeImageSchema },
    webp: { type: AnimeImageSchema },
  },
  episodes: {
    type: Number
  },
  synopsis: {
    type: String,
  },
  genres: [{ type: Schema.Types.ObjectId, ref: "Genre" }], 
});

const AnimeImageSchema = new Schema({
  image_url: {
    type: String,
  },
  small_image_url: {
    type: String,
  },
  large_image_url: {
    type: String,
  }
});


// Create a model using the schema
const Anime = mongoose.model('Anime', animeSchema);

// Export the model
module.exports = Anime;