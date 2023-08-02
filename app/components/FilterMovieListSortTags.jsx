import React, { useContext } from "react";
import { MovieContext } from "@/context/MovieContext";
import {
   added,
   alphabetical,
   chronological,
   rating,
   votes,
   watched,
} from "@/app/utils/filtersOptions";

const FilterMovieListSortTags = () => {
   const { filterOptions, setFilterOptions } = useContext(MovieContext);

   const handleSortFilterRemove = () => {
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         alphabetical: alphabetical.Default,
         votes: votes.Default,
         rating: rating.Default,
         added: added.Default,
         watched: watched.Default,
         chronological: chronological.Default,
      }));
   };

   const filterSortOptions = () => {
      if (filterOptions.chronological !== chronological.Default) {
         return chronological.Name;
      }
      if (filterOptions.added !== added.Default) {
         return added.Name;
      }
      if (filterOptions.alphabetical !== alphabetical.Default) {
         return alphabetical.Name;
      }
      if (filterOptions.rating !== rating.Default) {
         return rating.Name;
      }
      if (filterOptions.votes !== votes.Default) {
         return votes.Name;
      }
      if (filterOptions.watched !== watched.Default) {
         return watched.Name;
      }
   };

   return (
      <div className="capitalize flex gap-[5px]">
         {(filterOptions.chronological !== chronological.Default ||
            filterOptions.added !== added.Default ||
            filterOptions.alphabetical !== alphabetical.Default ||
            filterOptions.rating !== rating.Default ||
            filterOptions.votes !== votes.Default ||
            filterOptions.watched !== watched.Default) && (
            <button
               onClick={handleSortFilterRemove}
               className="bg-black py-[2px] px-[10px] rounded-[15px] cursor-pointer"
            >
               {filterSortOptions()}
            </button>
         )}
      </div>
   );
};

export default FilterMovieListSortTags;
