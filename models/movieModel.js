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
      Studio: {
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
   isRewatch: {
      type: Boolean,
      default: false,
   },
   isHalloween: {
      type: Boolean,
      default: false,
   },
   isChristmas: {
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

movieSchema.index({ createdAt: 1 });
movieSchema.index({ requester: 1 });
movieSchema.index({ "data.imdbID": 1 }, { unique: true });
movieSchema.index({ "data.Title": "text" });
movieSchema.index({
   requester: 1,
   hasReacted: 1,
   hasSeen: 1,
   createdAt: 1,
});

const Movie = mongoose.models.Movie || mongoose.model("Movie", movieSchema);

export default Movie;
