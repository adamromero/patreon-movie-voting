import React from "react";
import { useMovieContext } from "@/context/MovieContext";
import {
   added,
   alphabetical,
   chronological,
   rating,
   statusSort,
   votes,
   published,
} from "@/app/utils/filtersOptions";

const MovieListSortTags = () => {
   const {
      sortOptions,
      setSortOptions,
      statusSortOption,
      setStatusSortOption,
   } = useMovieContext();

   const handleSortRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
      const target = e.target as HTMLButtonElement;
      const { name, value } = target;

      setSortOptions({
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
      setStatusSortOption({
         statusSort: statusSort.Default,
      });
   };

   const filterSortOptions = () => {
      if (sortOptions.chronological !== chronological.Default) {
         return chronological.Name;
      }
      if (sortOptions.added !== added.Default) {
         return added.Name;
      }
      if (sortOptions.alphabetical !== alphabetical.Default) {
         return alphabetical.Name;
      }
      if (sortOptions.rating !== rating.Default) {
         return rating.Name;
      }
      if (sortOptions.votes !== votes.Default) {
         return votes.Name;
      }
      if (sortOptions.published !== published.Default) {
         return published.Name;
      }
      if (statusSortOption.statusSort !== statusSort.Default) {
         return statusSort.Name;
      }
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

         {(sortOptions.chronological !== chronological.Default ||
            sortOptions.added !== added.Default ||
            sortOptions.alphabetical !== alphabetical.Default ||
            sortOptions.rating !== rating.Default ||
            sortOptions.votes !== votes.Default ||
            sortOptions.published !== published.Default) && (
            <button
               onClick={(e) => handleSortRemove(e)}
               className="bg-black py-[2px] px-[10px] rounded-[15px] cursor-pointer focus-visible:bg-[#262626] hover:bg-[#262626] transition-colors duration-300 ease-in-out"
            >
               {filterSortOptions()}
            </button>
         )}
      </div>
   );
};

export default MovieListSortTags;
