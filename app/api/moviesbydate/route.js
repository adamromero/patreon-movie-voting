import connectDB from "@/lib/connectDB";
import Movie from "@/models/movieModel";
import { NextResponse } from "next/server";

connectDB();

export const revalidate = 0;

function getCurrentMonthRange() {
   const start = new Date();
   start.setDate(1);
   start.setHours(0, 0, 0, 0);

   const end = new Date(start);
   end.setMonth(end.getMonth() + 1);

   return { start, end };
}

export async function GET(req, res) {
   try {
      const { start, end } = getCurrentMonthRange();

      const moviesThisMonth = await Movie.find({
         createdAt: {
            $gte: start,
            $lt: end,
         },
      });

      return NextResponse.json(moviesThisMonth);
   } catch (error) {
      return NextResponse.json({
         error: "Unable to fetch movie votes from the database.",
         details: error.message,
      });
   }
}
