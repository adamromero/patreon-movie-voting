import React, { useEffect, useContext } from "react";
import { MovieContext } from "@/context/MovieContext";

const useFetchMovies = () => {
   const { moviesList, fetchMovies } = useContext(MovieContext);

   useEffect(() => {
      fetchMovies();
   }, []);

   return moviesList;
};

export default useFetchMovies;
