import { useMovieContext } from "@/context/MovieContext";
import { useMemo } from "react";

export const useRankedMovies = () => {
   const { requestsData } = useMovieContext();

   return useMemo(() => {
      const filtered = (requestsData?.requests ?? [])
         .filter((m) => !m.hasSeen && !m.hasReacted)
         .sort((a, b) => b.voters.length - a.voters.length);

      const rankings: Record<string, number> = {};

      filtered.forEach((movie, index) => {
         rankings[movie.data.imdbID ?? ""] = index + 1;
      });

      return rankings;
   }, [requestsData?.requests]);
};
