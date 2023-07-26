import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
   data: {
      Title: {
         type: String,
         required: true,
      },
      Year: {
         type: String,
         required: true,
      },
      Rated: {
         type: String,
         required: true,
      },
      Genre: {
         type: String,
         required: true,
      },
      Poster: {
         type: String,
         required: true,
      },
      imdbID: {
         type: String,
         required: true,
      },
      Type: {
         type: String,
         required: true,
      },
   },
   voters: [{ type: String }],
   isWatched: {
      type: Boolean,
      default: false,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

export default Movie;
