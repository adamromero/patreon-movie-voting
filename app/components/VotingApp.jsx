"use client";
import React, { useState, useEffect, useContext } from "react";
import RequestMovies from "./RequestMovies";
import MovieList from "./MovieList";
import FilterMovieList from "./FilterMovieList";
import SearchMoviesList from "./SearchMoviesList";
import CopyableList from "./CopyableList";
import { MovieContext } from "@/context/MovieContext";

const VotingApp = ({ user, isUnderRequestLimit }) => {
   const { checkIfUserUnderRequestLimit, isUserUnderRequestLimit } =
      useContext(MovieContext);

   const [open, setOpen] = useState(false);
   const onOpenModal = () => setOpen(true);
   const onCloseModal = () => setOpen(false);

   //const [hideRequestButton, setHideRequestButton] = useState(false);

   let id, isProducer, isCreator;
   if (user) {
      ({ id, isProducer, isCreator } = user);
      //if (!isCreator) {
      checkIfUserUnderRequestLimit(id, isProducer);
      //}
   }

   // useEffect(() => {
   //    if (!isUserUnderRequestLimit && !open) {
   //       setHideRequestButton(true);
   //    } else {
   //       setHideRequestButton(false);
   //    }
   // }, [open, isUserUnderRequestLimit]);

   return (
      <div>
         <div className="flex flex-col my-[15px]">
            {user && isUnderRequestLimit && (
               <div className="flex max-w-[430px]">
                  <div className="flex-1 mb-[15px]">
                     <RequestMovies
                        user={user}
                        open={open}
                        onOpenModal={onOpenModal}
                        onCloseModal={onCloseModal}
                     />
                  </div>

                  {user && isCreator && false && (
                     <div className="flex-1 mb-[15px]">
                        <CopyableList />
                     </div>
                  )}
               </div>
            )}

            <SearchMoviesList />
         </div>
         <FilterMovieList />
         <MovieList currentUser={id} isCreator={user && isCreator} />
      </div>
   );
};

export default VotingApp;
