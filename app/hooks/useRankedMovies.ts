import { useMovieState } from "@/context/movie.state";
import { useMemo } from "react";

export const useRankedMovies = () => {
   const { moviesList } = useMovieState();

   return useMemo(() => {
      const filtered = moviesList
         .filter((m) => !m.hasSeen && !m.hasReacted)
         .sort((a, b) => b.voters.length - a.voters.length);

      const rankings: Record<string, number> = {};

      filtered.forEach((movie, index) => {
         rankings[movie.data.imdbID ?? ""] = index + 1;
      });

      return rankings;
   }, [moviesList]);
};
