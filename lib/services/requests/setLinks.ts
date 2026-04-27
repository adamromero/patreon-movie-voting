import Movie from "@/models/movieModel";

export async function setLinks({
   requestId,
   links,
}: {
   requestId: string;
   links: { patreon: string; youtube: string };
}) {
   const request = await Movie.findByIdAndUpdate(
      requestId,
      {
         links,
      },
      { new: true },
   );

   if (!request) {
      throw new Error("Request not found");
   }

   return request;
}
