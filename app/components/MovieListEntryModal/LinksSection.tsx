import React from "react";
import { BiLogoPatreon } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";
import { Movie } from "@/app/types/movie";

interface LinksSectionProps {
   data: Movie;
}

const LinksSection: React.FC<LinksSectionProps> = ({ data }) => {
   return (
      <div className="flex gap-[5px] max-w-[200px] mt-[10px] flex-1">
         {data?.links?.youtube && (
            <a
               className="flex flex-1 justify-center items-center max-w-[98px] gap-[2px] bg-[red] text-[25px] p-[3px]"
               href={data?.links?.youtube}
               title="Watch on YouTube"
               target="_blank"
            >
               <AiFillYoutube />
            </a>
         )}
         {data?.links?.patreon && (
            <a
               className="flex flex-1 justify-center items-center max-w-[98px] gap-[2px] bg-[black] text-[25px] p-[3px] border-[#585858] border-[1px]"
               href={data?.links?.patreon}
               title="Watch Full Length"
               target="_blank"
            >
               <BiLogoPatreon />
            </a>
         )}
      </div>
   );
};

export default LinksSection;
