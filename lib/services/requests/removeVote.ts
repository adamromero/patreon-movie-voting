import connectDB from "@/lib/connectDB";
import { User } from "@/app/types/user";
import { getMonthlySummary } from "@/lib/db/requests";
import Movie from "@/models/movieModel";

export async function removeVote({
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

   let deleted = false;

   const voters = request.voters.filter((voter: string) => voter !== user.id);
   request.voters = voters;
   request.votes = voters.length;

   if (request.voters.length === 0) {
      await request.deleteOne();
      deleted = true;
   } else {
      await request.save();
   }

   const summary = await getMonthlySummary(user);

   return {
      deleted,
      request: deleted ? null : request,
      requestId,
      tmdbId: request.data.id,
      mediaType: request.data.Type,
      summary,
   };
}
