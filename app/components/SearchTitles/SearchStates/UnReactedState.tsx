import { APIMovieData } from "@/app/types/movie";
import React from "react";
import { FaRegImage } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";

interface UnReactedStateProps {
   isMovieRewatch: (selectedMovie: APIMovieData) => boolean;
   getMovieVoteTotal: (selectedMovie: APIMovieData) => number;
   isMovieVotedByUser: (selectedMovie: APIMovieData) => boolean;
   handleRemoveVote: (selectedMovie: APIMovieData) => void;
   handleAddVote: (selectedMovie: APIMovieData) => void;
   loadingVote: boolean;
   setLoadingVote: (value: boolean) => void;
   movieIDCollection: Record<string | number, boolean>;
   movie: APIMovieData;
}

const UnReactedState: React.FC<UnReactedStateProps> = ({
   isMovieRewatch,
   getMovieVoteTotal,
   isMovieVotedByUser,
   handleRemoveVote,
   handleAddVote,
   loadingVote,
   setLoadingVote,
   movieIDCollection,
   movie,
}) => {
   return (
      <div className="text-white relative flex justify-center items-center w-[175px] h-[285px] overflow-hidden">
         <div>
            {!movie?.posterPath ? (
               <div className="w-[175px] h-[285px] bg-[#858585] flex items-center justify-center mx-auto">
                  <FaRegImage className="text-[40px]" />
               </div>
            ) : (
               <img
                  src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie?.posterPath}`}
                  alt={movie?.title}
                  width="175"
                  height="285"
                  className="w-full h-full object-cover mx-auto"
               />
            )}
            <div
               className="absolute bg-black/50 top-0 left-0 right-0 h-[100%] font-black text-[25px] flex items-center justify-center"
               style={{
                  textShadow: "1px 1px 3px black",
               }}
            >
               <div className="mt-[59px] flex flex-col items-center z-10">
                  <IoMdAddCircleOutline
                     className={`text-[50px] rotate-45 ${
                        movieIDCollection[movie?.id] ? "animate-rotation" : ""
                     }`}
                  />
                  <div>{isMovieRewatch(movie) ? "Rewatch" : "Requested"}</div>
                  <div className="text-[16px] mb-[10px] leading-[16px]">
                     {getMovieVoteTotal(movie)}{" "}
                     {getMovieVoteTotal(movie) > 1 ? "votes" : "vote"}
                  </div>
                  {isMovieVotedByUser(movie) ? (
                     <button
                        onClick={() => {
                           setLoadingVote(true);
                           handleRemoveVote(movie);
                        }}
                        className="w-[70px] flex justify-center bg-[#585858] hover:bg-[#858585] focus-visible:bg-[#858585] transition-colors duration-300 ease-in-out text-white p-2 uppercase text-[10px] md:text-[12px] font-bold"
                     >
                        {loadingVote ? (
                           <span className="button-loader"></span>
                        ) : (
                           "Unvote"
                        )}
                     </button>
                  ) : (
                     <button
                        className="w-[70px] flex justify-center bg-[#830483] hover:bg-[#a300a3] focus-visible:bg-[#a300a3] transition-colors duration-300 ease-in-out text-white p-2 uppercase text-[10px] md:text-[12px] font-bold"
                        onClick={() => {
                           setLoadingVote(true);
                           handleAddVote(movie);
                        }}
                        disabled={loadingVote}
                     >
                        {loadingVote ? (
                           <span className="button-loader"></span>
                        ) : (
                           "Upvote"
                        )}
                     </button>
                  )}
               </div>
            </div>
            <div
               className="absolute top-0 left-0 right-0 text-center text-[18px] font-black pt-[5px] leading-5"
               style={{
                  textShadow: "1px 1px 3px black",
               }}
            >
               {movie?.title}{" "}
               {movie?.releaseDate && <>({movie?.releaseDate.split("-")[0]})</>}
            </div>
         </div>
      </div>
   );
};

export default UnReactedState;
