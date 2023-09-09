import connectDB from "@/lib/connectDB";
import Movie from "@/models/movieModel";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

connectDB();

let movieVotes;

function isDateInCurrentMonth(dateToCheck) {
   const currentDate = new Date();

   return (
      dateToCheck.getFullYear() === currentDate.getFullYear() &&
      dateToCheck.getMonth() === currentDate.getMonth()
   );
}

async function isUnderRequestLimit() {
   const user = await getCurrentUser();

   const movieVotes = await Movie.find();
   const moviesThisMonth = movieVotes.filter((movie) => {
      if (isDateInCurrentMonth(movie.createdAt)) {
         return movie;
      }
   });

   const currentUsersMonthlyRequests = moviesThisMonth.filter(
      (movie) => movie.requester === user.id
   );
   const requestLimit = user.isProducer ? 3 : 1;
   return user.isCreator || currentUsersMonthlyRequests.length < requestLimit;
}

export async function GET(req, res) {
   try {
      movieVotes = await Movie.find();
      return NextResponse.json(movieVotes);
   } catch (error) {
      return NextResponse.json({
         error: "Unable to fetch movie votes from the database.",
         details: error.message,
      });
   }
}

export async function POST(req, res) {
   const user = await getCurrentUser();
   if (user) {
      try {
         console.log("post request called");

         const selectedMovie = await req.json();
         const selectedMovieID = selectedMovie.data.imdbID;
         const findMovie = await Movie.findOne({
            "data.imdbID": selectedMovieID,
         });

         if (!findMovie && (await isUnderRequestLimit())) {
            const movie = await Movie.create(selectedMovie);
            return NextResponse.json(movie);
         } else {
            return NextResponse.json({
               error: "Movie is not allowed to be added to the database.",
               details: error.message,
            });
         }
      } catch (error) {
         return NextResponse.json({
            error: "Unable to post movie selection to the database.",
            details: error.message,
         });
      }
   }
}
