"use client";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { MovieContext } from "@/context/MovieContext";

const FilterMovieList = () => {
   const mobileBreakPoint = 640;
   const { setFilterOptions } = useContext(MovieContext);
   const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
   const [isDesktopView, setIsDesktopView] = useState(
      typeof window !== "undefined" && window.innerWidth >= mobileBreakPoint
   );
   const handleWindowResize = useCallback(() => {
      setIsDesktopView(window.innerWidth >= mobileBreakPoint);
   }, []);

   useEffect(() => {
      window.addEventListener("resize", handleWindowResize);

      return () => {
         window.removeEventListener("resize", handleWindowResize);
      };
   }, [handleWindowResize]);

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
      <>
         <button
            className="block sm:hidden bg-black w-full p-[5px]"
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
         >
            {isMobileFiltersOpen ? <>Close Filters</> : <>Open Filters</>}
         </button>

         {(isMobileFiltersOpen || isDesktopView) && (
            <div className="flex flex-col mt-[10px] mb-[15px] sm:mt-0 sm:flex-row gap-[10px] max-w-[700px] w-full text-white flex">
               <div>
                  <label className="hidden sm:block" htmlFor="chronological">
                     Chronological
                  </label>
                  <select
                     className="bg-black text-white w-full sm:w-[125px] p-[5px]"
                     name="chronologicalFilter"
                     id="chronological"
                  >
                     <option value="">Older</option>
                     <option value="">Newer</option>
                  </select>
               </div>
               <div>
                  <label className="hidden sm:block" htmlFor="added">
                     Order added
                  </label>
                  <select
                     className="bg-black text-white w-full sm:w-[125px] p-[5px]"
                     name="addedFilter"
                     id="added"
                  >
                     <option value="">Older</option>
                     <option value="">Newer</option>
                  </select>
               </div>
               <div>
                  <label className="hidden sm:block" htmlFor="type">
                     Type
                  </label>
                  <select
                     className="bg-black text-white w-full sm:w-[125px] p-[5px]"
                     name="typeFilter"
                     id="type"
                     onChange={handleTypeFilter}
                  >
                     <option value="all">All</option>
                     <option value="movie">Movie</option>
                     <option value="series">Series</option>
                  </select>
               </div>
               <div>
                  <label className="hidden sm:block" htmlFor="genre">
                     Genre
                  </label>
                  <select
                     className="bg-black text-white w-full sm:w-[125px] p-[5px]"
                     name="genreFilter"
                     id="genre"
                     onChange={handleGenreFilter}
                  >
                     <option value="all">All</option>
                     <option value="action">Action</option>
                     <option value="animation">Animation</option>
                     <option value="bio">Biography</option>
                     <option value="comedy">Comedy</option>
                     <option value="crime">Crime</option>
                     <option value="drama">Drama</option>
                     <option value="family">Family</option>
                     <option value="fantasy">Fantasy</option>
                     <option value="horror">Horror</option>
                     <option value="mystery">Mystery</option>
                     <option value="music">Music</option>
                     <option value="romance">Romance</option>
                     <option value="scifi">Sci-Fi</option>
                     <option value="sport">Sport</option>
                     <option value="thriller">Thriller</option>
                     <option value="western">Western</option>
                     <option value="war">War</option>
                  </select>
               </div>
               <div>
                  <label className="hidden sm:block" htmlFor="status">
                     Status
                  </label>
                  <select
                     className="bg-black text-white w-full sm:w-[125px] p-[5px]"
                     name="statusFilter"
                     id="status"
                     onChange={handleWatchedFilter}
                     defaultValue="unwatched"
                  >
                     <option value="all">All</option>
                     <option value="watched">Watched</option>
                     <option value="unwatched">Unwatched</option>
                  </select>
               </div>
            </div>
         )}
      </>
   );
};

export default FilterMovieList;
