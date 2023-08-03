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
         <div>
            <a
               href={`https://www.imdb.com/title/${data.data.imdbID}`}
               title="Go to IMDB"
               target="_blank"
            >
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
                        className="bg-[gray] text-white p-2 uppercase text-[10px] md:text-[12px] font-bold"
                        onClick={() => handleRemoveVote(data._id, data.voters)}
                     >
                        Retract
                     </button>
                  ) : (
                     <button
                        className="bg-[#830483] text-white p-2 uppercase text-[10px] md:text-[12px] font-bold"
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
