import React from "react";
import { FaRegImage } from "react-icons/fa6";

const PosterSection = ({ data }) => {
   return (
      <div className="w-[135px] sm:w-[185px] mx-auto">
         {data?.data?.Poster ? (
            <img
               src={
                  data?.data?.Poster.includes("media-amazon")
                     ? data?.data?.Poster
                     : `https://image.tmdb.org/t/p/w300_and_h450_bestv2${data?.data?.Poster}`
               }
               alt={data?.data?.Title}
               className="h-[200px] sm:h-[275px] mx-auto"
            />
         ) : (
            <div className="flex justify-center items-center bg-[#585858] h-[200px] w-[135px] sm:h-[275px] sm:w-[185px] mx-auto">
               <FaRegImage className="text-[40px]" />
            </div>
         )}
      </div>
   );
};

export default PosterSection;
