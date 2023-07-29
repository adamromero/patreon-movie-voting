"use client";
import React, { useState, useContext } from "react";
import { MovieContext } from "@/context/MovieContext";

const FilterMovieList = () => {
   const { filterOptions, setFilterOptions } = useContext(MovieContext);

   const handleChronologicalSort = (e) => {
      const selection = e.target.value;
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         added: "added",
         chronological: selection,
      }));
   };

   const handleAddedSort = (e) => {
      const selection = e.target.value;
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         chronological: "chronological",
         added: selection,
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
            <div className="flex gap-[4px] mb-[5px]">
               <div>Filters:</div>
               <div className="capitalize">
                  {filterOptions.genre} {filterOptions.type}{" "}
                  {filterOptions.status}
               </div>
            </div>
            <div className="flex gap-[10px]">
               <div>
                  <select
                     className="bg-black text-white w-full sm:w-[125px] p-[5px]"
                     name="genreFilter"
                     id="genre"
                     onChange={handleGenreFilter}
                  >
                     <option value="">Genre</option>
                     <option value="Action">Action</option>
                     <option value="Animation">Animation</option>
                     <option value="Biography">Biography</option>
                     <option value="Comedy">Comedy</option>
                     <option value="Crime">Crime</option>
                     <option value="Drama">Drama</option>
                     <option value="Family">Family</option>
                     <option value="Fantasy">Fantasy</option>
                     <option value="Horror">Horror</option>
                     <option value="Mystery">Mystery</option>
                     <option value="Music">Music</option>
                     <option value="Romance">Romance</option>
                     <option value="Sci-Fi">Sci-Fi</option>
                     <option value="Sport">Sport</option>
                     <option value="Thriller">Thriller</option>
                     <option value="Western">Western</option>
                     <option value="War">War</option>
                  </select>
               </div>
               <div>
                  <select
                     className="bg-black text-white w-full sm:w-[125px] p-[5px]"
                     name="typeFilter"
                     id="type"
                     onChange={handleTypeFilter}
                  >
                     <option value="">Type</option>
                     <option value="Movie">Movie</option>
                     <option value="Series">Series</option>
                  </select>
               </div>
               <div>
                  <select
                     className="bg-black text-white w-full sm:w-[125px] p-[5px]"
                     name="statusFilter"
                     id="status"
                     onChange={handleWatchedFilter}
                     defaultValue="Unwatched"
                  >
                     <option value="">Status</option>
                     <option value="Watched">Watched</option>
                     <option value="Unwatched">Unwatched</option>
                  </select>
               </div>
            </div>
         </div>
         <div>
            <div>Sorting</div>
            <div className="flex gap-[10px]">
               <div>
                  <select
                     className="bg-black text-white w-full sm:w-[125px] p-[5px]"
                     name="chronologicalFilter"
                     id="chronological"
                     value={setFilterOptions.chronological}
                     onChange={handleChronologicalSort}
                  >
                     <option value="chronological">Chronological</option>
                     <option value="older">Older</option>
                     <option value="newer">Newer</option>
                  </select>
               </div>
               <div>
                  <select
                     className="bg-black text-white w-full sm:w-[125px] p-[5px]"
                     name="addedFilter"
                     id="added"
                     value={setFilterOptions.added}
                     onChange={handleAddedSort}
                  >
                     <option value="added">Order added</option>
                     <option value="older">Older</option>
                     <option value="newer">Newer</option>
                  </select>
               </div>
            </div>
         </div>
      </div>
   );
};

export default FilterMovieList;
