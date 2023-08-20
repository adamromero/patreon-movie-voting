import connectDB from "@/lib/connectDB";
import Movie from "@/models/movieModel";
import { NextResponse } from "next/server";

connectDB();

export async function PUT(req, res) {
   try {
      const updatedVote = await req.json();
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

export async function DELETE(req, res) {
   try {
      const movieId = await req.json();
      const movie = await Movie.findOneAndDelete({ _id: movieId });
      if (!movie) {
         return NextResponse.json({
            error: "Movie does not exist in the database",
         });
      }
      return NextResponse.json(movie);
   } catch (e) {
      return NextResponse.json({
         error: "Unable to remove movie from the database.",
      });
   }
}
