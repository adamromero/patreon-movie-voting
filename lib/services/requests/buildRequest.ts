import { fetchMovieDetails, fetchTVDetails } from "@/lib/external/tmdb/details";
import { APIMovieData } from "@/app/types/movie";

interface MinimalAPIData {
   id: number;
   mediaType: "movie" | "tv";
}

export async function buildRequestPayload({
   request,
   userId,
}: {
   request: MinimalAPIData;
   userId: string;
}) {
   const data =
      request.mediaType === "movie"
         ? await fetchMovieDetails(request.id)
         : await fetchTVDetails(request.id);

   return {
      data,
      voters: [userId],
      requester: userId,
      isHalloween: false,
      isChristmas: data?.Title?.includes("Christmas"),
      hasReacted: false,
      hasSeen: false,
      isRewatch: false,
      isRewatchFriend: false,
      links: { patreon: "", youtube: "" },
   };
}
