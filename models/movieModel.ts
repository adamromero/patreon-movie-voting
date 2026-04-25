import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
   data: {
      id: {
         type: Number,
      },
      Title: {
         type: String,
      },
      Year: {
         type: String,
      },
      Rated: {
         type: String,
      },
      Genre: {
         type: String,
      },
      Director: {
         type: String,
      },
      Actors: {
         type: String,
      },
      Release: {
         type: String,
      },
      Runtime: {
         type: Number,
      },
      Composer: {
         type: String,
      },
      Backdrop: {
         type: String,
      },
      Poster: {
         type: String,
      },
      Rating: {
         type: Number,
      },
      imdbID: {
         type: String,
      },
      Studio: {
         type: String,
      },
      Type: {
         type: String,
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
   isRewatchFriend: {
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
   publishedAt: {
      type: Date,
      default: null,
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
