import React, { useEffect, useContext } from "react";
import { MovieContext } from "@/context/MovieContext";

const useRetrieveMovies = () => {
   const { moviesList, getMovieVotes } = useContext(MovieContext);

   useEffect(() => {
      getMovieVotes();
   }, []);

   return moviesList;
};

export default useRetrieveMovies;
