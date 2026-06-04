"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useRequestQuery } from "../hooks/useRequestQuery";
import { requestFilters } from "../utils/filtersOptions";

const MovieListFilterTags = () => {
   const query = useRequestQuery();
   const router = useRouter();
   const searchParams = useSearchParams();

   const clearUrlParam = (param: string) => {
      const params = new URLSearchParams(searchParams);
      params.delete(param);
      router.push(`?${params.toString()}`, { scroll: false });
   };

   const getFilterLabel = (
      filter: { options: { value: string; label: string }[] },
      value: string,
   ) => {
      return (
         filter.options.find((option) => option.value === value)?.label ?? value
      );
   };

   return (
      <div className="capitalize flex gap-[5px]">
         {query.genre && (
            <button
               onClick={(e) => clearUrlParam("genre")}
               className="bg-black py-[2px] px-[10px] rounded-[15px] cursor-pointer focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out"
            >
               {getFilterLabel(requestFilters.genre, query.genre)}
            </button>
         )}
         {query.type && (
            <button
               onClick={(e) => clearUrlParam("type")}
               className="bg-black py-[2px] px-[10px] rounded-[15px] cursor-pointer focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out"
            >
               {getFilterLabel(requestFilters.type, query.type)}
            </button>
         )}
         {query.status && (
            <button
               onClick={(e) => clearUrlParam("status")}
               className="bg-black py-[2px] px-[10px] rounded-[15px] cursor-pointer focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out"
            >
               {getFilterLabel(requestFilters.status, query.status)}
            </button>
         )}
         {/* {activeRequests !== requests.Default && (
            <button
               onClick={handleStatusRequestsRemove}
               className="bg-black py-[2px] px-[10px] rounded-[15px] cursor-pointer focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out"
            >
               {requestsLabels[activeRequests] ?? activeRequests}
            </button>
         )} */}
      </div>
   );
};

export default MovieListFilterTags;
