"use client";
import React, { useContext } from "react";
import { MovieContext } from "@/context/MovieContext";

const FilterMovieList = () => {
   const { setFilterOptions } = useContext(MovieContext);

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
      <div className="flex gap-[20px] max-w-[700px] mb-[15px] w-full text-white hidden md:flex">
         <div>
            <label htmlFor="chronological">Chronological</label>
            <br />
            <select
               className="bg-black text-white w-[125px] p-[5px]"
               name="chronologicalFilter"
               id="chronological"
            >
               <option value="">Older</option>
               <option value="">Newer</option>
            </select>
         </div>
         <div>
            <label htmlFor="added">Order added</label>
            <br />
            <select
               className="bg-black text-white w-[125px] p-[5px]"
               name="addedFilter"
               id="added"
            >
               <option value="">Older</option>
               <option value="">Newer</option>
            </select>
         </div>
         <div>
            <label htmlFor="type">Type</label>
            <br />
            <select
               className="bg-black text-white w-[125px] p-[5px]"
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
            <label htmlFor="genre">Genre</label>
            <br />
            <select
               className="bg-black text-white w-[125px] p-[5px]"
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
            <label htmlFor="status">Status</label>
            <br />
            <select
               className="bg-black text-white w-[125px] p-[5px]"
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
   );
};

export default FilterMovieList;
