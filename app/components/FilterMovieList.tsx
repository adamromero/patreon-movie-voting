"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMovieContext } from "@/context/MovieContext";
import { useRequestQuery } from "../hooks/useRequestQuery";

import {
   requests,
   statusSort,
   requestFilters,
   requestSorts,
} from "@/app/utils/filtersOptions";
import MovieListFilterTags from "./MovieListFilterTags";
import MovieListSortTags from "./MovieListSortTags";

const FilterMovieList = () => {
   const { user } = useMovieContext();

   const currentUser = user ? user.id : null;
   const query = useRequestQuery();
   const router = useRouter();
   const searchParams = useSearchParams();

   const handleFilterSortSelection = (
      e: React.ChangeEvent<HTMLSelectElement>,
      filterType: string,
   ) => {
      const selection = e.target.value;
      const params = new URLSearchParams(searchParams);

      if (selection) {
         params.set(filterType, selection);

         if (selection === "po" || selection === "pn") {
            params.set("status", "channel");
         }
         // if (selection === "pd") {
         //    params.set("status", "");
         // }
      } else {
         params.delete(filterType);
      }

      router.push(`?${params.toString()}`, { scroll: false });
   };

   return (
      <div className="flex flex-col justify-between mt-[10px] mb-[15px] sm:mt-0 xlg:flex-row gap-[10px] w-full text-white flex gap-[20px]">
         <div>
            <div className="flex gap-[4px] mb-[10px] items-center h-[30px]">
               <div>Filter By:</div>
               <MovieListFilterTags />
            </div>
            <div className="flex flex-col lg:flex-row gap-[10px]">
               <div className="flex gap-[10px]">
                  <div className="flex flex-col flex-1 lg:flex-none">
                     <label htmlFor="genre">{requestFilters.genre.label}</label>
                     <select
                        className="bg-white text-black w-full lg:w-[125px] p-[5px] overflow-hidden whitespace-nowrap text-ellipsis"
                        name="genreFilter"
                        id="genre"
                        value={query.genre}
                        onChange={(e) => handleFilterSortSelection(e, "genre")}
                     >
                        {requestFilters.genre.options.map((option) => (
                           <option key={option.value} value={option.value}>
                              {option.label}
                           </option>
                        ))}
                     </select>
                  </div>
                  <div className="flex flex-col flex-1 lg:flex-none">
                     <label htmlFor="type">{requestFilters.type.label}</label>
                     <select
                        className="bg-white text-black w-full lg:w-[125px] p-[5px] overflow-hidden whitespace-nowrap text-ellipsis"
                        name="typeFilter"
                        id="type"
                        value={query.type}
                        onChange={(e) => handleFilterSortSelection(e, "type")}
                     >
                        {requestFilters.type.options.map((option) => (
                           <option key={option.value} value={option.value}>
                              {option.label}
                           </option>
                        ))}
                     </select>
                  </div>
               </div>
               <div className="flex gap-[10px]">
                  <div className="flex flex-col flex-1 lg:flex-none">
                     <label htmlFor="status">
                        {requestFilters.status.label}
                     </label>
                     <select
                        className="bg-white text-black w-full lg:w-[125px] p-[5px] overflow-hidden whitespace-nowrap text-ellipsis"
                        name="statusFilter"
                        id="status"
                        value={query.status}
                        onChange={(e) => handleFilterSortSelection(e, "status")}
                     >
                        {requestFilters.status.options.map((option) => (
                           <option key={option.value} value={option.value}>
                              {option.label}
                           </option>
                        ))}
                     </select>
                  </div>
                  {currentUser && (
                     <div className="flex flex-col flex-1 lg:flex-none">
                        <label htmlFor="requests">{requests.Name}</label>
                        <select
                           className="bg-white text-black w-full lg:w-[125px] p-[5px] overflow-hidden whitespace-nowrap text-ellipsis"
                           name="requestsFilter"
                           id="requests"
                           value={query.myrequests}
                           onChange={(e) =>
                              handleFilterSortSelection(e, "myrequests")
                           }
                        >
                           {requestFilters.request.options.map((option) => (
                              <option key={option.value} value={option.value}>
                                 {option.label}
                              </option>
                           ))}
                        </select>
                     </div>
                  )}
               </div>
            </div>
         </div>
         <div>
            <div className="flex gap-[4px] mb-[10px] items-center h-[30px]">
               <div>Sort By: </div>
               <MovieListSortTags />
            </div>
            <div className="flex flex-col lg:flex-row gap-[10px]">
               <div className="flex gap-[10px]">
                  <div className="flex flex-col flex-1 lg:flex-none">
                     <label htmlFor="chronological">
                        {requestSorts.chronological.label}
                     </label>
                     <select
                        className="bg-white text-black w-full lg:w-[125px] p-[5px] overflow-hidden whitespace-nowrap text-ellipsis"
                        name="chronologicalFilter"
                        id="chronological"
                        value={query.sort}
                        onChange={(e) => handleFilterSortSelection(e, "sort")}
                     >
                        {requestSorts.chronological.options.map((option) => (
                           <option key={option.value} value={option.value}>
                              {option.label}
                           </option>
                        ))}
                     </select>
                  </div>
               </div>
               <div className="flex gap-[10px]">
                  <div className="flex flex-col flex-1 lg:flex-none">
                     <label htmlFor="published">
                        {requestSorts.published.label}
                     </label>
                     <select
                        className="bg-white text-black w-full lg:w-[125px] p-[5px] overflow-hidden whitespace-nowrap text-ellipsis"
                        name="publishedFilter"
                        id="published"
                        value={query.sort}
                        onChange={(e) => handleFilterSortSelection(e, "sort")}
                     >
                        {requestSorts.published.options.map((option) => (
                           <option key={option.value} value={option.value}>
                              {option.label}
                           </option>
                        ))}
                     </select>
                  </div>
                  <div className="flex flex-col flex-1 lg:flex-none">
                     <label htmlFor="added">{requestSorts.added.label}</label>
                     <select
                        className="bg-white text-black w-full lg:w-[125px] p-[5px] overflow-hidden whitespace-nowrap text-ellipsis"
                        name="addedFilter"
                        id="added"
                        value={query.sort}
                        onChange={(e) => handleFilterSortSelection(e, "sort")}
                     >
                        {requestSorts.added.options.map((option) => (
                           <option key={option.value} value={option.value}>
                              {option.label}
                           </option>
                        ))}
                     </select>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default FilterMovieList;
