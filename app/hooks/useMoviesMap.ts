import { useMovieContext } from "@/context/MovieContext";
import { useMemo } from "react";
import { Movie } from "../types/movie";

export const useMoviesMap = () => {
   const { moviesList } = useMovieContext();

   return useMemo(() => {
      const map = new Map<string, Movie>();

      moviesList.forEach((movie) => {
         const key = `${movie.data.id}-${movie.data.Type}`;
         map.set(key, movie);
      });

      return map;
   }, [moviesList]);
};
