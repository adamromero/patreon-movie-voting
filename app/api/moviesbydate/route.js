import connectDB from "@/lib/connectDB";
import Movie from "@/models/movieModel";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

connectDB();

function isDateInCurrentMonth(dateToCheck) {
   const currentDate = new Date();

   return (
      dateToCheck.getFullYear() === currentDate.getFullYear() &&
      dateToCheck.getMonth() === currentDate.getMonth()
   );
}

export async function GET(req, res) {
   try {
      const movieVotes = await Movie.find();
      const moviesThisMonth = movieVotes.filter((movie) => {
         if (isDateInCurrentMonth(movie.createdAt)) {
            return movie;
         }
      });
      return NextResponse.json(moviesThisMonth);
   } catch (error) {
      return NextResponse.json({
         error: "Unable to fetch movie votes from the database.",
         details: error.message,
      });
   }
}
