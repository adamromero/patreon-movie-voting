"use client";
import React, { useState, useEffect, useContext } from "react";
import { MovieContext } from "@/context/MovieContext";
import {
   genre,
   status,
   requests,
   type,
   chronological,
   added,
   alphabetical,
   rating,
   votes,
   watched,
} from "@/app/utils/filtersOptions";
import MovieListEntry from "./MovieListEntry";
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";
import { AiOutlineNumber } from "react-icons/ai";
import useRetrieveMovies from "../hooks/useRetrieveMovies";
import Pagination from "./Pagination";

const MovieList = ({ currentUser, isCreator }) => {
   const defaultCurrentPage = 1;
   const defaultRowsPerPage = 50;
   const moviesList = useRetrieveMovies();

   const {
      filteredMoviesList,
      setFilteredMoviesList,
      filterOptions,
      setFilterOptions,
      searchTitle,
      searchDirector,
      searchActor,
      searchComposer,
      rankedMovies,
   } = useContext(MovieContext);

   const [channelState, setChannelState] = useState({});
   const [seenState, setSeenState] = useState({});
   const [rewatchState, setRewatchState] = useState({});

   const [requestStatus, setRequestStatus] = useState({});

   const [isRequestFilterAscending, setIsRequestFilterAscending] =
      useState(false);
   const [isTitleFilterAscending, setIsTitleFilterAscending] = useState(true);
   const [isRatingFilterAscending, setIsRatingFilterAscending] = useState(true);
   const [currentPage, setCurrentPage] = useState(defaultCurrentPage);
   const [postsPerPage, setPostsPerPage] = useState(defaultRowsPerPage);
   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;
   const [isRankingOn, setIsRankingOn] = useState(false);

   useEffect(() => {
      let filteredList = [...moviesList];

      if (filterOptions.votes === votes.Ascending) {
         filteredList = filteredList.sort(
            (a, b) => b?.voters?.length - a?.voters?.length
         );
      } else if (filterOptions.votes === votes.Descending) {
         filteredList = filteredList.sort(
            (a, b) => a?.voters?.length - b?.voters?.length
         );
      } else {
         setIsRequestFilterAscending(true);
      }

      if (filterOptions.alphabetical === alphabetical.Ascending) {
         filteredList = filteredList.sort((a, b) => {
            if (a.data.Title < b.data.Title) {
               return -1;
            }
            return 0;
         });
      } else if (filterOptions.alphabetical === alphabetical.Descending) {
         filteredList = filteredList
            .sort((a, b) => {
               if (a.data.Title < b.data.Title) {
                  return -1;
               }
               return 0;
            })
            .reverse();
      } else {
         setIsTitleFilterAscending(true);
      }

      if (filterOptions.rating === rating.Ascending) {
         filteredList = filteredList.sort(
            (a, b) =>
               parseFloat(b.data.Rating ? b.data.Rating : 0) -
               parseFloat(a.data.Rating ? a.data.Rating : 0)
         );
      } else if (filterOptions.rating === rating.Descending) {
         filteredList = filteredList.sort(
            (a, b) =>
               parseFloat(a.data.Rating ? a.data.Rating : 0) -
               parseFloat(b.data.Rating ? b.data.Rating : 0)
         );
      } else {
         setIsRatingFilterAscending(true);
      }

      if (filterOptions.chronological === chronological.Older) {
         filteredList = filteredList.sort(
            (a, b) =>
               new Date(a.data.Release ? a.data.Release : "1900-01-01") -
               new Date(b.data.Release ? b.data.Release : "1900-01-01")
         );
      } else if (filterOptions.chronological === chronological.Newer) {
         filteredList = filteredList.sort(
            (a, b) =>
               new Date(b.data.Release ? b.data.Release : "1900-01-01") -
               new Date(a.data.Release ? a.data.Release : "1900-01-01")
         );
      }

      if (filterOptions.added === added.Older) {
         filteredList = filteredList.sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
         );
      } else if (filterOptions.added === added.Newer) {
         filteredList = filteredList.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
         );
      }

      if (filterOptions.type === type.Movie) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Type.includes(type.Movie.toLowerCase())
         );
      } else if (filterOptions.type === type.Series) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Type.includes(type.Series.toLowerCase())
         );
      }

      if (filterOptions.genre === genre.Action) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes(genre.Action)
         );
      } else if (filterOptions.genre === genre.Adventure) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes(genre.Adventure)
         );
      } else if (filterOptions.genre === genre.Animation) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes(genre.Animation)
         );
      } else if (filterOptions.genre === genre.Comedy) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes(genre.Comedy)
         );
      } else if (filterOptions.genre === genre.Crime) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes(genre.Crime)
         );
      } else if (filterOptions.genre === genre.Documentary) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes(genre.Documentary)
         );
      } else if (filterOptions.genre === genre.Drama) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes(genre.Drama)
         );
      } else if (filterOptions.genre === genre.SciFi) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes(genre.SciFi)
         );
      } else if (filterOptions.genre === genre.Family) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes(genre.Family)
         );
      } else if (filterOptions.genre === genre.Fantasy) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes(genre.Fantasy)
         );
      } else if (filterOptions.genre === genre.History) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes(genre.History)
         );
      } else if (filterOptions.genre === genre.Horror) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes(genre.Horror)
         );
      } else if (filterOptions.genre === genre.Mystery) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes(genre.Mystery)
         );
      } else if (filterOptions.genre === genre.Music) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes(genre.Music)
         );
      } else if (filterOptions.genre === genre.Thriller) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes(genre.Thriller)
         );
      } else if (filterOptions.genre === genre.Romance) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes(genre.Romance)
         );
      } else if (filterOptions.genre === genre.War) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes(genre.War)
         );
      } else if (filterOptions.genre === genre.Western) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes(genre.Western)
         );
      }

      if (filterOptions.status === status.Seen) {
         filteredList = filteredList.filter((movie) => movie.hasSeen);
      } else if (filterOptions.status === status.OnChannel) {
         filteredList = filteredList.filter((movie) => movie.hasReacted);
      } else if (filterOptions.status === status.Rewatch) {
         filteredList = filteredList.filter((movie) => movie.isRewatch);
      } else if (filterOptions.status === status.Unseen) {
         filteredList = filteredList.filter(
            (movie) => !movie.hasSeen && !movie.hasReacted && !movie.isRewatch
         );
      } else if (filterOptions.status === status.Votable) {
         filteredList = filteredList.filter(
            (movie) => (!movie.hasSeen && !movie.hasReacted) || movie.isRewatch
         );
      }

      if (filterOptions.requests === requests.MyRequests) {
         filteredList = filteredList.filter(
            (movie) => movie.requester === currentUser
         );
      } else if (filterOptions.requests === requests.Voted) {
         filteredList = filteredList.filter((movie) =>
            movie.voters.includes(currentUser)
         );
      } else if (filterOptions.requests === requests.NotVoted) {
         filteredList = filteredList.filter(
            (movie) => !movie.voters.includes(currentUser)
         );
      }

      if (searchTitle) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Title.toLowerCase().includes(searchTitle.toLowerCase())
         );
      }

      if (searchDirector) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Director.toLowerCase().includes(
               searchDirector.toLowerCase()
            )
         );
      }

      if (searchActor) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Actors.toLowerCase().includes(searchActor.toLowerCase())
         );
      }

      if (searchComposer) {
         filteredList = filteredList.filter((movie) =>
            movie?.data?.Composer?.toLowerCase().includes(
               searchComposer.toLowerCase()
            )
         );
      }

      const initialPage =
         currentPage <= Math.ceil(filteredList.length / postsPerPage)
            ? currentPage
            : Math.ceil(filteredList.length / postsPerPage);
      setCurrentPage(initialPage > 0 ? initialPage : 1);
      setFilteredMoviesList(filteredList);
   }, [
      moviesList,
      filterOptions,
      searchTitle,
      searchDirector,
      searchActor,
      searchComposer,
      postsPerPage,
   ]);

   useEffect(() => {
      const channelStateObject = {};
      const seenStateObject = {};
      const rewatchStateObject = {};

      const requestStateObject = {};

      filteredMoviesList.forEach((movie) => {
         channelStateObject[movie._id] = movie.hasReacted;
         seenStateObject[movie._id] = movie.hasSeen;
         rewatchStateObject[movie._id] = movie.isRewatch;

         requestStateObject[movie._id] = {
            hasReacted: movie.hasReacted,
            hasSeen: movie.hasSeen,
            isRewatch: movie.isRewatch,
            isUnseen: !movie.hasReacted && !movie.hasSeen && !movie.isRewatch,
         };
      });

      setChannelState(channelStateObject);
      setSeenState(seenStateObject);
      setRewatchState(rewatchStateObject);

      setRequestStatus(requestStateObject);
   }, [filteredMoviesList]);

   const handleTitleSort = () => {
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         votes: votes.Default,
         rating: rating.Default,
         chronological: chronological.Default,
         added: added.Default,
         watched: watched.Default,
         alphabetical: isTitleFilterAscending
            ? alphabetical.Ascending
            : alphabetical.Descending,
      }));
   };

   const handleRequestsSort = () => {
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         alphabetical: alphabetical.Default,
         rating: rating.Default,
         chronological: chronological.Default,
         added: added.Default,
         watched: watched.Default,
         votes: isRequestFilterAscending ? votes.Ascending : votes.Descending,
      }));
   };

   const handleRatingsSort = () => {
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         alphabetical: alphabetical.Default,
         votes: votes.Default,
         chronological: chronological.Default,
         added: added.Default,
         watched: watched.Default,
         rating: isRatingFilterAscending ? rating.Ascending : rating.Descending,
      }));
   };

   const firstPage = () => setCurrentPage(1);
   const lastPage = () =>
      setCurrentPage(Math.ceil(filteredMoviesList.length / postsPerPage));
   const decrementPage = () =>
      setCurrentPage((pageNumber) =>
         pageNumber > 1 ? pageNumber - 1 : pageNumber
      );
   const incrementPage = () => {
      setCurrentPage((pageNumber) =>
         pageNumber < Math.ceil(filteredMoviesList.length / postsPerPage)
            ? pageNumber + 1
            : pageNumber
      );
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
                  {filterOptions.alphabetical === alphabetical.Default && (
                     <FaSort />
                  )}
                  {filterOptions.alphabetical === alphabetical.Ascending && (
                     <FaSortUp />
                  )}
                  {filterOptions.alphabetical === alphabetical.Descending && (
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
                  {filterOptions.rating === rating.Default && <FaSort />}
                  {filterOptions.rating === rating.Ascending && <FaSortUp />}
                  {filterOptions.rating === rating.Descending && <FaSortDown />}
                  Rating
               </div>
            </button>
         </div>
         <div className="bg-black w-full lg:w-[100px]">
            <button
               onClick={() => {
                  setIsRequestFilterAscending(!isRequestFilterAscending);
                  handleRequestsSort();
               }}
               className="flex justify-center lg:block w-full text-[14px] sm:text-[16px] lg:text-left px-[5px] py-[10px] sm:p-[10px]"
            >
               <div className="flex gap-[5px] items-center">
                  {filterOptions.votes === votes.Default && <FaSort />}
                  {filterOptions.votes === votes.Ascending && <FaSortUp />}
                  {filterOptions.votes === votes.Descending && <FaSortDown />}
                  Requests
               </div>
            </button>
         </div>
         <div className="hidden lg:block lg:w-[100px]"></div>
         {isCreator && (
            <>
               {/* <div className="hidden lg:block w-[80px]">
                  <div className="w-full text-left p-[10px]">Channel</div>
               </div>
               <div className="hidden lg:block w-[80px]">
                  <div className="w-full text-left p-[10px]">Seen</div>
               </div> */}
               <div className="hidden lg:block w-[80px]">
                  <div className="w-full text-left p-[10px]">Delete</div>
               </div>
            </>
         )}
      </div>
   );

   const tableBody = (
      <div>
         {filteredMoviesList
            .slice(indexOfFirstPost, indexOfLastPost)
            .map((data, index) => (
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
                     currentUser={currentUser}
                     isCreator={isCreator}
                     ranking={index + 1 + postsPerPage * (currentPage - 1)}
                     isRankingOn={isRankingOn}
                     channelState={channelState}
                     setChannelState={setChannelState}
                     seenState={seenState}
                     setSeenState={setSeenState}
                     rewatchState={rewatchState}
                     setRewatchState={setRewatchState}
                     requestStatus={requestStatus}
                     setRequestStatus={setRequestStatus}
                  />
               </div>
            ))}
      </div>
   );

   return (
      <>
         {moviesList.length ? (
            filteredMoviesList.length ? (
               <>
                  <div className="sticky top-0 z-50 bg-[#830483] py-[10px] flex flex-col-reverse md:flex-row items-center gap-[3px] md:gap-[15px]">
                     <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={filteredMoviesList.length}
                        currentPage={currentPage}
                        firstPage={firstPage}
                        lastPage={lastPage}
                        decrementPage={decrementPage}
                        incrementPage={incrementPage}
                     />
                     <div>Results: {filteredMoviesList.length}</div>
                     <div className="flex gap-[5px]">
                        <label htmlFor="postsPerPage">Rows per page</label>
                        <select
                           className="text-black"
                           name="postsPerPage"
                           id="postsPerPage"
                           value={postsPerPage}
                           onChange={(e) =>
                              setPostsPerPage(parseInt(e.target.value))
                           }
                        >
                           <option value="10">10</option>
                           <option value="20">20</option>
                           <option value="50">50</option>
                           <option value="100">100</option>
                        </select>
                     </div>
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
