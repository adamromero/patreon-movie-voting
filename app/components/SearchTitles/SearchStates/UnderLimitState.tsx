import { APIMovieData } from "@/app/types/movie";
import React from "react";
import { FaRegImage } from "react-icons/fa6";
import { IoMdAddCircleOutline } from "react-icons/io";

interface UnderLimitStateProps {
   handleMovieSelection: (movie: APIMovieData) => Promise<void> | void;
   disabledButtonStates: Record<string | number, boolean>;
   disableButton: boolean;
   movie: APIMovieData;
}

const UnderLimitState: React.FC<UnderLimitStateProps> = ({
   handleMovieSelection,
   disabledButtonStates,
   disableButton,
   movie,
}) => {
   return (
      <div className="relative flex justify-center items-center w-[175px] h-[285px] overflow-hidden">
         <button
            className="block"
            onClick={() => handleMovieSelection(movie)}
            disabled={disableButton}
         >
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
               className="absolute bg-black/50 top-0 left-0 right-0 h-[100%] font-black text-white text-[25px] flex items-center justify-center"
               style={{
                  textShadow: "1px 1px 3px black",
               }}
            >
               <div className="flex flex-col">
                  <IoMdAddCircleOutline className="text-[50px] mx-auto" />
                  <div>
                     {disabledButtonStates[movie?.id as any]
                        ? "Pending"
                        : "Add"}
                  </div>
               </div>
            </div>
            <div
               className="absolute top-0 left-0 right-0 text-white text-center text-[18px] font-black pt-[5px] leading-5"
               style={{
                  textShadow: "1px 1px 3px black",
               }}
            >
               {movie?.media_type === "movie" ? movie?.title : movie?.name}{" "}
               {(movie?.release_date || movie?.first_air_date) && (
                  <>
                     (
                     {
                        (
                           (movie?.media_type === "movie"
                              ? movie?.release_date
                              : movie?.first_air_date) ?? ""
                        ).split("-")[0]
                     }
                     )
                  </>
               )}
            </div>
         </button>
      </div>
   );
};

export default UnderLimitState;
