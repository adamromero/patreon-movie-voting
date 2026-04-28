import connectDB from "@/lib/connectDB";
import Movie from "@/models/movieModel";

export async function updateHoliday({
   requestId,
   holiday,
}: {
   requestId: string;
   holiday: "halloween" | "christmas";
}) {
   await connectDB();
   const request = await Movie.findByIdAndUpdate(requestId);

   if (!request) {
      throw new Error("Request not found");
   }

   if (holiday === "halloween") {
      request.isHalloween = !request.isHalloween;
   }

   if (holiday === "christmas") {
      request.isChristmas = !request.isChristmas;
   }

   await request.save();
   return request;
}
