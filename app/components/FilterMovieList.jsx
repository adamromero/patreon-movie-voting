"use client";
import React, { useContext } from "react";
import { MovieContext } from "@/context/MovieContext";
import {
   genre,
   status,
   type,
   chronological,
   added,
   rating,
   votes,
   alphabetical,
} from "@/app/utils/filtersOptions";
import FilterMovieListTags from "./FilterMovieListTags";
import FilterMovieListSortTags from "./FilterMovieListSortTags";

const FilterMovieList = () => {
   const { filterOptions, setFilterOptions } = useContext(MovieContext);

   const handleChronologicalSort = (e) => {
      const selection = e.target.value;
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         alphabetical: alphabetical.Default,
         votes: votes.Default,
         rating: rating.Default,
         added: added.Default,
         chronological: selection,
      }));
   };

   const handleAddedSort = (e) => {
      const selection = e.target.value;
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         alphabetical: alphabetical.Default,
         votes: votes.Default,
         rating: rating.Default,
         added: selection,
         chronological: chronological.Default,
      }));
   };

   const handleTypeFilter = (e) => {
      const selection = e.target.value;
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         type: selection,
      }));
   };

   const handleGenreFilter = (e) => {
      const selection = e.target.value;
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         genre: selection,
      }));
   };

   const handleWatchedFilter = (e) => {
      const selection = e.target.value;
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         status: selection,
      }));
   };

   return (
      <div className="flex flex-col justify-between mt-[10px] mb-[15px] sm:mt-0 md:flex-row gap-[10px] w-full text-white flex">
         <div>
            <div className="flex gap-[4px] mb-[5px] items-center">
               <div>Filters:</div>
               <FilterMovieListTags />
            </div>
            <div className="flex gap-[10px]">
               <div className="flex flex-col flex-1 md:flex-none">
                  <label htmlFor="genre">{genre.Name}</label>
                  <select
                     className="bg-white text-black w-full md:w-[125px] p-[5px]"
                     name="genreFilter"
                     id="genre"
                     value={filterOptions.genre}
                     onChange={handleGenreFilter}
                  >
                     <option value={genre.Default}>All</option>
                     <option value={genre.Action}>Action</option>
                     <option value={genre.Adventure}>Adventure</option>
                     <option value={genre.Animation}>Animation</option>
                     <option value={genre.Biography}>Biography</option>
                     <option value={genre.Comedy}>Comedy</option>
                     <option value={genre.Crime}>Crime</option>
                     <option value={genre.Documentary}>Documentary</option>
                     <option value={genre.Drama}>Drama</option>
                     <option value={genre.Family}>Family</option>
                     <option value={genre.Fantasy}>Fantasy</option>
                     <option value={genre.History}>History</option>
                     <option value={genre.Horror}>Horror</option>
                     <option value={genre.Mystery}>Mystery</option>
                     <option value={genre.Music}>Music</option>
                     <option value={genre.Romance}>Romance</option>
                     <option value={genre.SciFi}>Sci-Fi</option>
                     <option value={genre.Short}>Short</option>
                     <option value={genre.Sport}>Sport</option>
                     <option value={genre.Thriller}>Thriller</option>
                     <option value={genre.Western}>Western</option>
                     <option value={genre.War}>War</option>
                  </select>
               </div>
               <div className="flex flex-col flex-1 md:flex-none">
                  <label htmlFor="type">{type.Name}</label>
                  <select
                     className="bg-white text-black w-full md:w-[125px] p-[5px]"
                     name="typeFilter"
                     id="type"
                     value={filterOptions.type}
                     onChange={handleTypeFilter}
                  >
                     <option value="All">All</option>
                     <option value={type.Movie}>Movie</option>
                     <option value={type.Series}>Series</option>
                  </select>
               </div>
               <div className="flex flex-col flex-1 md:flex-none">
                  <label htmlFor="status">{status.Name}</label>
                  <select
                     className="bg-white text-black w-full md:w-[125px] p-[5px]"
                     name="statusFilter"
                     id="status"
                     value={filterOptions.status}
                     onChange={handleWatchedFilter}
                  >
                     <option value="All">All</option>
                     <option value={status.Seen}>Seen</option>
                     <option value={status.Watched}>On Channel</option>
                     <option value={status.Unwatched}>Unwatched</option>
                  </select>
               </div>
            </div>
         </div>
         <div>
            <div className="flex gap-[4px] mb-[5px] items-center">
               <div>Sorting: </div>
               <FilterMovieListSortTags />
            </div>
            <div className="flex gap-[10px]">
               <div className="flex flex-col flex-1 md:flex-none">
                  <label htmlFor="chronological">{chronological.Name}</label>
                  <select
                     className="bg-white text-black w-full md:w-[125px] p-[5px]"
                     name="chronologicalFilter"
                     id="chronological"
                     value={filterOptions.chronological}
                     onChange={handleChronologicalSort}
                  >
                     <option value={chronological.Default}>Default</option>
                     <option value={chronological.Older}>Older</option>
                     <option value={chronological.Newer}>Newer</option>
                  </select>
               </div>
               <div className="flex flex-col flex-1 md:flex-none">
                  <label htmlFor="added">{added.Name}</label>
                  <select
                     className="bg-white text-black w-full md:w-[125px] p-[5px]"
                     name="addedFilter"
                     id="added"
                     value={filterOptions.added}
                     onChange={handleAddedSort}
                  >
                     <option value={added.Default}>Default</option>
                     <option value={added.Older}>Older</option>
                     <option value={added.Newer}>Newer</option>
                  </select>
               </div>
            </div>
         </div>
      </div>
   );
};

export default FilterMovieList;
