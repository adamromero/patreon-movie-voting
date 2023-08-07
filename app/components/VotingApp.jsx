"use client";
import React, { useState } from "react";
import RequestMovies from "./RequestMovies";
import MovieList from "./MovieList";
import FilterMovieList from "./FilterMovieList";
import SearchMoviesList from "./SearchMoviesList";
import MovieCount from "./MovieCount";

const VotingApp = ({ user }) => {
   const [searchTitle, setSearchTitle] = useState("");
   const [searchDirector, setSearchDirector] = useState("");
   const [searchActor, setSearchActor] = useState("");

   return (
      <div>
         <div className="flex flex-col gap-[10px] mb-[15px]">
            {user && <RequestMovies currentUser={user && user.id} />}
            <SearchMoviesList
               searchTitle={searchTitle}
               setSearchTitle={setSearchTitle}
               searchDirector={searchDirector}
               setSearchDirector={setSearchDirector}
               searchActor={searchActor}
               setSearchActor={setSearchActor}
            />
         </div>
         <MovieCount />
         <FilterMovieList />
         <MovieList
            currentUser={user && user.id}
            isCreator={user && user.creatorId === user.id}
            searchTitle={searchTitle}
            searchDirector={searchDirector}
            searchActor={searchActor}
         />
      </div>
   );
};

export default VotingApp;
