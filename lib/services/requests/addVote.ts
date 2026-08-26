import connectDB from "@/lib/connectDB";
import { User } from "@/app/types/user";
import { getMonthlySummary } from "@/lib/db/requests";
import Movie from "@/models/movieModel";

export async function addVote({
   requestId,
   user,
}: {
   requestId: string;
   user: User;
}) {
   await connectDB();
   const request = await Movie.findOne({ _id: requestId });

   if (!request) {
      throw new Error("Request not found");
   }

   const voters = Array.from(new Set([...request.voters, user.id]));
   request.voters = voters;
   request.votes = voters.length;

   await request.save();

   const summary = await getMonthlySummary(user);

   return {
      request,
      requestId,
      summary,
   };
}
