"use client";
import React, { useState, useEffect } from "react";
import { useMovieContext } from "@/context/MovieContext";

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
   statusSort,
   published,
} from "@/app/utils/filtersOptions";
import MovieListEntry from "./MovieListEntry";
import { FaSortUp, FaSortDown, FaSort } from "react-icons/fa";
import { AiOutlineNumber } from "react-icons/ai";
import useFetchMovies from "../hooks/useFetchMovies";
import PageControls from "./PageControls";
import { Movie } from "../types/movie";

import { FaPatreon } from "react-icons/fa6";

import { FaYoutube } from "react-icons/fa";

interface MovieListProps {
   currentUser?: string;
   isCreator?: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ currentUser, isCreator }) => {
   const defaultCurrentPage = 1;
   const defaultRowsPerPage = 50;
   const moviesList = useFetchMovies();

   const {
      filteredMoviesList,
      setFilteredMoviesList,
      filterOptions,
      setFilterOptions,
      sortOptions,
      setSortOptions,
      statusSortOption,
      setStatusSortOption,
      searchTitle,
      searchDirector,
      searchActor,
      searchComposer,
   } = useMovieContext();

   const [requestStatusState, setRequestStatusState] = useState({});
   const [isRequestFilterAscending, setIsRequestFilterAscending] =
      useState(false);
   const [isTitleFilterAscending, setIsTitleFilterAscending] = useState(true);
   const [isRatingFilterAscending, setIsRatingFilterAscending] = useState(true);
   const [currentPage, setCurrentPage] = useState(defaultCurrentPage);
   const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
   const indexOfLastPost = currentPage * rowsPerPage;
   const indexOfFirstPost = indexOfLastPost - rowsPerPage;
   const [isRankingOn, setIsRankingOn] = useState(false);
   const [listFormat, setListFormat] = useState("detailed");

   useEffect(() => {
      let filteredList: Movie[] = [...moviesList];

      if (sortOptions.votes === votes.Ascending) {
         filteredList = filteredList.sort(
            (a, b) => b?.voters?.length - a?.voters?.length,
         );
      } else if (sortOptions.votes === votes.Descending) {
         filteredList = filteredList.sort(
            (a, b) => a?.voters?.length - b?.voters?.length,
         );
      } else {
         setIsRequestFilterAscending(true);
      }

      if (sortOptions.alphabetical === alphabetical.Ascending) {
         filteredList = filteredList.sort((a, b) => {
            const titleA = a.data.Title ?? "";
            const titleB = b.data.Title ?? "";
            return titleA.localeCompare(titleB);
         });
      } else if (sortOptions.alphabetical === alphabetical.Descending) {
         filteredList = filteredList
            .sort((a, b) => {
               const titleA = a.data.Title ?? "";
               const titleB = b.data.Title ?? "";
               return titleA.localeCompare(titleB);
            })
            .reverse();
      } else {
         setIsTitleFilterAscending(true);
      }

      if (sortOptions.rating === rating.Ascending) {
         filteredList = filteredList.sort(
            (a, b) =>
               parseFloat(b.data.Rating ? String(b.data.Rating) : "0") -
               parseFloat(a.data.Rating ? String(a.data.Rating) : "0"),
         );
      } else if (sortOptions.rating === rating.Descending) {
         filteredList = filteredList.sort(
            (a, b) =>
               parseFloat(a.data.Rating ? String(a.data.Rating) : "0") -
               parseFloat(b.data.Rating ? String(b.data.Rating) : "0"),
         );
      } else {
         setIsRatingFilterAscending(true);
      }

      if (sortOptions.chronological === chronological.Older) {
         filteredList = filteredList.sort(
            (a, b) =>
               new Date(a.data.Release || "1900-01-01").getTime() -
               new Date(b.data.Release || "1900-01-01").getTime(),
         );
      } else if (sortOptions.chronological === chronological.Newer) {
         filteredList = filteredList.sort(
            (a, b) =>
               new Date(b.data.Release || "1900-01-01").getTime() -
               new Date(a.data.Release || "1900-01-01").getTime(),
         );
      }

      if (sortOptions.published === published.Older) {
         filteredList = filteredList.sort(
            (a, b) =>
               new Date(a.publishedAt || "1900-01-01").getTime() -
               new Date(b.publishedAt || "1900-01-01").getTime(),
         );
      } else if (sortOptions.published === published.Newer) {
         filteredList = filteredList.sort(
            (a, b) =>
               new Date(b.publishedAt || "1900-01-01").getTime() -
               new Date(a.publishedAt || "1900-01-01").getTime(),
         );
      }

      if (sortOptions.added === added.Older) {
         filteredList = filteredList.sort(
            (a, b) =>
               new Date(a.createdAt).getTime() -
               new Date(b.createdAt).getTime(),
         );
      } else if (sortOptions.added === added.Newer) {
         filteredList = filteredList.sort(
            (a, b) =>
               new Date(b.createdAt).getTime() -
               new Date(a.createdAt).getTime(),
         );
      }

      if (statusSortOption.statusSort === statusSort.Watched) {
         const seenList = filteredList.filter(
            (movie) => movie.hasSeen || movie.hasReacted,
         );
         const unseenList = filteredList.filter(
            (movie) =>
               (!movie.hasSeen && !movie.hasReacted) ||
               movie.isRewatch ||
               movie.isRewatchFriend,
         );
         filteredList = [...seenList, ...unseenList];
      } else if (statusSortOption.statusSort === statusSort.Unwatched) {
         const seenList = filteredList.filter(
            (movie) => movie.hasSeen || movie.hasReacted,
         );
         const unseenList = filteredList.filter(
            (movie) =>
               (!movie.hasSeen && !movie.hasReacted) ||
               movie.isRewatch ||
               movie.isRewatchFriend,
         );
         filteredList = [...unseenList, ...seenList];
      }

      if (filterOptions.type === type.Movie) {
         filteredList = filteredList.filter((movie) =>
            (movie.data.Type ?? "").includes(type.Movie.toLowerCase()),
         );
      } else if (filterOptions.type === type.Series) {
         filteredList = filteredList.filter((movie) =>
            (movie.data.Type ?? "").includes(type.Series.toLowerCase()),
         );
      }

      if (filterOptions.genre === genre.Action) {
         filteredList = filteredList.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Action),
         );
      } else if (filterOptions.genre === genre.Adventure) {
         filteredList = filteredList.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Adventure),
         );
      } else if (filterOptions.genre === genre.Animation) {
         filteredList = filteredList.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Animation),
         );
      } else if (filterOptions.genre === genre.Comedy) {
         filteredList = filteredList.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Comedy),
         );
      } else if (filterOptions.genre === genre.Crime) {
         filteredList = filteredList.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Crime),
         );
      } else if (filterOptions.genre === genre.Documentary) {
         filteredList = filteredList.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Documentary),
         );
      } else if (filterOptions.genre === genre.Drama) {
         filteredList = filteredList.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Drama),
         );
      } else if (filterOptions.genre === genre.SciFi) {
         filteredList = filteredList.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.SciFi),
         );
      } else if (filterOptions.genre === genre.Family) {
         filteredList = filteredList.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Family),
         );
      } else if (filterOptions.genre === genre.Fantasy) {
         filteredList = filteredList.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Fantasy),
         );
      } else if (filterOptions.genre === genre.History) {
         filteredList = filteredList.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.History),
         );
      } else if (filterOptions.genre === genre.Horror) {
         filteredList = filteredList.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Horror),
         );
      } else if (filterOptions.genre === genre.Mystery) {
         filteredList = filteredList.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Mystery),
         );
      } else if (filterOptions.genre === genre.Music) {
         filteredList = filteredList.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Music),
         );
      } else if (filterOptions.genre === genre.Thriller) {
         filteredList = filteredList.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Thriller),
         );
      } else if (filterOptions.genre === genre.Romance) {
         filteredList = filteredList.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Romance),
         );
      } else if (filterOptions.genre === genre.War) {
         filteredList = filteredList.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.War),
         );
      } else if (filterOptions.genre === genre.Western) {
         filteredList = filteredList.filter((movie) =>
            (movie.data.Genre ?? "").includes(genre.Western),
         );
      } else if (filterOptions.genre === genre.Halloween) {
         filteredList = filteredList.filter((movie) => movie.isHalloween);
      } else if (filterOptions.genre === genre.Christmas) {
         filteredList = filteredList.filter((movie) => movie.isChristmas);
      }

      if (filterOptions.status === status.Seen) {
         filteredList = filteredList.filter((movie) => movie.hasSeen);
      } else if (filterOptions.status === status.OnChannel) {
         filteredList = filteredList.filter((movie) => movie.hasReacted);
      } else if (filterOptions.status === status.Rewatch) {
         filteredList = filteredList.filter(
            (movie) => movie.isRewatch || movie.isRewatchFriend,
         );
      } else if (filterOptions.status === status.Unseen) {
         filteredList = filteredList.filter(
            (movie) => !movie.hasSeen && !movie.hasReacted && !movie.isRewatch,
         );
      } else if (filterOptions.status === status.Votable) {
         filteredList = filteredList.filter(
            (movie) => (!movie.hasSeen && !movie.hasReacted) || movie.isRewatch,
         );
      }

      if (filterOptions.requests === requests.MyRequests) {
         filteredList = filteredList.filter(
            (movie) => movie.requester === currentUser,
         );
      } else if (filterOptions.requests === requests.Voted) {
         filteredList = filteredList.filter((movie) =>
            movie.voters.includes(currentUser ?? ""),
         );
      } else if (filterOptions.requests === requests.NotVoted) {
         filteredList = filteredList.filter(
            (movie) => !movie.voters.includes(currentUser ?? ""),
         );
      }

      if (searchTitle) {
         filteredList = filteredList.filter((movie) =>
            (movie.data.Title ?? "")
               .toLowerCase()
               .includes(searchTitle.toLowerCase()),
         );
      }

      if (searchDirector) {
         filteredList = filteredList.filter((movie) =>
            (movie.data.Director ?? "")
               .toLowerCase()
               .includes(searchDirector.toLowerCase()),
         );
      }

      if (searchActor) {
         filteredList = filteredList.filter((movie) =>
            (movie.data.Actors ?? "")
               .toLowerCase()
               .includes(searchActor.toLowerCase()),
         );
      }

      if (searchComposer) {
         filteredList = filteredList.filter((movie) =>
            movie?.data?.Composer?.toLowerCase().includes(
               searchComposer.toLowerCase(),
            ),
         );
      }

      const initialPage =
         currentPage <= Math.ceil(filteredList.length / rowsPerPage)
            ? currentPage
            : Math.ceil(filteredList.length / rowsPerPage);
      setCurrentPage(initialPage > 0 ? initialPage : 1);
      setFilteredMoviesList(filteredList);
   }, [
      moviesList,
      filterOptions,
      sortOptions,
      statusSortOption,
      searchTitle,
      searchDirector,
      searchActor,
      searchComposer,
      rowsPerPage,
   ]);

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

      filteredMoviesList.forEach((movie) => {
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
   }, [filteredMoviesList]);

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
                     currentUser={currentUser ?? ""}
                     isCreator={isCreator ?? false}
                     ranking={index + 1 + rowsPerPage * (currentPage - 1)}
                     isRankingOn={isRankingOn}
                     requestStatusState={requestStatusState}
                  />
               </div>
            ))}
      </div>
   );

   const detailedList = (
      <div>
         {filteredMoviesList
            .slice(indexOfFirstPost, indexOfLastPost)
            .map((data, index) => (
               <div key={data._id} className="mb-[10px]">
                  <div className="flex justify-between gap-5 bg-[#5f005f] px-[20px] py-[10px] items-center">
                     {/* <div className="text-[20px] font-bold">{index + 1}</div> */}
                     <div className="text-[18px] font-bold">
                        {data.data.Title} ({data.data.Year})
                     </div>
                     <button className="bg-[#a300a3] px-[15px] py-[5px]">
                        &#9650; Upvote
                     </button>
                  </div>
                  <div className="flex gap-5 bg-[black] p-[20px]">
                     <img
                        className="max-w-[100px] h-[150px]"
                        src={`https://image.tmdb.org/t/p/w200${data?.data?.Poster}`}
                        alt={data.data.Title}
                     />
                     <div>
                        <div>
                           <a
                              href={`https://tubitv.com/search/${encodeURIComponent(data.data.Title ?? "")}`}
                              target="_blank"
                           >
                              Tubi
                           </a>
                           <a
                              href={`https://therokuchannel.roku.com/search/${encodeURIComponent(data.data.Title ?? "")}`}
                              target="_blank"
                           >
                              The Roku Channel
                           </a>
                        </div>

                        <div className="text-[18px] font-bold">
                           Rank: {index + 1}
                        </div>
                        <div className="text-[18px] font-bold mb-[10px]">
                           {data.voters.length} votes
                        </div>

                        <div className="flex flex-col gap-2">
                           <div className="font-bold">{data.data.Genre}</div>
                           <div className="flex gap-5">
                              <div>
                                 Directed by{" "}
                                 <span className="font-bold">
                                    {data.data.Director}
                                 </span>
                              </div>
                              <div>
                                 Starring{" "}
                                 <span className="font-bold">
                                    {data.data.Actors?.split(",")
                                       .slice(0, 3)
                                       .join(",")}
                                 </span>
                              </div>
                           </div>

                           <div className="flex gap-5 text-[14px]">
                              <span className="border-[1px] px-[4px]">
                                 {data.data.Rated}
                              </span>
                              <span>Runtime {data.data.Runtime} mins.</span>
                           </div>
                        </div>
                     </div>
                     <div>
                        <div className="flex items-center gap-5">
                           {data.links.youtube && (
                              <a
                                 className="px-[20px] py-[5px] bg-[red] block"
                                 href={data.links.youtube}
                              >
                                 <FaYoutube className="text-[30px]" />
                              </a>
                           )}
                           {data.links.patreon && (
                              <a
                                 className="px-[20px] py-[5px] bg-black block"
                                 href={data.links.patreon}
                              >
                                 <FaPatreon className="text-[30px]" />
                              </a>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
            ))}
      </div>
   );

   const galleryList = (
      <div className="grid gap-[15px] grid-cols-5">
         {filteredMoviesList
            .slice(indexOfFirstPost, indexOfLastPost)
            .map((data, index) => (
               <div key={data._id}>
                  <img
                     // className="max-w-[150px] w-full"
                     src={`https://image.tmdb.org/t/p/w200${data?.data?.Poster}`}
                     alt={data.data.Title}
                  />
               </div>
            ))}
      </div>
   );

   let renderedList;
   if (listFormat === "detailed") {
      renderedList = detailedList;
   } else if (listFormat === "gallery") {
      renderedList = galleryList;
   } else {
      renderedList = tableBody;
   }

   return (
      <>
         {moviesList.length ? (
            filteredMoviesList.length ? (
               <>
                  <div className="sticky top-[-1px] z-50 bg-[#830483] py-[10px] flex flex-col-reverse md:flex-row items-center gap-[3px] md:gap-[15px]">
                     <PageControls
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                        filteredListLength={filteredMoviesList.length}
                     />
                  </div>
                  <div>
                     <div className="flex gap-5 justify-end">
                        <button onClick={() => setListFormat("detailed")}>
                           Detailed
                        </button>
                        <button onClick={() => setListFormat("table")}>
                           Table
                        </button>
                        <button onClick={() => setListFormat("gallery")}>
                           Gallery
                        </button>
                     </div>

                     {tableHead}
                     {renderedList}
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
