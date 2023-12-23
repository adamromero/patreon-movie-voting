import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
   data: {
      id: {
         type: Number,
         required: true,
      },
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
      Director: {
         type: String,
         required: true,
      },
      Actors: {
         type: String,
         required: true,
      },
      Release: {
         type: String,
         required: true,
      },
      Runtime: {
         type: Number,
         required: true,
      },
      Composer: {
         type: String,
         required: true,
      },
      Backdrop: {
         type: String,
         required: true,
      },
      Poster: {
         type: String,
         required: true,
      },
      Rating: {
         type: Number,
         required: true,
      },
      imdbRating: {
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
   hasReacted: {
      type: Boolean,
      default: false,
   },
   hasSeen: {
      type: Boolean,
      default: false,
   },
   links: {
      patreon: {
         type: String,
         default: "",
      },
      youtube: {
         type: String,
         default: "",
      },
   },
   requester: {
      type: String,
      default: "",
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
});

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

export default Movie;
