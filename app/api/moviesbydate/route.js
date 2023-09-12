import connectDB from "@/lib/connectDB";
import Movie from "@/models/movieModel";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

connectDB();

export const revalidate = 0;

function isDateInCurrentMonth(dateToCheck) {
   const currentDate = new Date();
   const date = new Date(dateToCheck);

   return (
      date.getFullYear() === currentDate.getFullYear() &&
      date.getMonth() === currentDate.getMonth()
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

      console.log("moviesthismonth: ", moviesThisMonth);

      return NextResponse.json(moviesThisMonth);
   } catch (error) {
      return NextResponse.json({
         error: "Unable to fetch movie votes from the database.",
         details: error.message,
      });
   }
}
