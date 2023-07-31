import React, { useContext } from "react";
import { MovieContext } from "@/context/MovieContext";

const FilterMovieListTags = () => {
   const { filterOptions, setFilterOptions } = useContext(MovieContext);

   const handleGenreFilterRemove = () => {
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         genre: "All",
      }));
   };

   const handleTypeFilterRemove = () => {
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         type: "All",
      }));
   };

   const handleStatusFilterRemove = () => {
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         status: "All",
      }));
   };

   return (
      <div className="capitalize flex gap-[5px]">
         {filterOptions.genre !== "All" && (
            <button
               onClick={handleGenreFilterRemove}
               className="bg-black py-[2px] px-[10px] rounded-[15px] cursor-pointer"
            >
               {filterOptions.genre}
            </button>
         )}
         {filterOptions.type !== "All" && (
            <button
               onClick={handleTypeFilterRemove}
               className="bg-black py-[2px] px-[10px] rounded-[15px] cursor-pointer"
            >
               {filterOptions.type}
            </button>
         )}
         {filterOptions.status !== "All" && (
            <button
               onClick={handleStatusFilterRemove}
               className="bg-black py-[2px] px-[10px] rounded-[15px] cursor-pointer"
            >
               {filterOptions.status}
            </button>
         )}
      </div>
   );
};

export default FilterMovieListTags;
