"use client";
import React, { useContext } from "react";
import MovieList from "./MovieList";
import FilterMovieList from "./FilterMovieList";
import SearchMoviesList from "./SearchMoviesList";
import RequestsThisMonth from "./RequestsThisMonth";
import WelcomeSection from "./WelcomeSection";
//import { MovieContext } from "@/context/MovieContext";

const VotingApp = ({
   user,
   isUnderRequestLimit,
   seenRequests,
   channelRequests,
   readOnlyRequests,
}) => {
   let id, isCreator;
   if (user) {
      ({ id, isCreator } = user);
   }

   //const { moviesList } = useContext(MovieContext);

   return (
      <>
         {/* <div className="flex flex-col justify-between lg:flex-row mb-[15px] gap-[15px]">
            {moviesList.length ? (
               <>
                  <WelcomeSection
                     user={user}
                     moviesList={moviesList}
                     isUnderRequestLimit={isUnderRequestLimit}
                     seenRequests={seenRequests}
                     channelRequests={channelRequests}
                  />
                  {user && <RequestsThisMonth userId={id} />}
               </>
            ) : (
               <div className="flex justify-center flex-1 my-[32px]">
                  <div className="loader loader--intro"></div>
               </div>
            )}
         </div> */}
         <div className="my-[20px] text-[18px]">
            Requesting and voting is paused temporarily due to technical issues,
            but will be returning soon. Apologies for the inconvenience.
            <div>The current list can be viewed below.</div>
         </div>
         <SearchMoviesList />
         <FilterMovieList />
         <MovieList
            currentUser={id}
            isCreator={isCreator}
            readOnlyRequests={readOnlyRequests}
         />
      </>
   );
};

export default VotingApp;
