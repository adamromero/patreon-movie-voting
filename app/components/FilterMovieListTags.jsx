import React, { useContext } from "react";
import { MovieContext } from "@/context/MovieContext";
import { genre, type, status } from "../utils/filtersOptions";

const FilterMovieListTags = () => {
   const { filterOptions, setFilterOptions } = useContext(MovieContext);

   const handleGenreFilterRemove = () => {
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         genre: genre.Default,
      }));
   };

   const handleTypeFilterRemove = () => {
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         type: type.Default,
      }));
   };

   const handleStatusFilterRemove = () => {
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         status: status.Default,
      }));
   };

   return (
      <div className="capitalize flex gap-[5px]">
         {filterOptions.genre !== "All" && (
            <button
               onClick={handleGenreFilterRemove}
               className="bg-black py-[2px] px-[10px] rounded-[15px] cursor-pointer focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out"
            >
               {filterOptions.genre}
            </button>
         )}
         {filterOptions.type !== "All" && (
            <button
               onClick={handleTypeFilterRemove}
               className="bg-black py-[2px] px-[10px] rounded-[15px] cursor-pointer focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out"
            >
               {filterOptions.type === "TV" ? "Series" : filterOptions.type}
            </button>
         )}
         {filterOptions.status !== "All" && (
            <button
               onClick={handleStatusFilterRemove}
               className="bg-black py-[2px] px-[10px] rounded-[15px] cursor-pointer focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out"
            >
               {filterOptions.status}
            </button>
         )}
      </div>
   );
};

export default FilterMovieListTags;
