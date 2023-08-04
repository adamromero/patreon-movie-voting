import React, { useContext } from "react";
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
                     <p className="text-[20px] md:text-[14px] text-shadow font-bold md:rotate-[315deg]">
                        Watched
                     </p>
                  </div>
               )}
               <img
                  className="img-poster"
                  src={data.data.Poster}
                  // width={50}
                  // height={205}
                  alt={data.data.Title}
               />
            </a>
         </div>
         <div className={`${isCreator ? "pr-0" : "md:pr-[16px]"} content`}>
            <div className="title-cell">
               {data.data.Title} ({data.data.Year})
            </div>
            <div className="genre-cell">{data.data.Genre}</div>
            <div className="rating-cell">
               <span className="inline md:hidden">Rating:</span>{" "}
               {data.data.imdbRating}
            </div>
            <div className="request-cell">
               <span className="inline md:hidden">Requests:</span>{" "}
               {data.voters.length}
            </div>
            {!data.isWatched && currentUser ? (
               <div className="mt-[10px] sm:mt-0">
                  {data.voters.filter((voter) => voter === currentUser)
                     .length ? (
                     <button
                        className="bg-[#858585] hover:bg-[#585858] focus-visible:bg-[#585858] transition-colors duration-300 ease-in-out text-white p-2 uppercase text-[10px] md:text-[12px] font-bold"
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
            ) : null}
            {isCreator && (
               <div className="watched-cell mt-[10px] sm:mt-0">
                  <div className="container">
                     <label className="switch" htmlFor={`checkbox-${data._id}`}>
                        <input
                           type="checkbox"
                           id={`checkbox-${data._id}`}
                           checked={!!watchedState[data._id]}
                           onChange={(e) => handleWatchSetting(e, data)}
                        />
                        <div className="slider round"></div>
                     </label>
                  </div>
               </div>
            )}
         </div>
      </>
   );
};

export default MovieListEntry;
