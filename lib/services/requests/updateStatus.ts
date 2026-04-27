import Movie from "@/models/movieModel";

export async function updateStatus({
   requestId,
   status,
}: {
   requestId: string;
   status: "channel" | "seen" | "rewatch" | "rewatchFriend" | "unseen";
}) {
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

   return request;
}
