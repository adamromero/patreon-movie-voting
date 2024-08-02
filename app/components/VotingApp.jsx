"use client";
import MovieList from "./MovieList";
import FilterMovieList from "./FilterMovieList";
import SearchMoviesList from "./SearchMoviesList";

const VotingApp = ({ user }) => {
   let id, isCreator;
   if (user) {
      ({ id, isCreator } = user);
   }

   return (
      <>
         <div>
            <SearchMoviesList />
         </div>
         <FilterMovieList />
         <MovieList currentUser={id} isCreator={user && isCreator} />
      </>
   );
};

export default VotingApp;
