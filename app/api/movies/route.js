import connectDB from "@/lib/connectDB";
import Movie from "@/models/movieModel";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

connectDB();

export async function GET(req, res) {
   try {
      const movieVotes = await Movie.find();
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
         const selectedMovie = await req.json();
         const selectedMovieID = selectedMovie.data.imdbID;
         const findMovie = await Movie.findOne({
            "data.imdbID": selectedMovieID,
         });

         if (!findMovie) {
            const movie = await Movie.create(selectedMovie);
            return NextResponse.json(movie);
         } else {
            return NextResponse.json({
               error: "Movie is already added to the database.",
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
