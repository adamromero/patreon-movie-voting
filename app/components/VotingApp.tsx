"use client";
import MovieList from "./MovieList";
import FilterMovieList from "./FilterMovieList";
import SearchMoviesList from "./SearchMoviesList";
import { User } from "../types/user";

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
         <div className="flex gap-4">
            <div className="w-1/3 sticky top-0">
               <div className="sticky top-0 h-[300px] bg-black">
                  <div className="flex flex-col gap-2">
                     <input className="w-full p-[10px]" type="text" placeholder="Search titles" />
                     <input className="w-full p-[10px]" type="text" placeholder="Search directors" />
                     <input className="w-full p-[10px]" type="text" placeholder="Search top actors" />
                     <input className="w-full p-[10px]" type="text" placeholder="Search composers" />
                  </div>
               </div>
            </div>
            <MovieList currentUser={id} isCreator={user && isCreator} />
         </div>

      </>
   );
};

export default VotingApp;
