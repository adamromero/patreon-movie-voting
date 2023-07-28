"use client";
import React, { useState } from "react";
import RequestMovies from "./RequestMovies";
import MovieList from "./MovieList";
import FilterMovieList from "./FilterMovieList";
import SearchMoviesList from "./SearchMoviesList";
import MovieCount from "./MovieCount";

const VotingApp = ({ user }) => {
   const [searchTitle, setSearchTitle] = useState("");

   return (
      <div>
         <div className="flex gap-[10px]">
            {user && <RequestMovies currentUser={user && user.id} />}
            <SearchMoviesList
               searchTitle={searchTitle}
               setSearchTitle={setSearchTitle}
            />
         </div>
         <MovieCount />
         <FilterMovieList />
         <MovieList
            currentUser={user && user.id}
            isCreator={user && user.creatorId === user.id}
            searchTitle={searchTitle}
         />
      </div>
   );
};

export default VotingApp;
