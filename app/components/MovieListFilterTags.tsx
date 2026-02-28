import React from "react";
import { useMovieContext } from "@/context/MovieContext";
import { genre, type, status, requests } from "../utils/filtersOptions";

const MovieListFilterTags = () => {
   const { filterOptions, setFilterOptions } = useMovieContext();

   const handleGenreFilterRemove = () => {
      setFilterOptions((currentFilters) => ({
         ...currentFilters,
         genre: genre.Default,
      }));
   };

   const handleTypeFilterRemove = () => {
      setFilterOptions((currentFilters) => ({
         ...currentFilters,
         type: type.Default,
      }));
   };

   const handleStatusFilterRemove = () => {
      setFilterOptions((currentFilters) => ({
         ...currentFilters,
         status: status.Default,
      }));
   };

   const handleStatusRequestsRemove = () => {
      setFilterOptions((currentFilters) => ({
         ...currentFilters,
         requests: requests.Default,
      }));
   };

   return (
      <div className="capitalize flex gap-[5px]">
         {filterOptions.genre !== "All" && (
            <button
               onClick={handleGenreFilterRemove}
               className="1 bg-black py-[2px] px-[10px] rounded-[15px] cursor-pointer focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out"
            >
               {filterOptions.genre}
            </button>
         )}
         {filterOptions.type !== "All" && (
            <button
               onClick={handleTypeFilterRemove}
               className="2 bg-black py-[2px] px-[10px] rounded-[15px] cursor-pointer focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out"
            >
               {filterOptions.type === "TV" ? "Series" : filterOptions.type}
            </button>
         )}
         {filterOptions.status !== "All" && (
            <button
               onClick={handleStatusFilterRemove}
               className="3 bg-black py-[2px] px-[10px] rounded-[15px] cursor-pointer focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out"
            >
               {filterOptions.status}
            </button>
         )}
         {filterOptions.requests !== "All" && (
            <button
               onClick={handleStatusRequestsRemove}
               className="4 bg-black py-[2px] px-[10px] rounded-[15px] cursor-pointer focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out"
            >
               {filterOptions.requests}
            </button>
         )}
      </div>
   );
};

export default MovieListFilterTags;
