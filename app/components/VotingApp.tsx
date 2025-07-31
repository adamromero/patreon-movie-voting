"use client";
import MovieList from "./MovieList";
import FilterMovieList from "./FilterMovieList";
import SearchMoviesList from "./SearchMoviesList";
import { User } from "../types/interfaces";

interface VotingAppProps {
   user?: User;
}

const VotingApp: React.FC<VotingAppProps> = ({ user }) => {
   let id, isCreator;
   if (user) {
      ({ id, isCreator } = user);
   }

   return (
      <>
         <div>
            <SearchMoviesList />
         </div>
         <FilterMovieList currentUser={id} />
         <MovieList currentUser={id} isCreator={user && isCreator} />
      </>
   );
};

export default VotingApp;
