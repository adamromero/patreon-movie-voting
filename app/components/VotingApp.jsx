"use client";
import React, { useState, useEffect, useContext } from "react";
import RequestMovies from "./RequestMovies";
import MovieList from "./MovieList";
import FilterMovieList from "./FilterMovieList";
import SearchMoviesList from "./SearchMoviesList";
import CopyableList from "./CopyableList";
import { MovieContext } from "@/context/MovieContext";

const VotingApp = ({ user, isUnderRequestLimit }) => {
   const { moviesList, checkIfUserUnderRequestLimit, isUserUnderRequestLimit } =
      useContext(MovieContext);

   const [open, setOpen] = useState(false);
   const onOpenModal = () => setOpen(true);
   const onCloseModal = () => setOpen(false);

   const [disableRequestButton, setDisableRequestButton] =
      useState(isUnderRequestLimit);

   let id, isProducer, isCreator;
   if (user) {
      ({ id, isProducer, isCreator } = user);
   }

   useEffect(() => {
      //if (!isCreator) {
      checkIfUserUnderRequestLimit(id, isProducer);
      //}
   }, [moviesList]);

   useEffect(() => {
      if (!isUserUnderRequestLimit && !open) {
         setDisableRequestButton(true);
      } else {
         setDisableRequestButton(false);
      }
   }, [open, isUserUnderRequestLimit]);

   return (
      <>
         <div className="flex flex-col my-[15px]">
            {user && (
               <div className="flex max-w-[430px]">
                  <div className="flex-1 mb-[15px]">
                     {moviesList.length ? (
                        !disableRequestButton ? (
                           <RequestMovies
                              user={user}
                              open={open}
                              onOpenModal={onOpenModal}
                              onCloseModal={onCloseModal}
                           />
                        ) : (
                           <div className="max-w-[200px] w-full bg-[#262626] text-white text-center cursor-not-allowed py-1 px-3">
                              Limit Reached
                           </div>
                        )
                     ) : (
                        <div className="max-w-[200px] w-full bg-[#262626] text-white text-center cursor-not-allowed py-1 px-3">
                           <div className="loader button-loader"></div>
                        </div>
                     )}
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
      </>
   );
};

export default VotingApp;
