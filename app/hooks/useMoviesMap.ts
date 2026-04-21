import { useMovieState } from "@/context/movie.state";
import { useMemo } from "react";
import { Movie } from "../types/movie";

export const useMoviesMap = () => {
   const { moviesList } = useMovieState();

   return useMemo(() => {
      const map = new Map<string, Movie>();

      moviesList.forEach((movie) => {
         const key = `${movie.data.id}-${movie.data.Type}`;
         map.set(key, movie);
      });

      return map;
   }, [moviesList]);
};
