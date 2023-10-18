"use client";
import React, { useState, useEffect, useContext } from "react";
import { MovieContext } from "@/context/MovieContext";
import {
   genre,
   status,
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
   } = useContext(MovieContext);

   //movies watched on the channel
   const [watchedState, setWatchedState] = useState({});

   //movies watched off the channel
   const [seenState, setSeenState] = useState({});

   const [isRequestFilterAscending, setIsRequestFilterAscending] =
      useState(false);
   const [isTitleFilterAscending, setIsTitleFilterAscending] = useState(true);
   const [isRatingFilterAscending, setIsRatingFilterAscending] = useState(true);
   const [currentPage, setCurrentPage] = useState(defaultCurrentPage);
   const [postsPerPage, setPostsPerPage] = useState(defaultRowsPerPage);
   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;

   useEffect(() => {
      let filteredList = [...moviesList];

      // if (filterOptions.watched === watched.Ascending) {
      //    //not watched first
      //    filteredList = filteredList.sort((a, b) => b.hasReacted - a.hasReacted);
      // } else if (filterOptions.watched === watched.Descending) {
      //    //watched first
      //    filteredList = filteredList.sort((a, b) => a.hasReacted - b.hasReacted);
      // } else {
      //    sethasReactedFilterAscending(true);
      // }

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
               parseFloat(b.data.imdbRating !== "N/A" ? b.data.imdbRating : 0) -
               parseFloat(a.data.imdbRating !== "N/A" ? a.data.imdbRating : 0)
         );
      } else if (filterOptions.rating === rating.Descending) {
         filteredList = filteredList.sort(
            (a, b) =>
               parseFloat(a.data.imdbRating !== "N/A" ? a.data.imdbRating : 0) -
               parseFloat(b.data.imdbRating !== "N/A" ? b.data.imdbRating : 0)
         );
      } else {
         setIsRatingFilterAscending(true);
      }

      if (filterOptions.chronological === chronological.Older) {
         filteredList = filteredList.sort(
            (a, b) => parseInt(a.data.Year) - parseInt(b.data.Year)
         );
      } else if (filterOptions.chronological === chronological.Newer) {
         filteredList = filteredList.sort(
            (a, b) => parseInt(b.data.Year) - parseInt(a.data.Year)
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
      } else if (filterOptions.genre === genre.Biography) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes(genre.Biography)
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
      } else if (filterOptions.genre === genre.Short) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes(genre.Short)
         );
      } else if (filterOptions.genre === genre.Sport) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes(genre.Sport)
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
      } else if (filterOptions.status === status.Watched) {
         filteredList = filteredList.filter((movie) => movie.hasReacted);
      } else if (filterOptions.status === status.Unseen) {
         filteredList = filteredList.filter(
            (movie) => !movie.hasSeen && !movie.hasReacted
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
      postsPerPage,
   ]);

   useEffect(() => {
      const watchedStateObject = {};
      const seenStateObject = {};
      filteredMoviesList.forEach((movie) => {
         watchedStateObject[movie._id] = movie.hasReacted;
         seenStateObject[movie._id] = movie.hasSeen;
      });
      setWatchedState(watchedStateObject);
      setSeenState(seenStateObject);
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

   // const handleWatchedSort = () => {
   //    setFilterOptions((prevOptions) => ({
   //       ...prevOptions,
   //       alphabetical: alphabetical.Default,
   //       votes: votes.Default,
   //       chronological: chronological.Default,
   //       added: added.Default,
   //       rating: rating.Default,
   //       watched: hasReactedFilterAscending
   //          ? watched.Ascending
   //          : watched.Descending,
   //    }));
   // };

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
      <div className="flex gap-[5px] sm:gap-[10px] lg:gap-0 bg-transparent lg:bg-black justify-between mb-[10px] lg:pl-[50px]">
         <div className="bg-black w-full lg:w-[295px]">
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
               <div className="hidden lg:block w-[80px]">
                  <div className="w-full text-left p-[10px]">Channel</div>
               </div>
               <div className="hidden lg:block w-[80px]">
                  <div className="w-full text-left p-[10px]">Seen</div>
               </div>
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
            .map((data) => (
               <div
                  key={data._id}
                  className="flex justify-between items-start lg:items-center mb-[10px] gap-[15px] bg-black p-[10px] lg:p-0 text-[16px]"
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
                     watchedState={watchedState}
                     setWatchedState={setWatchedState}
                     seenState={seenState}
                     setSeenState={setSeenState}
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
                  <div className="sticky top-0 z-10 bg-[#830483] py-[10px] flex flex-col-reverse md:flex-row items-center gap-[3px] md:gap-[15px]">
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
               <div>No results found</div>
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
