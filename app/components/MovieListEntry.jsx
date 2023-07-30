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
         {data.data.imdbRating ? (
            <td className="hidden md:table-cell">{data.data.imdbRating}</td>
         ) : (
            <td>N/A</td>
         )}

         <td className="hidden md:table-cell">{data.data.Genre}</td>
         <td>{data.voters.length}</td>
         <td>
            {!data.isWatched && currentUser ? (
               data.voters.filter((voter) => voter === currentUser).length ? (
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
               )
            ) : null}
         </td>
         {isCreator && (
            <td>
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
            </td>
         )}
      </>
   );
};

export default MovieListEntry;
