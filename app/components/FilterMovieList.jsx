"use client";
import React, { useState, useContext } from "react";
// import { MovieContext } from "../context/MovieContext";

const FilterMovieList = () => {
   //const { setFilterOptions } = useContext(MovieContext);
   const [filterOptions, setFilterOptions] = useState({
      votes: "most",
      alphabetical: "",
      chronological: "",
      genre: "all",
      status: "unwatched",
   });

   const handleVotesFilter = (e) => {
      const selection = e.target.value;
      setFilterOptions((prevOptions) => ({
         ...prevOptions,
         votes: selection,
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
      <div className="flex justify-center gap-[50px] w-full p-[8px] text-center bg-black text-white hidden md:flex">
         <div>
            <label htmlFor="votes">Votes</label>
            <br />
            <select
               className="text-black"
               name="votesFilter"
               id="votes"
               onChange={handleVotesFilter}
               defaultValue="most"
            >
               <option value="most">Most votes</option>
               <option value="fewest">Fewest votes</option>
            </select>
         </div>
         <div>
            <label htmlFor="alphabetical">Alphabetical</label>
            <br />
            <select
               className="text-black"
               name="alphabeticalFilter"
               id="alphabetical"
            >
               <option value="">A-Z</option>
               <option value="">Z-A</option>
            </select>
         </div>
         <div>
            <label htmlFor="chronological">Chronological</label>
            <br />
            <select
               className="text-black"
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
            <select className="text-black" name="addedFilter" id="added">
               <option value="">Older</option>
               <option value="">Newer</option>
            </select>
         </div>
         <div>
            <label htmlFor="genre">Genre</label>
            <br />
            <select
               className="text-black"
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
               className="text-black"
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
