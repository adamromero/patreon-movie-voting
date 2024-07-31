"use client";
import React from "react";
import MovieList from "./MovieList";
import FilterMovieList from "./FilterMovieList";
import SearchMoviesList from "./SearchMoviesList";
import RequestsThisMonth from "./RequestsThisMonth";
import WelcomeSection from "./WelcomeSection";

const VotingApp = ({
   user,
   isUnderRequestLimit,
   seenRequests,
   channelRequests,
}) => {
   let id, isCreator;
   if (user) {
      ({ id, isCreator } = user);
   }

   return (
      <>
         <div className="flex flex-col justify-between lg:flex-row mb-[15px] gap-[15px]">
            <WelcomeSection
               user={user}
               isUnderRequestLimit={isUnderRequestLimit}
               seenRequests={seenRequests}
               channelRequests={channelRequests}
            />
            {user && <RequestsThisMonth userId={id} />}
         </div>
         <SearchMoviesList />
         <FilterMovieList />
         <MovieList currentUser={id} isCreator={isCreator} />
      </>
   );
};

export default VotingApp;
