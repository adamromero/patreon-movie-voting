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
   const request = await Movie.findOne({ _id: requestId });

   if (!request) {
      throw new Error("Request not found");
   }

   request.voters = request.voters.filter((voter: string) => voter !== user.id);

   let deleted = false;

   if (request.voters.length === 0) {
      await request.deleteOne();
      deleted = true;
   } else {
      await request.save();
   }

   const summary = await getMonthlySummary(user.id, user.isProducer);

   return {
      deleted,
      request: deleted ? null : request,
      requestId,
      summary,
   };
}
