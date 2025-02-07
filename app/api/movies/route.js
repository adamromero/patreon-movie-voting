import connectDB from "@/lib/connectDB";
import Movie from "@/models/movieModel";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";

connectDB();

export async function GET(req, res) {
   try {
      const movieVotes = await Movie.find().sort({ createdAt: 1 });
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

         const currentDate = new Date();
         const currentMonthStart = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth(),
            1
         );
         const currentMonthEnd = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
         );

         const existingDocument = await Movie.find({
            requester: selectedMovie.requester,
            hasReacted: false,
            hasSeen: false,
            createdAt: { $gte: currentMonthStart, $lte: currentMonthEnd },
         });

         const numberOfRequests = existingDocument.length + 1;
         const requestLimit = user.isProducer ? 3 : 2;
         if (numberOfRequests <= requestLimit || user.isCreator) {
            const movie = await Movie.findOneAndUpdate(
               { "data.imdbID": selectedMovie.data.imdbID },
               { $setOnInsert: selectedMovie },
               { upsert: true, new: true }
            );
            return NextResponse.json(movie);
         }
         return NextResponse.json({
            error: "Unable to post movie selection to the database.",
         });
      } catch (error) {
         return NextResponse.json({
            error: "Unable to post movie selection to the database.",
            details: error.message,
         });
      }
   }
}
