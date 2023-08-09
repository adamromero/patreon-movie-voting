"use client";
import React from "react";
import RequestMovies from "./RequestMovies";
import MovieList from "./MovieList";
import FilterMovieList from "./FilterMovieList";
import SearchMoviesList from "./SearchMoviesList";
import MovieCount from "./MovieCount";

const VotingApp = ({ user }) => {
   return (
      <div>
         <div className="flex flex-col gap-[10px] mb-[15px]">
            {user && <RequestMovies currentUser={user && user.id} />}
            <SearchMoviesList />
         </div>
         <MovieCount />
         <FilterMovieList />
         <MovieList
            currentUser={user && user.id}
            isCreator={user && user.isCreator}
         />
      </div>
   );
};

export default VotingApp;
