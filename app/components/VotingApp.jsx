"use client";
import React from "react";
import RequestMovies from "./RequestMovies";
import MovieList from "./MovieList";
import FilterMovieList from "./FilterMovieList";
import SearchMoviesList from "./SearchMoviesList";

const VotingApp = ({ user }) => {
   return (
      <div>
         <div className="flex flex-col my-[15px]">
            {user && <RequestMovies currentUser={user && user.id} />}
            <SearchMoviesList />
         </div>

         <FilterMovieList />
         <MovieList
            currentUser={user && user.id}
            isCreator={user && user.isCreator}
         />
      </div>
   );
};

export default VotingApp;
