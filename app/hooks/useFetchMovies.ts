import React, { useEffect } from "react";
import { useMovieContext } from "@/context/MovieContext";

const useFetchMovies = () => {
   const { moviesList, fetchMovies } = useMovieContext();

   useEffect(() => {
      fetchMovies();
   }, []);

   return moviesList;
};

export default useFetchMovies;
