import React from "react";
import { useBoundStore } from "@/stores/useBoundStore";
import {
   added,
   alphabetical,
   chronological,
   rating,
   statusSort,
   votes,
   published,
} from "@/app/utils/filtersOptions";

const FilterMovieListSortTags = () => {
   const { filterOptions, setFilterOptions } = useBoundStore();

   const handleSortFilterRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
      const target = e.target as HTMLButtonElement;
      const { name, value } = target;

      setFilterOptions({
         alphabetical: alphabetical.Default,
         votes: votes.Default,
         rating: rating.Default,
         added: added.Default,
         chronological: chronological.Default,
         published: published.Default,
         [name]: value,
      });
   };

   const handleStatusSortFilterRemove = () => {
      setFilterOptions({
         statusSort: statusSort.Default,
      });
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
      if (filterOptions.published !== published.Default) {
         return published.Name;
      }
      if (filterOptions.statusSort !== statusSort.Default) {
         return statusSort.Name;
      }
   };

   return (
      <div className="capitalize flex gap-[5px]">
         {filterOptions.statusSort !== statusSort.Default && (
            <button
               onClick={handleStatusSortFilterRemove}
               className="bg-black py-[2px] px-[10px] rounded-[15px] cursor-pointer focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out"
            >
               Status
            </button>
         )}

         {(filterOptions.chronological !== chronological.Default ||
            filterOptions.added !== added.Default ||
            filterOptions.alphabetical !== alphabetical.Default ||
            filterOptions.rating !== rating.Default ||
            filterOptions.votes !== votes.Default ||
            filterOptions.published !== published.Default) && (
            <button
               onClick={(e) => handleSortFilterRemove(e)}
               className="bg-black py-[2px] px-[10px] rounded-[15px] cursor-pointer focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out"
            >
               {filterSortOptions()}
            </button>
         )}
      </div>
   );
};

export default FilterMovieListSortTags;
