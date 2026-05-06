import connectDB from "@/lib/connectDB";
import { getMonthlySummary } from "@/lib/db/requests";
import Movie from "@/models/movieModel";
import { User } from "@/app/types/user";

export async function updateStatus({
   requestId,
   status,
   user,
}: {
   requestId: string;
   status: "channel" | "seen" | "rewatch" | "rewatchFriend" | "unseen";
   user: User;
}) {
   await connectDB();

   const channel = status === "channel";
   const seen = status === "seen";
   const rewatch = status === "rewatch";
   const rewatchFriend = status === "rewatchFriend";
   const unseen = status === "unseen";

   const request = await Movie.findByIdAndUpdate(
      requestId,
      {
         hasReacted: unseen ? false : channel,
         hasSeen: unseen ? false : seen,
         isRewatch: unseen ? false : rewatch,
         isRewatchFriend: unseen ? false : rewatchFriend,
      },
      { new: true },
   );

   if (!request) {
      throw new Error("Request not found");
   }

   const summary = await getMonthlySummary(user);

   return { request, summary };
}
