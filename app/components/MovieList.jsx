"use client";
import React, { useState, useEffect, useContext, useMemo } from "react";
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

import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFFile from "./PDFFile";

const MovieList = ({ currentUser, isCreator, searchTitle }) => {
   const moviesList = useRetrieveMovies();
   const { filterOptions, setFilterOptions } = useContext(MovieContext);
   const [filteredMoviesList, setFilteredMoviesList] = useState([]);
   const [watchedState, setWatchedState] = useState({});
   const [isRequestFilterAscending, setIsRequestFilterAscending] =
      useState(true);
   const [isTitleFilterAscending, setIsTitleFilterAscending] = useState(true);
   const [isRatingFilterAscending, setIsRatingFilterAscending] = useState(true);
   const [isWatchedFilterAscending, setIsWatchedFilterAscending] =
      useState(true);
   const [currentPage, setCurrentPage] = useState(1);
   const [postsPerPage] = useState(20);
   const indexOfLastPost = currentPage * postsPerPage;
   const indexOfFirstPost = indexOfLastPost - postsPerPage;

   useEffect(() => {
      let filteredList = [...moviesList];

      if (filterOptions.watched === watched.Ascending) {
         //not watched first
         filteredList = filteredList.sort((a, b) => b.isWatched - a.isWatched);
      } else if (filterOptions.watched === watched.Descending) {
         //watched first
         filteredList = filteredList.sort((a, b) => a.isWatched - b.isWatched);
      } else {
         setIsWatchedFilterAscending(true);
      }

      if (filterOptions.votes === votes.Ascending) {
         filteredList = filteredList.sort(
            (a, b) => b.voters.length - a.voters.length
         );
      } else if (filterOptions.votes === votes.Descending) {
         filteredList = filteredList.sort(
            (a, b) => a.voters.length - b.voters.length
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
               parseFloat(b.data.imdbRating) - parseFloat(a.data.imdbRating)
         );
      } else if (filterOptions.rating === rating.Descending) {
         filteredList = filteredList.sort(
            (a, b) =>
               parseFloat(a.data.imdbRating) - parseFloat(b.data.imdbRating)
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

      if (filterOptions.status === status.Watched) {
         filteredList = filteredList.filter((movie) => movie.isWatched);
      } else if (filterOptions.status === status.Unwatched) {
         filteredList = filteredList.filter((movie) => !movie.isWatched);
      }

      if (searchTitle) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Title.toLowerCase().includes(searchTitle.toLowerCase())
         );
      }

      const initialPage =
         currentPage <= Math.ceil(filteredList.length / postsPerPage)
            ? currentPage
            : Math.ceil(filteredList.length / postsPerPage);
      setCurrentPage(initialPage > 0 ? initialPage : 1);
      setFilteredMoviesList(filteredList);
   }, [moviesList, filterOptions, searchTitle]);

   useEffect(() => {
      const watchedStateObject = {};
      filteredMoviesList.forEach((movie) => {
         watchedStateObject[movie._id] = movie.isWatched;
      });
      setWatchedState(watchedStateObject);
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

   const handleWatchedSort = () => {
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         alphabetical: alphabetical.Default,
         votes: votes.Default,
         chronological: chronological.Default,
         added: added.Default,
         rating: rating.Default,
         watched: isWatchedFilterAscending
            ? watched.Ascending
            : watched.Descending,
      }));
   };

   const paginate = (pageNumber) => setCurrentPage(pageNumber);

   const tableHead = (
      <div className="flex justify-between bg-black mb-[10px]">
         <div className="w-[75px]"></div>
         <div className="w-[225px]">
            <button
               className="w-full text-left p-[10px] pl-0"
               onClick={() => {
                  setIsTitleFilterAscending(!isTitleFilterAscending);
                  handleTitleSort();
               }}
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
         <div className="w-[200px]">
            <div className="w-full text-left p-[10px]">Genre</div>
         </div>
         <div className="w-[80px]">
            <button
               onClick={() => {
                  setIsRatingFilterAscending(!isRatingFilterAscending);
                  handleRatingsSort();
               }}
               className="w-full text-left p-[10px] pl-0"
            >
               <div className="flex gap-[5px] items-center">
                  {filterOptions.rating === rating.Default && <FaSort />}
                  {filterOptions.rating === rating.Ascending && <FaSortUp />}
                  {filterOptions.rating === rating.Descending && <FaSortDown />}
                  Rating
               </div>
            </button>
         </div>
         <div className="w-[100px]">
            <button
               onClick={() => {
                  setIsRequestFilterAscending(!isRequestFilterAscending);
                  handleRequestsSort();
               }}
               className="w-full text-left p-[10px] pl-0"
            >
               <div className="flex gap-[5px] items-center">
                  {filterOptions.votes === votes.Default && <FaSort />}
                  {filterOptions.votes === votes.Ascending && <FaSortUp />}
                  {filterOptions.votes === votes.Descending && <FaSortDown />}
                  Requests
               </div>
            </button>
         </div>
         <div className="w-[100px]"></div>
         {isCreator && (
            <div className="w-[100px]">
               <button
                  onClick={() => {
                     setIsWatchedFilterAscending(!isWatchedFilterAscending);
                     handleWatchedSort();
                  }}
                  className="w-full text-left p-[10px] pl-0"
               >
                  <div className="flex gap-[5px] items-center">
                     {filterOptions.watched === watched.Default && <FaSort />}
                     {filterOptions.watched === watched.Ascending && (
                        <FaSortUp />
                     )}
                     {filterOptions.watched === watched.Descending && (
                        <FaSortDown />
                     )}
                     Watched
                  </div>
               </button>
            </div>
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
                  className="row text-[12px] md:text-[16px]"
                  style={{
                     backgroundColor: data.isWatched
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
                  />
               </div>
            ))}
      </div>
   );

   return (
      <>
         {isCreator && (
            <PDFDownloadLink
               document={<PDFFile moviesList={filteredMoviesList} />}
               fileName="MovieList"
            >
               {({ loading }) =>
                  loading ? (
                     <button className="bg-black px-[10px] py-[5px] mb-[15px]">
                        Loading
                     </button>
                  ) : (
                     <button className="bg-black px-[10px] py-[5px] mb-[15px]">
                        Download PDF
                     </button>
                  )
               }
            </PDFDownloadLink>
         )}
         <div className="mb-[5px]">Results: {filteredMoviesList.length}</div>
         <Pagination
            postsPerPage={postsPerPage}
            totalPosts={filteredMoviesList.length}
            currentPage={currentPage}
            paginate={paginate}
         />
         {filteredMoviesList.length ? (
            <div>
               {tableHead}
               {tableBody}
            </div>
         ) : (
            <div className="loader loader--list"></div>
         )}
         <Pagination
            postsPerPage={postsPerPage}
            totalPosts={filteredMoviesList.length}
            currentPage={currentPage}
            paginate={paginate}
         />
      </>
   );
};

export default MovieList;
