"use client";
import React, { useState, useEffect } from "react";
import { useMovieContext } from "@/context/MovieContext";

import {
   chronological,
   added,
   alphabetical,
   rating,
   votes,
   published,
} from "@/app/utils/filtersOptions";
import MovieListEntry from "./MovieListEntry";
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";
import { AiOutlineNumber } from "react-icons/ai";
import PageControls from "./PageControls";
import { useFilteredMovies } from "../hooks/useFilteredMovies";

const MovieList = () => {
   const defaultCurrentPage = 1;
   const defaultRowsPerPage = 50;

   const { user, moviesList, sortOptions, setSortOptions } = useMovieContext();

   const currentUser = user && user.id;
   const isCreator = user && user.isCreator;

   const [requestStatusState, setRequestStatusState] = useState({});
   const [isRequestFilterAscending, setIsRequestFilterAscending] =
      useState(true);
   const [isTitleFilterAscending, setIsTitleFilterAscending] = useState(true);
   const [isRatingFilterAscending, setIsRatingFilterAscending] = useState(true);
   const [currentPage, setCurrentPage] = useState(defaultCurrentPage);
   const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
   const indexOfLastPost = currentPage * rowsPerPage;
   const indexOfFirstPost = indexOfLastPost - rowsPerPage;
   const [isRankingOn, setIsRankingOn] = useState(false);
   const filteredMovies = useFilteredMovies(currentUser);

   useEffect(() => {
      const maxPage = Math.ceil(filteredMovies.length / rowsPerPage);
      if (currentPage > maxPage) {
         setCurrentPage(maxPage || 1);
      }
   }, [filteredMovies, currentPage, rowsPerPage]);

   useEffect(() => {
      const requestStateObject: {
         [key: string]: {
            hasReacted: boolean;
            hasSeen: boolean;
            isRewatch: boolean;
            isRewatchFriend: boolean;
            isUnseen: boolean;
            isHalloween: boolean;
            isChristmas: boolean;
         };
      } = {};

      filteredMovies.forEach((movie) => {
         requestStateObject[movie._id] = {
            hasReacted: movie.hasReacted,
            hasSeen: movie.hasSeen,
            isRewatch: movie.isRewatch,
            isRewatchFriend: movie.isRewatchFriend,
            isUnseen:
               !movie.hasReacted &&
               !movie.hasSeen &&
               !movie.isRewatch &&
               !movie.isRewatchFriend,
            isHalloween: movie.isHalloween,
            isChristmas: movie.isChristmas,
         };
      });

      setRequestStatusState(requestStateObject);
   }, [filteredMovies]);

   const handleTitleSort = () => {
      setSortOptions({
         votes: votes.Default,
         rating: rating.Default,
         chronological: chronological.Default,
         added: added.Default,
         published: published.Default,
         alphabetical: isTitleFilterAscending
            ? alphabetical.Ascending
            : alphabetical.Descending,
      });
   };

   const handleVotesSort = () => {
      setSortOptions({
         alphabetical: alphabetical.Default,
         rating: rating.Default,
         chronological: chronological.Default,
         added: added.Default,
         published: published.Default,
         votes: isRequestFilterAscending ? votes.Ascending : votes.Descending,
      });
   };

   const handleRatingsSort = () => {
      setSortOptions({
         alphabetical: alphabetical.Default,
         chronological: chronological.Default,
         added: added.Default,
         published: published.Default,
         votes: votes.Default,
         rating: isRatingFilterAscending ? rating.Ascending : rating.Descending,
      });
   };

   const tableHead = (
      <div className="flex gap-[5px] sm:gap-[10px] lg:gap-0 bg-transparent lg:bg-black justify-between mb-[10px]">
         <div className="flex bg-black w-full lg:w-[345px]">
            <button
               className="hidden lg:flex w-[50px] px-[17px] items-center justify-center cursor-pointer"
               onClick={() => setIsRankingOn(!isRankingOn)}
               title={isRankingOn ? "Turn off ranking" : "Turn on ranking"}
            >
               <AiOutlineNumber className={isRankingOn ? "border-[1px]" : ""} />
            </button>
            <button
               onClick={() => {
                  setIsTitleFilterAscending(!isTitleFilterAscending);
                  handleTitleSort();
               }}
               className="flex justify-center lg:block w-full text-[14px] sm:text-[16px] lg:text-left px-[5px] py-[10px] sm:p-[10px]"
            >
               <div className="flex gap-[5px] items-center">
                  {sortOptions.alphabetical === alphabetical.Default && (
                     <FaSort />
                  )}
                  {sortOptions.alphabetical === alphabetical.Ascending && (
                     <FaSortUp />
                  )}
                  {sortOptions.alphabetical === alphabetical.Descending && (
                     <FaSortDown />
                  )}
                  Title
               </div>
            </button>
         </div>
         <div className="hidden lg:block w-[220px]">
            <div className="w-full text-left p-[10px]">Genre</div>
         </div>
         <div className="bg-black w-full lg:w-[80px]">
            <button
               onClick={() => {
                  setIsRatingFilterAscending(!isRatingFilterAscending);
                  handleRatingsSort();
               }}
               className="flex justify-center lg:block w-full text-[14px] sm:text-[16px] lg:text-left px-[5px] py-[10px] sm:p-[10px]"
            >
               <div className="flex gap-[5px] items-center">
                  {sortOptions.rating === rating.Default && <FaSort />}
                  {sortOptions.rating === rating.Ascending && <FaSortUp />}
                  {sortOptions.rating === rating.Descending && <FaSortDown />}
                  Rating
               </div>
            </button>
         </div>
         <div className="bg-black w-full lg:w-[100px]">
            <button
               onClick={() => {
                  setIsRequestFilterAscending(!isRequestFilterAscending);
                  handleVotesSort();
               }}
               className="flex justify-center lg:block w-full text-[14px] sm:text-[16px] lg:text-left px-[5px] py-[10px] sm:p-[10px]"
            >
               <div className="flex gap-[5px] items-center">
                  {sortOptions.votes === votes.Default && <FaSort />}
                  {sortOptions.votes === votes.Ascending && <FaSortUp />}
                  {sortOptions.votes === votes.Descending && <FaSortDown />}
                  Votes
               </div>
            </button>
         </div>
         <div className="hidden lg:block lg:w-[100px]"></div>
         {isCreator && (
            <>
               <div className="hidden lg:block w-[80px]">
                  <div className="w-full text-left p-[10px]">Delete</div>
               </div>
            </>
         )}
      </div>
   );

   const tableBody = (
      <div>
         {filteredMovies
            .slice(indexOfFirstPost, indexOfLastPost)
            .map((data) => (
               <div
                  key={data._id}
                  className="relative flex justify-between items-start lg:items-center mb-[10px] gap-[15px] bg-black p-[10px] lg:p-0 text-[16px]"
                  style={{
                     backgroundColor:
                        data.hasReacted || data.hasSeen
                           ? "rgb(0 0 0 / 40%)"
                           : "#000",
                     position: "relative",
                  }}
               >
                  <MovieListEntry
                     data={data}
                     currentUser={currentUser ?? ""}
                     isCreator={isCreator ?? false}
                     isRankingOn={isRankingOn}
                     requestStatusState={requestStatusState}
                  />
               </div>
            ))}
      </div>
   );

   return (
      <>
         {moviesList.length ? (
            filteredMovies.length ? (
               <>
                  <div className="sticky top-[-1px] z-50 bg-[#830483] py-[10px] flex flex-col-reverse md:flex-row items-center gap-[3px] md:gap-[15px]">
                     <PageControls
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                        filteredListLength={filteredMovies.length}
                     />
                  </div>
                  <div>
                     {tableHead}
                     {tableBody}
                  </div>
               </>
            ) : (
               <div className="text-[18px]">No results found</div>
            )
         ) : (
            <div className="relative flex justify-center items-center h-[100px] sm:h-[200px] mb-[100px]">
               <div className="loader relative"></div>
            </div>
         )}
      </>
   );
};

export default MovieList;
