import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useRequestQuery } from "../hooks/useRequestQuery";
import { requestSorts } from "@/app/utils/filtersOptions";

const MovieListSortTags = () => {
   const query = useRequestQuery();
   const router = useRouter();
   const searchParams = useSearchParams();

   const getSortLabel = (sortValue: string) => {
      for (const sort of Object.values(requestSorts)) {
         const option = sort.options.find(
            (option) => option.value === sortValue,
         );

         if (option) {
            return `${sort.label} (${option.label})`;
         }
      }

      return sortValue;
   };

   const clearUrlParam = (param: string) => {
      const params = new URLSearchParams(searchParams);
      params.delete(param);
      router.push(`?${params.toString()}`, { scroll: false });
   };

   return (
      <div className="capitalize flex gap-[5px]">
         {query.sortStatus && (
            <button
               onClick={(e) => clearUrlParam("sortStatus")}
               className="bg-black py-[2px] px-[10px] rounded-[15px] cursor-pointer focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out"
            >
               Status
            </button>
         )}

         {query.sort !== "createdAt" && (
            <button
               onClick={(e) => clearUrlParam("sort")}
               className="bg-black py-[2px] px-[10px] rounded-[15px] cursor-pointer focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out"
            >
               {getSortLabel(query.sort)}
            </button>
         )}
      </div>
   );
};

export default MovieListSortTags;
