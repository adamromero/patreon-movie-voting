import React from "react";
import { useMovieContext } from "@/context/MovieContext";
import { useSearchParams, useRouter } from "next/navigation";
import { useRequestQuery } from "../hooks/useRequestQuery";
import { statusSort, requestSorts } from "@/app/utils/filtersOptions";

const MovieListSortTags = () => {
   const {
      sortOptions,
      setSortOptions,
      statusSortOption,
      setStatusSortOption,
   } = useMovieContext();

   const query = useRequestQuery();
   const router = useRouter();
   const searchParams = useSearchParams();

   const handleStatusSortFilterRemove = () => {
      setStatusSortOption({
         statusSort: statusSort.Default,
      });
   };

   const getSortLabel = (value: string) => {
      // return (
      //    requestSorts.options.find((option) => option.value === value)?.label ?? value
      // );
      return value;
   };

   const clearUrlParam = (param: string) => {
      const params = new URLSearchParams(searchParams);
      params.delete(param);
      router.push(`?${params.toString()}`, { scroll: false });
   };

   return (
      <div className="capitalize flex gap-[5px]">
         {statusSortOption.statusSort !== statusSort.Default && (
            <button
               onClick={handleStatusSortFilterRemove}
               className="bg-black py-[2px] px-[10px] rounded-[15px] cursor-pointer focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out"
            >
               Status
            </button>
         )}

         {query.sort && (
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
