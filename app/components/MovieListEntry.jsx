import React, { useContext } from "react";
import Image from "next/image";
import { MovieContext } from "@/context/MovieContext";

const MovieListEntry = ({
   data,
   currentUser,
   isCreator,
   watchedState,
   setWatchedState,
}) => {
   const { castMovieVote, removeMovieVote, setMovieVoteToWatched } =
      useContext(MovieContext);

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

   return (
      <>
         <div className="relative">
            <a
               href={`https://www.imdb.com/title/${data.data.imdbID}`}
               title="Go to IMDB"
               target="_blank"
            >
               {data.isWatched && (
                  <div className="absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/[.5]">
                     <p className="text-[20px] lg:text-[14px] text-shadow font-bold lg:rotate-[315deg]">
                        Watched
                     </p>
                  </div>
               )}
               <img
                  className="w-[100px] h-[150px] lg:w-[50px] lg:h-[75px]"
                  src={data.data.Poster}
                  alt={data.data.Title}
               />
            </a>
         </div>
         <div
            className={`${
               isCreator ? "pr-0" : "md:pr-[16px]"
            } flex flex-col justify-between flex-1 gap-[5px] md:grid md:grid-cols-2 md:gap-[30px] lg:flex lg:items-center lg:flex-row`}
         >
            <div className="lg:w-[250px] leading-4">
               {data.data.Title} ({data.data.Year})
            </div>
            <div className="lg:w-[200px]">{data.data.Genre}</div>
            <div className="lg:w-[40px]">
               <span className="inline lg:hidden">Rating:</span>{" "}
               {data.data.imdbRating}
            </div>
            <div className="lg:w-[40px]">
               <span className="inline lg:hidden">Requests:</span>{" "}
               {data.voters.length}
            </div>
            {!data.isWatched && currentUser ? (
               <div className="mt-[10px] md:mt-0 lg:w-[70px]">
                  {data.voters.filter((voter) => voter === currentUser)
                     .length ? (
                     <button
                        className="bg-[#585858] hover:bg-[#858585] focus-visible:bg-[#858585] transition-colors duration-300 ease-in-out text-white p-2 uppercase text-[10px] md:text-[12px] font-bold"
                        onClick={() => handleRemoveVote(data._id, data.voters)}
                     >
                        Retract
                     </button>
                  ) : (
                     <button
                        className="bg-[#830483] hover:bg-[#a300a3] focus-visible:bg-[#a300a3] transition-colors duration-300 ease-in-out text-white p-2 uppercase text-[10px] md:text-[12px] font-bold"
                        onClick={() => handleCastVote(data._id, data.voters)}
                     >
                        Request
                     </button>
                  )}
               </div>
            ) : currentUser ? (
               <div className="lg:w-[70px]"></div>
            ) : null}
            {isCreator && (
               <div className="lg:w-[70px] mt-[10px] md:mt-0 relative">
                  <div className="checkbox-container">
                     <label
                        className="checkbox"
                        htmlFor={`checkbox-${data._id}`}
                     >
                        <input
                           type="checkbox"
                           id={`checkbox-${data._id}`}
                           checked={!!watchedState[data._id]}
                           onChange={(e) => handleWatchSetting(e, data)}
                        />
                        <div className="checkmark"></div>
                     </label>
                  </div>
               </div>
            )}
         </div>
      </>
   );
};

export default MovieListEntry;
