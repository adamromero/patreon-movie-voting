"use client";
import React, { useState, useEffect, useContext } from "react";
import { MovieContext } from "@/context/MovieContext";
import {
   genre,
   status,
   type,
   chronological,
   added,
} from "@/app/utils/filtersOptions";

const MovieList = ({ currentUser, isCreator, searchTitle }) => {
   const {
      moviesList,
      getMovieVotes,
      castMovieVote,
      removeMovieVote,
      filterOptions,
      setFilterOptions,
      setMovieVoteToWatched,
   } = useContext(MovieContext);
   const [filteredMoviesList, setFilteredMoviesList] = useState([]);
   const [watchedState, setWatchedState] = useState({});
   const [isRequestFilterAscending, setIsRequestFilterAscending] =
      useState(true);
   const [isTitleFilterAscending, setIsTitleFilterAscending] = useState(true);

   useEffect(() => {
      getMovieVotes();
   }, []);

   useEffect(() => {
      let filteredList = [...moviesList];

      if (filterOptions.votes === "most") {
         filteredList = filteredList.sort(
            (a, b) => b.voters.length - a.voters.length
         );
      } else if (filterOptions.votes === "fewest") {
         filteredList = filteredList.sort(
            (a, b) => a.voters.length - b.voters.length
         );
      }

      if (filterOptions.alphabetical === "ascend") {
         // filteredList = filteredList.sort((a, b) => {
         //    if (a.data.Title > b.data.Title) {
         //       return 1;
         //    }
         //    return 0;
         // });
      } else if (filterOptions.alphabetical === "descend") {
         filteredList = filteredList.sort((a, b) => {
            if (a.data.Title < b.data.Title) {
               return -1;
            }
            return 0;
         });
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
         // filteredList = filteredList.filter((movie) =>
         //    movie.data.Type.includes("movie")
         // );
      } else if (filterOptions.type === type.Series) {
         // filteredList = filteredList.filter((movie) =>
         //    movie.data.Type.includes("series")
         // );
      }

      if (filterOptions.genre === genre.Action) {
         filteredList = filteredList.filter((movie) =>
            movie.data.Genre.includes(genre.Action)
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

      setFilteredMoviesList(filteredList);
   }, [moviesList, filterOptions, searchTitle]);

   useEffect(() => {
      const watchedStateObject = {};
      filteredMoviesList.forEach((movie) => {
         watchedStateObject[movie._id] = movie.isWatched;
      });
      setWatchedState(watchedStateObject);
   }, [filteredMoviesList]);

   const handleCastVote = async (movieId, voters) => {
      castMovieVote(movieId, voters, currentUser);
   };

   const handleRemoveVote = async (movieId, voters) => {
      removeMovieVote(movieId, voters, currentUser);
   };

   const handleWatchSetting = (e, data) => {
      const isChecked = e.target.checked;
      setMovieVoteToWatched(data._id, isChecked);
      setWatchedState((prevState) => ({
         ...prevState,
         [data._id]: isChecked,
      }));
   };

   const handleTitleFilter = () => {
      console.log("trigger title filter");
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         alphabetical: isTitleFilterAscending ? "ascend" : "descend",
      }));
   };

   const handleRequestsFilter = () => {
      console.log("requests filter");
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         votes: isRequestFilterAscending ? "most" : "fewest",
      }));
   };

   const tableHead = (
      <thead className="bg-black">
         <tr className="text-left">
            <th className="w-[100px]"></th>
            <th className="md:w-[300px]">
               <button
                  className="w-full text-left p-[10px]"
                  onClick={() => {
                     setIsTitleFilterAscending(!isTitleFilterAscending);
                     handleTitleFilter();
                  }}
               >
                  Title
               </button>
            </th>
            <th className="hidden md:table-cell">
               <div className="w-full text-left p-[10px]">Rating</div>
            </th>
            <th className="hidden md:table-cell">
               <div className="w-full text-left p-[10px]">Genre</div>
            </th>
            <th>
               <button
                  onClick={() => {
                     setIsRequestFilterAscending(!isRequestFilterAscending);
                     handleRequestsFilter();
                  }}
                  className="w-full text-left p-[10px]"
               >
                  Requests
               </button>
            </th>
            <th></th>
            {isCreator && <th>Watched</th>}
         </tr>
      </thead>
   );

   const tableBody = (
      <tbody>
         {filteredMoviesList.length ? (
            <>
               {filteredMoviesList.map((data, index) => (
                  <tr
                     key={data._id}
                     className="text-center md:text-left text-[12px] md:text-[16px]"
                     style={{
                        marginBottom: "20px",
                        backgroundColor: data.isWatched
                           ? "rgb(0 0 0 / 40%)"
                           : "#000",
                        position: "relative",
                     }}
                  >
                     {/* <td>{index + 1}</td> */}
                     <td className="">
                        <a
                           href={`https://www.imdb.com/title/${data.data.imdbID}`}
                           title="Go to IMDB"
                           target="_blank"
                        >
                           <img
                              src={data.data.Poster}
                              width={50}
                              height={205}
                              alt={data.data.Title}
                           />
                        </a>
                     </td>
                     <td className="pr-[5px]">
                        {data.data.Title} ({data.data.Year})
                     </td>
                     <td className="hidden md:table-cell">{data.data.Rated}</td>
                     <td className="hidden md:table-cell">{data.data.Genre}</td>
                     <td>{data.voters.length}</td>
                     <td>
                        {!data.isWatched && currentUser ? (
                           data.voters.filter((voter) => voter === currentUser)
                              .length ? (
                              <button
                                 className="bg-[gray] text-white p-2 uppercase text-[10px] md:text-[12px] font-bold"
                                 onClick={() =>
                                    handleRemoveVote(data._id, data.voters)
                                 }
                              >
                                 Retract
                              </button>
                           ) : (
                              <button
                                 className="bg-[#830483] text-white p-2 uppercase text-[10px] md:text-[12px] font-bold"
                                 onClick={() =>
                                    handleCastVote(data._id, data.voters)
                                 }
                              >
                                 Request
                              </button>
                           )
                        ) : null}
                     </td>
                     {isCreator && (
                        <td>
                           <div className="container">
                              <label
                                 className="switch"
                                 htmlFor={`checkbox-${data._id}`}
                              >
                                 <input
                                    type="checkbox"
                                    id={`checkbox-${data._id}`}
                                    checked={!!watchedState[data._id]}
                                    onChange={(e) =>
                                       handleWatchSetting(e, data)
                                    }
                                 />
                                 <div className="slider round"></div>
                              </label>
                           </div>
                        </td>
                     )}
                  </tr>
               ))}
            </>
         ) : (
            <tr className="loader loader--list"></tr>
         )}
      </tbody>
   );

   return (
      <table className="w-full">
         {tableHead}
         {tableBody}
      </table>
   );
};

export default MovieList;
