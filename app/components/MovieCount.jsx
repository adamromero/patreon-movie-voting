import React from "react";
import useRetrieveMovies from "../hooks/useRetrieveMovies";

const MovieCount = () => {
   const moviesList = useRetrieveMovies();

   return (
      <div className="flex gap-3 mb-[15px]">
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
