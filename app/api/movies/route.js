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
   console.log("POST method");
   try {
      const movie = await Movie.create(req.body);
      return NextResponse.json(movie);
   } catch (error) {
      return NextResponse.json({
         error: "Unable to post movie selection to the database.",
      });
   }
}

export async function PUT(req, res) {
   console.log("PUT method");
   try {
      const movie = await Movie.findByIdAndUpdate(req.body._id, req.body, {
         new: true,
         runValidators: true,
      });

      if (!movie) {
         throw new Error(
            "Movie vote not found... something went really wrong."
         );
      }
      return NextResponse.json(movie);
   } catch (error) {
      return NextResponse.json({
         error: "Unable to update movie vote in the database.",
      });
   }
}
