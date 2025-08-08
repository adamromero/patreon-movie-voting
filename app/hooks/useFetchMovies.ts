import React, { useEffect, useContext } from "react";
import { useBoundStore } from "@/stores/useBoundStore";

const useFetchMovies = () => {
   const { moviesList, fetchMovies } = useBoundStore();

   useEffect(() => {
      fetchMovies();
   }, []);

   return moviesList;
};

export default useFetchMovies;
