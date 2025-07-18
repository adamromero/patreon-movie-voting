import React from "react";
import { FaRegImage } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";

const SeenState = ({ movieIDCollection, movie }) => {
   return (
      <div className="text-[#8d8d8d] cursor-not-allowed relative flex justify-center items-center w-[175px] h-[285px] overflow-hidden">
         <div>
            {!movie?.poster_path ? (
               <div className="w-[175px] h-[285px] bg-[#858585] flex items-center justify-center mx-auto">
                  <FaRegImage className="text-[40px]" />
               </div>
            ) : (
               <img
                  src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${movie?.poster_path}`}
                  alt={
                     movie?.media_type === "movie" ? movie?.title : movie?.name
                  }
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
               <div className="flex flex-col mt-[6px] items-center z-10">
                  <IoMdAddCircleOutline
                     className={`text-[50px] rotate-45 ${
                        movieIDCollection[movie?.id] ? "animate-rotation" : ""
                     }`}
                  />
                  <div>Seen</div>
               </div>
            </div>
            <div
               className="absolute top-0 left-0 right-0 text-center text-[18px] font-black pt-[5px] leading-5"
               style={{
                  textShadow: "1px 1px 3px black",
               }}
            >
               {movie?.media_type === "movie" ? movie?.title : movie?.name}{" "}
               {(movie?.release_date || movie?.first_air_date) && (
                  <>
                     (
                     {movie?.media_type === "movie"
                        ? movie?.release_date.split("-")[0]
                        : movie?.first_air_date.split("-")[0]}
                     )
                  </>
               )}
            </div>
         </div>
      </div>
   );
};

export default SeenState;
