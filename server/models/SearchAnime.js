const mongoose = require('mongoose');
const Anime = require('./Anime');
const Schema = mongoose.Schema;

const searchAnimeSchema = new Schema({
  // Define your schema fields here
  mal_id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  images: { 
    jpg: {type: AnimeImageSchema},
    webp: {type: AnimeImageSchema},
  },
  episodes: {
    type: Number,
  },
  synopsis: {
    type: String,
  },
  genres: [{ type: Schema.Types.ObjectId, ref: "Genre"}],
});

const SearchAnime = mongoose.model('SearchAnime', searchAnimeSchema);

module.exports = SearchAnime;
