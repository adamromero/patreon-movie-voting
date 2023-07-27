import connectDB from "@/lib/mongodb";
import Movie from "@/models/movieModel";
import { NextResponse } from "next/server";

connectDB();

export async function PUT(req, res) {
   const updatedVote = await req.json();

   try {
      const movie = await Movie.findByIdAndUpdate(
         updatedVote._id,
         updatedVote,
         {
            new: true,
         }
      );

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
