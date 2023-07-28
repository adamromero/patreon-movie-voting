import React, { useContext } from "react";
import { MovieContext } from "@/context/MovieContext";

const MovieCount = () => {
   const { moviesList } = useContext(MovieContext);

   return (
      <div className="flex gap-3 mb-[10px]">
         <div>Total count: {moviesList.length}</div>
         <div>
            Not watched: {moviesList.filter((movie) => !movie.isWatched).length}
         </div>
         <div>
            Watched: {moviesList.filter((movie) => movie.isWatched).length}
         </div>
      </div>
   );
};

export default MovieCount;
