import connectDB from "@/lib/mongodb";
import Movie from "@/models/movieModel";
import { NextResponse } from "next/server";

connectDB();

export async function GET(req, res) {
   try {
      const movieVotes = await Movie.find({});
      return NextResponse.json(movieVotes);
   } catch (error) {
      return NextResponse.json({
         error: "Unable to fetch movie votes from the database.",
      });
   }
}

export async function POST(req, res) {
   const selectedMovie = await req.json();
   try {
      const movie = await Movie.create(selectedMovie);
      return NextResponse.json(movie);
   } catch (error) {
      return NextResponse.json({
         error: "Unable to post movie selection to the database.",
      });
   }
}
